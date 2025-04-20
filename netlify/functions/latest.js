
const fs = require("fs");

exports.handler = async () => {
  try {
    const html = fs.readFileSync("/tmp/latest.html", "utf8");
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html,
    };
  } catch {
    return {
      statusCode: 404,
      body: "Nenhuma letra encontrada.",
    };
  }
};
