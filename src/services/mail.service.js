async function sendMailVerification(direccion, token) {
  try {
    const verifyUrl = `http://localhost:5173/verify?token=${token}`;

    const info = await transporter.sendMail({
      from: `PolarizedBussiness <${process.env.EMAIL_USER}>`,
      to: direccion,
      subject: "Verificación de cuenta",
      html: `
        <h2>Verificación de cuenta</h2>
        <p>Hola, gracias por registrarte en <b>PolarizedBussiness</b>.</p>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta y acceder al dashboard:</p>
        <a href="${verifyUrl}">Verificar mi cuenta</a>
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
