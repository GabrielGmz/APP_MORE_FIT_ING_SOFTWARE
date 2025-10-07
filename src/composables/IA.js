export async function generarPlanConGemini({ objetivo, planNutricion, nivel }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  const prompt = `
Eres un experto en diseño visual de planes de entrenamiento. 
Con base en los siguientes datos:

- Objetivo del usuario: ${objetivo}
- Plan de nutrición: ${planNutricion}
- Nivel de experiencia: ${nivel}

Genera solo una **gráfica comparativa** simple en formato **SVG embebido en HTML**, que represente el "Antes" y "Después" del progreso del usuario en base al objetivo.

➡️ Debe contener:
- Un gráfico de barras comparando por ejemplo peso, masa muscular o energía.
- Títulos: "Antes" y "Después".
- Estilo visual limpio (colorido, moderno).
- NO agregar ningún texto explicativo, solo el código SVG dentro de HTML.

Tu respuesta debe ser solamente el HTML con el SVG. Nada más.
  `

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  )

  const data = await res.json()

  if (!data.candidates || !data.candidates.length) {
    throw new Error('No se recibió respuesta del modelo')
  }

  const respuesta = data.candidates[0].content.parts[0].text
  return respuesta
}
