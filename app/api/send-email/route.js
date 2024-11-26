import nodemailer from 'nodemailer'

export async function POST(req) {
  const { name, email } = await req.json()

  // Config the email transport using the default SMTP transport and a Gmail account
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // Set up email data
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}`
  }

  try {
    await transporter.sendMail(mailOptions)
    return new Response(
      JSON.stringify({ message: 'Email sent successfully!' }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email.' }), {
      status: 500
    })
  }
}
