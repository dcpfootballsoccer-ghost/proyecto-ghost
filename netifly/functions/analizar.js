const axios = require('axios');

exports.handler = async (event) => {
if (event.httpMethod !== "POST") return { statusCode: 405, body: "No permitido" };
const { url } = JSON.parse(event.body);
const key = process.env.GROQ_API_KEY;

try {
const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
model: "llama-3.3-70b-versatile",
messages: [
{ role: "system", content: "Eres la inteligencia táctica GHOST. Estilo clínico y ejecutivo." },
{ role: "user", content: "Analiza este partido: " + url }
]
}, {
headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' }
});

return {
statusCode: 200,
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ informe: response.data.choices[0].message.content })
};
} catch (error) {
return { statusCode: 500, body: JSON.stringify({ error: "Fallo de conexión táctica." }) };
}
};
