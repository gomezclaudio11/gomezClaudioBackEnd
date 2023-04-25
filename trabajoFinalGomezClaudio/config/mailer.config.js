import { createTransport } from "nodemailer"

const TEST_MAIL = " 'wilbert.streich20@ethereal.email'"

const transporter = createTransport ({
    service: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: "rxtp9p8Vb2TRP8xDwt"
    }
});

const mailOptions = {
    from: "Cafeteria Online",
    to: TEST_MAIL,
    subject: "Confirmacion de compra",
    html: "Su compra fue realizada con exito"
};

try {
    const info = await transporter.sendMail (mailOptions)
    console.log(info);
} catch (error) {
    console.log(error);
}