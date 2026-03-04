const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
if (event.httpMethod !== "POST") {
return { statusCode: 405, body: "Método no permitido" };
}

const { url } = JSON.parse(event.body);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

try {
const prompt = `Eres la IA del Proyecto Ghost. Tu estilo de escritura es clínico, ejecutivo y orientado a soluciones. Analiza estratégicamente este encuentro: ${url}`;
const result = await model.generateContent(prompt);
const response = await result.response;

return {
statusCode: 200,
body: JSON.stringify({ informe: response.text() })
};
} catch (error) {
return {
statusCode: 500,
body: JSON.stringify({ error: "Fallo en el enlace táctico con Gemini." })
};
}
};
