const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { DOMParser, XMLSerializer } = require('xmldom');

const app = express();
app.use(bodyParser.text({ type: 'image/svg+xml' }));

// Rota para receber a solicitação POST e atualizar o arquivo SVG
app.post('/atualizar-svg/:pathFile', (req, res) => {
  const novoContentText = req.body;
  const pathFile = req.params.pathFile;

  // Verificar se o arquivo existe
  if (!fs.existsSync(pathFile)) {
    res.status(404).send('Arquivo não encontrado.');
    return;
  }

  // Ler o arquivo SVG existente
  const arquivoSvg = fs.readFileSync(pathFile, 'utf-8');

  // Parse do SVG para o DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(arquivoSvg, 'image/svg+xml');

  // Encontrar o elemento SVG que contém o atributo contentText
  const elementoSvg = doc.documentElement;
  elementoSvg.setAttribute('contentText', novoContentText);

  // Serializar o DOM para uma string XML do SVG atualizado
  const serializer = new XMLSerializer();
  const svgAtualizado = serializer.serializeToString(doc);

  // Escrever o SVG atualizado de volta no arquivo
  fs.writeFileSync(pathFile, svgAtualizado, 'utf-8');

  res.send(`Arquivo SVG ${pathFile} atualizado com sucesso.`);
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor Express iniciado na porta 3000');
});
