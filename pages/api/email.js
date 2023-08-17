const { Resend } = require("resend");

export default async function handler(req, res) {
  try {
    const resend = new Resend(req.body.apiKey);
    const data = await resend.emails.send({
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.body,
    });
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
