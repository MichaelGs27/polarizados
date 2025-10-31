const userService = require('../services/users.service'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
// Función para generar un token JWT
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
    );
};

// exports.register
exports.register = async (req, res) => {
    try {
        const newUser = await userService.create(req.body);
        // CAMBIO 1: Se llama a generateToken solo con idUser (o el ID que devuelva el servicio)
        const token = generateToken(newUser.idUser); 
        res.status(201).json({
            message: 'Usuario registrado y logueado exitosamente',
            token: token
        });
    } catch (error) {
        res.status(400).json({ 
            message: "Error en el registro del usuario", 
            error: error.message 
        });
    }
};

// exports.login
exports.login = async (req, res) => {
    const { email, password } = req.body; 
    try {

        const user = await userService.findByEmail(email); 
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const token = generateToken(user.idUser);
        
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: token
        });

    } catch (error) {
        // ... (resto del código es correcto)
        res.status(500).json({ 
            message: "Error interno al iniciar sesión", 
            error: error.message 
        });
    }
};