part.on("end", async () => {
  try {
    const docxBuffer = Buffer.concat(bufferChunks);
    const result = await mammoth.convertToHtml({ buffer: docxBuffer });
    
    // 🪵 LOG DO HTML CONVERTIDO:
    console.log("📄 HTML convertido pelo Mammoth:");
    console.log(result.value);

    const html = result.value;

    if (!html || html.trim() === "") {
      return resolve({
        statusCode: 200,
        body: JSON.stringify({ message: "Letra vazia após conversão." }),
      });
    }

    const finalPath = "/tmp/latest.html";
    fs.writeFileSync(finalPath, html, "utf8");

    return resolve({
      statusCode: 200,
      body: JSON.stringify({ message: "Letra salva com sucesso." }),
    });
  } catch (err) {
    console.error("❌ Erro ao processar .docx:", err);
    return resolve({
      statusCode: 500,
      body: `Erro ao processar: ${err.message}`,
    });
  }
});
