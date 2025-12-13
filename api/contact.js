const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, email, message } = req.body;
  
  if (!subject || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'contact@masonletoile.ca',
      subject: `Contact form: ${subject}`,
      text: `From: ${email}\n\n${message}`
    });
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
