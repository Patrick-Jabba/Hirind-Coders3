"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importacao de bibliotecas
const url = __importStar(require("url"));
const query_string_1 = require("query-string");
const fs = __importStar(require("fs"));
const http_1 = require("http");
// Definição de porta
const port = 5000;
const server = (0, http_1.createServer)((request, response) => {
    //Implementar código aqui
    const urlparse = url.parse(request.url ? request.url : '', true);
    var resposta;
    // Receber informações do usuário
    const params = (0, query_string_1.parse)(urlparse.search ? urlparse.search : '');
    // Criar um usuário - atualizar usuario
    if (urlparse.pathname == '/criar-usuario') {
        //CREATE Salvar as informações do usuário
        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err)
                throw err;
            resposta = "Usuário criado/atualizado com sucesso!";
            response.statusCode = 201;
            response.setHeader('Content-Type', 'application/json');
            response.end(resposta);
        });
    }
});
//Execução
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
//http://localhost:5000/criar-usuario?nome=Patrick&idade=33&id=1
