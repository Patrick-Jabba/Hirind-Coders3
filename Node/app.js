// Incluindo uma biblioteca
const http = require('http');
const url = require('url');
const fs = require('fs');
const queryString = require('query-string');

// Definição de endereo / URL
const hostname = '127.0.0.1'; //localhost
const port = 3000;

// Implementação da regra de negócio
const server = http.createServer((req, res) => {

  var resposta;
  const urlparse = url.parse(req.url, true)
  // Receber informações do usuário
  const params = queryString.parse(urlparse.search);

  // Criar um usuário - atualizar usuario
  if (urlparse.pathname == '/criar-usuario') {
    //CREATE Salvar as informações do usuário
    fs.writeFile('users/' + params.id + '.txt',
      JSON.stringify(params), function (err) {
        if (err) throw err;
        
        resposta = "Usuário criado/atualizado com sucesso!"

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(resposta);
      });

  }
  //GET Buscar um usuário por id
  else if (urlparse.pathname == '/selecionar-usuario') {
    fs.readFile('users/' + params.id + '.txt', function (err, data) {
     
     resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);

    });
  }
  // DELETE Remover um usuário
  else if (urlparse.pathname == '/remover-usuario') {
    fs.unlink('users/' + params.id + '.txt', function (err) {
     
      resposta = err ? "Usuário não encontrado" : "Usuário removido com sucesso.";

      res.statusCode = 204;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);

    });
  }

});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



//http://localhost:3000/?nome=Jose&sobrenome=Silva&idade=22&id=2