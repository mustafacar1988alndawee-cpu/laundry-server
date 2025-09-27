// server.js

import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// بيئة Twilio (من حسابك)
const accountSid = process.env.TWILIO_ACCOUNT_SID; // تحطه في Render Environment
const authToken = process.env.TWILIO_AUTH_TOKEN;   // تحطه في Render Environment
const whatsappFrom = 'whatsapp:+14155238886'; // غيّر هذا لرقم Twilio WhatsApp مالتك

// إنشاء عميل Twilio
const client = twilio(accountSid, authToken);

// Route للتأكد السيرفر شغال
app.get('/', (req, res) => {
  res.send('WhatsApp API is working ✅');
});

// Route لإرسال رسالة واتساب
app.post('/send-whatsapp', async (req, res) => {
  try {
    const { phone, name, qty, id } = req.body;

    if (!phone || !name || !qty || !id) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const bodyMsg = أهلًا 🌸 ${name}\nاستلمنا طلبك بنجاح\nعدد السجادات: ${qty}\nرقم الطلب: ${id}\nشكرًا لاختيارك المملكة لوندري 💙;

    await client.messages.create({
      from: whatsappFrom,
      to: whatsapp:${phone},
      body: bodyMsg
    });

    res.json({ ok: true, message: 'تم إرسال الرسالة بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// تشغيل السيرفر محليًا
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
