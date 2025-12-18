export default async function handler(req: any, res: any) {

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { question } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Eres el asistente oficial de Shippers.'
          },
          { role: 'user', content: question }
        ]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      answer: data.choices?.[0]?.message?.content || 'Sin respuesta'
    });

  } catch (err) {
    return res.status(500).json({ error: 'Error interno' });
  }
}
