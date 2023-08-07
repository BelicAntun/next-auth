import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, { forgotToken: hashToken, forgotTokenExpiry: Date.now() + 3600000 });
    }

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: `${process.env.MAILTRAP_USER}`,
        pass: `${process.env.MAILTRAP_PASS}`,
      },
    });

    const mailOptions = {
      from: 'antunbelic93@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your account' : 'Reset your password',
      html: `${emailType === 'VERIFY' ? '<h1>Verify your account</h1>' : '<h1>Reset your password</h1>'}
      <p>Click this <a href="${process.env.DOMAIN}/${
        emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'
      }?token=${hashToken}">link</a> to ${emailType === 'VERIFY' ? 'verify your account' : 'reset your password'}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
