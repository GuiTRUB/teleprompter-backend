const formidable = require("formidable");
const fs = require("fs");
const mammoth = require("mammoth");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  return new Promise((resolve) => {
    const form = formidable({ multiples: false });
    const buffer = Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8");

    // criar stream legível
    const readable = require("stream").Readable.from(buffer);

    form.parse(readable, async (err, fields, files) => {
      if (err) {
        console.error("Erro no parse:", err);
        return resolve({ statusCode: 500, body: "Erro no upload" });
      }

      try {
        const file = files.file;
        const docxBuffer = fs.readFileSync(file.filepath);
        const result = await mammoth.convertToHtml({ buffer: docxBuffer });

        fs.writeFileSync("/tmp/latest.html", result.value, "utf8");

        return resolve({
          statusCode: 200,
          body: JSON.stringify({ message: "Letra salva com sucesso." }),
        });
      } catch (err) {
        console.error("Erro ao processar:", err);
        return resolve({ statusCode: 500, body: err.message });
      }
    });
  });
};
