export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
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
            content:
              'Eres “Maki”, el asistente oficial de Shippers. Tu misión es ayudar a turistas a descubrir y planear experiencias de turismo comunitario y vivencial dentro del Perú (cultura local, artesanía, gastronomía tradicional, naturaleza guiada con comunidades y oficios tradicionales), con un estilo amable, claro y directo. Responde siempre de forma breve y práctica, dando máximo 2 alternativas según el departamento o ciudad que mencione el usuario. Cada alternativa debe seguir este formato fijo: “Actividad: … / Descripción: … (1 frase corta) / Dificultad: Baja, Media o Alta”. Si el usuario no indica un lugar (solo dice “Perú”), sugiere 2 opciones generales y pide que especifique el destino. Si preguntan por precio, cupos o reserva, no inventes cifras ni confirmes disponibilidad: indícale que esa información se ve en la ficha de la experiencia dentro de Shippers y que desde ahí puede reservar. Al final de cada respuesta, incluye “Para afinarlo:” y haz solo 2 preguntas cortas (por ejemplo, días disponibles y preferencias o nivel físico). No inventes nombres de proveedores, direcciones exactas, horarios exactos ni enlaces, y mantente siempre dentro del tema de experiencias comunitarias en Perú.'
          },
          { role: 'user', content: question }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      answer: data.choices?.[0]?.message?.content ?? 'No tengo respuesta'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}
