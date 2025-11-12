const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/db.config');
const UsersService = require('../services/users.service');
const { sendMailVerification } =require ('../services/mail.service');

const usersService = new UsersService();

class AuthController {
    constructor() {
        // Bind the methods to ensure 'this' context
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const users = await usersService.findByEmail(email);

            if (!users || !bcrypt.compareSync(password, users.password)) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            const token = jwt.sign(
            { email: users.email, idUser: users.idUser }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            const { firstName, lastName, email, phone, address, idDocumentType, documentNumber, password } = req.body;
            
            const existingUsers = await usersService.findByEmail(email);
            if (existingUsers) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }

            const hashedpassword = bcrypt.hashSync(password, 10);

            const newUser = await usersService.create({
                firstName,
                lastName,
                email,
                phone,
                address,
                idDocumentType,
                documentNumber,          
                password: hashedpassword
            });

            const token = jwt.sign(
                { email: newUser.email, idUser: newUser.idUser }, 
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES }
            );

            console.log("Intentando enviar correo a:", newUser.email);
            const mail = await sendMailVerification(newUser.email, token);
            console.log("CORREO ENVIADO", mail.messageId);

            return res.status(201).json({
                message: "Usuario registrado exitosamente. Revisa tu correo para verificar tu cuenta.",
                idUser: newUser.idUser,
                token
            });

        } catch (error) {
            console.error("Error en registro:", error); 
            return res.status(500).json({ message: error.message });
        }
    }







}

        

// Export a single instance
module.exports = new AuthController();
