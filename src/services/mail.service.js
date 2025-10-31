const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:465,
    secure:true,
    auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
    }
})


async function sendMailVerification(direccion, token) {
    try {
        const info = await transporter.sendMail({
            from: `PolarizedBussiness <${process.env.EMAIL_USER}>`,
            to: direccion,
            subject: "Verificación de cuenta",
            html: `
                <h2>Verifica tu cuenta</h2>
                
            `
        });
        console.log("Correo enviado:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        throw error;
    }
}


module.exports = { sendMailVerification };

