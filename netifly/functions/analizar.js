const axios = require('axios');

exports.handler = async (event) => {
// Solo aceptamos peticiones POST
if (event.httpMethod !== "POST") {
return { statusCode: 405, body: "Método no permitido" };
}

const { url } = JSON.parse(event.body);
const apiKey = process.env.GROQ_API_KEY;

try {
const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
model: "llama-3.3-70b-versatile",
messages: [
{
role: "system",
content: "Eres la IA del Proyecto Ghost. Tu estilo de escritura es clínico, ejecutivo y orientado a soluciones. Usa terminología táctica precisa y justifica las decisiones con análisis profesional."
},
{
role: "user",
content: `Analiza estratégicamente el contenido de esta URL y genera un informe táctico ejecutivo: ${url}`
}
],
temperature: 0.3
}, {
headers: {
'Authorization': `Bearer ${apiKey}`,
'Content-Type': 'application/json'
}
});

return {
statusCode: 200,
body: JSON.stringify({ informe: response.data.choices[0].message.content })
};
} catch (error) {
return {
statusCode: 500,
body: JSON.stringify({ error: "Fallo en el enlace táctico con la IA." })
};
}
};

