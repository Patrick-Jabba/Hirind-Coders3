//Importacao de bibliotecas
import * as url from 'url';
import { parse } from 'query-string';
import * as fs from 'fs';
import { createServer, ServerResponse, IncomingMessage } from 'http';

// Definição de porta
const port = 5000

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    //Implementar código aqui

    const urlparse = url.parse(request.url ? request.url : '', true);
    var resposta;

    // Receber informações do usuário
    const params = parse(urlparse.search ? urlparse.search : '');

    // Criar um usuário - atualizar usuario
    if (urlparse.pathname == '/criar-usuario') {
        //CREATE Salvar as informações do usuário
        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
                if (err) throw err;

                resposta = "Usuário criado/atualizado com sucesso!"

                response.statusCode = 201;
                response.setHeader('Content-Type', 'application/json');
                response.end(resposta);
            });
    }
});

//Execução
server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

//http://localhost:5000/criar-usuario?nome=Patrick&idade=33&id=1