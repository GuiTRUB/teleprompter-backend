
const mammoth = require("mammoth");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const buffer = Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8");
    const result = await mammoth.convertToHtml({ buffer });

    if (!result.value || result.value.trim() === "") {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Letra vazia após conversão." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Letra processada com sucesso.",
        html: result.value,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Erro ao processar .docx: ${err.message}`,
    };
  }
};
