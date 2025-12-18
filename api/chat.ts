export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'Question required' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `
Eres el asistente oficial de Shippers.

Shippers es una plataforma web que conecta turistas con experiencias, talleres y actividades ofrecidas por comunidades locales en Perú.

Tu función es:
- Responder preguntas sobre qué es Shippers y cómo funciona.
- Explicar cómo los turistas pueden registrarse, explorar experiencias y hacer reservas.
- Explicar cómo los emprendedores o comunidades pueden publicar sus experiencias.
- Aclarar dudas sobre pagos, comisiones y confianza en la plataforma.

Reglas importantes:
- Responde SOLO con información relacionada a Shippers.
- Si la pregunta no está relacionada, indica amablemente que solo puedes responder sobre Shippers.
- Responde de forma clara, breve y amigable.
- Usa un tono cercano y confiable.

No inventes información que no esté relacionada con Shippers.
`
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ]
            })
        });

        const data = await response.json();
        res.status(200).json({ answer: data.choices[0].message.content });
    } catch {
        res.status(500).json({ answer: 'Error al procesar la pregunta' });
    }
}
