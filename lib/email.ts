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
          background-color: rgba(255, 255, 255, 0.95);
          background-image: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%201946-11-04%20at%2010.57.32%E2%80%AFPM-mYzPlxHaJY3tUNahDDtBECef1uzbvS.png');
          background-size: cover;
          background-position: center;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          position: relative;
        }
        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 10px;
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
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
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 0.8em;
          color: #666;
        }
        .social-links {
          margin-top: 20px;
          text-align: center;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6200ea;
          text-decoration: none;
        }
        .social-icon {
          width: 24px;
          height: 24px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h1>Hello ${firstName},</h1>
          <p>Thank you for signing up to be a part of ScInter, a platform dedicated to revolutionizing the 
          way science is shared, explored, and developed.</p>
          <p>At ScInter, we connect researchers, academic institutions, industries, and science enthusiasts 
          through a collaborative ecosystem powered by Interactive AI. Together, we aim to make scientific innovation more accessible and impactful.</p>
          <h2>What's Next?</h2>
          <ul>
            <li><strong>Stay Updated:</strong> We'll keep you in the loop with key updates and milestones as we progress.</li>
            <li><strong>Exclusive Early Access:</strong> As a member of our early community, you’ll be among the first to experience the platform and its features before the official launch.</li>
            <li><strong>Collaborate & Share:</strong> Your feedback and insights will help shape ScInter into a thriving hub for collaboration and innovation.</li>
          </ul>
          <p>If you have any questions, suggestions, or ideas, don't hesitate to reach out at support@scinter.org. We're 
          excited to embark on this journey with you and look forward to making a meaningful impact 
          together.</p>
          <p>Thank you for joining us as we redefine the future of science.</p>
          <p>Sincerely,<br>The ScInter Team</p>
          <p style="text-align: center;">
            <a href="https://www.scinter.org" class="cta-button">Visit our website</a>
          </p>
          <div class="social-links">
            <p>Follow us on our social channels for updates, announcements, and opportunities to engage:</p>
            <a href="https://x.com/ScInter" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" alt="X" class="social-icon"></a>
            <a href="https://www.youtube.com/ScInter" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" class="social-icon"></a>
            <a href="https://www.instagram.com/ScInter" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="social-icon"></a>
            <a href="https://www.facebook.com/ScInter" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" class="social-icon"></a>
            <a href="https://github.com/ScInter" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" class="social-icon"></a>
            <a href="https://twitter.com/ScInter" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" class="social-icon"></a>
          </div>
          <div class="footer">
            <p>&copy; 2025 ScInter. All rights reserved.</p>
          </div>
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
