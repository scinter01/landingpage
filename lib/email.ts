import nodemailer from "nodemailer"

export async function sendWelcomeEmail(to: string, firstName: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

const msg = {
  to,
  from: "support@scinter.org",
  subject: "Welcome to ScInter – Revolutionizing Scientific Discoveries",
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ScInter</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #6200ea;
          text-align: center;
        }
        h2 {
          color: #3700b3;
        }
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #6200ea;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          text-align: center;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 0.8em;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome, ${firstName}!</h1>
        <p>Thank you for joining ScInter, where we're transforming how science is shared and advanced.</p>
        <h2>What’s Coming Next?</h2>
        <ul>
          <li><strong>Stay Updated:</strong> We’ll keep you informed about our progress and milestones.</li>
          <li><strong>Early Access:</strong> Be among the first to explore our platform before the official launch.</li>
          <li><strong>Collaborate & Share:</strong> Your feedback will help us create a thriving community for innovation.</li>
        </ul>
        <p>If you have any questions, feel free to contact us at support@scinter.org.</p>
        <p>Visit our website:</p>
        <p style="text-align: center;">
          <a href="https://www.scinter.org" class="cta-button">Explore ScInter</a>
        </p>
        <div class="footer">
          <p>&copy; 2025 ScInter. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
}


  try {
    const info = await transporter.sendMail(msg)
    console.log("Email sent:", info.messageId)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
