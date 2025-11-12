const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/db.config');
const UsersService = require('../services/users.service');
const { sendMailVerification } = require('../services/mail.service');

const usersService = new UsersService();

class AuthController {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await usersService.findByEmail(email);

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            const token = jwt.sign(
                { email: user.email, idUser: user.idUser },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES }
            );

            return res.json({ token });
        } catch (error) {
            console.error("Error en login:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            const { firstName, lastName, email, phone, address, idDocumentType, documentNumber, password } = req.body;

            const existingUser = await usersService.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }

            const hashedPassword = bcrypt.hashSync(password, 10);

            const newUser = await usersService.create({
                firstName,
                lastName,
                email,
                phone,
                address,
                idDocumentType,
                documentNumber,
                password: hashedPassword
            });

            const token = jwt.sign(
                { email: newUser.email, idUser: newUser.idUser },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES }
            );

            // Enviar correo de verificación
            console.log("Intentando enviar correo a:", newUser.email);
            const mail = await sendMailVerification(newUser.email, token);
            console.log("CORREO ENVIADO:", mail.messageId);

            // ✅ Solo una respuesta final
            return res.status(201).json({
                message: "Usuario registrado exitosamente. Revisa tu correo para verificar tu cuenta.",
                idUser: newUser.idUser,
                token: token
            });

        } catch (error) {
            console.error("Error en registro:", error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();
