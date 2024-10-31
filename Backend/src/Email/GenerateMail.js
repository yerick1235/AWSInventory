import { createTransport } from "nodemailer"

const transporter = createTransport({
    host: 'smtp.office365.com',
    port: '587',
    secure: false,
    auth: {
        user: 'awsinventory@odd.digital',
        pass: 'Qab30125'
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
    }
})

export const sendMail = async (mailOptions) => {
    try {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error(err)
            } else {
                console.log('Mail sent, ', info.response)

            }
        })
    } catch (err) {
        console.error('Error sending email: ', err)
    }
}