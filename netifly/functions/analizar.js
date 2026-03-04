const axios = require('axios');

exports.handler = async (event) => {
if (event.httpMethod !== "POST") return { statusCode: 405, body: "No permitido" };
const { url } = JSON.parse(event.body);
const key = process.env.GEMINI_API_KEY;

try {
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
const response = await axios.post(endpoint, {
contents: [{ parts: [{ text: `Eres la IA del Proyecto Ghost. Analiza estratégicamente este encuentro: ${url}` }] }]
});

return {
statusCode: 200,
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ informe: response.data.candidates[0].content.parts[0].text })
};
} catch (error) {
return { statusCode: 500, body: JSON.stringify({ error: "Fallo de conexión táctica." }) };
}
};
