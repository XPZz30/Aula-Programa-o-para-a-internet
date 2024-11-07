const http = require('http');
const url = require('url');
const { parse } = require('querystring');

// Função para lidar com a requisição POST do formulário
function handlePostRequest(req, res) {
    let body = '';

    // Coleta os dados do corpo da requisição
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        // Processa os dados do formulário
        const formData = parse(body);

        // Retorna os dados processados como uma resposta
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h2>Dados recebidos com sucesso!</h2><p>Nome: ${formData.name}</p><p>Email: ${formData.email}</p>`);
    });
}

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        // Exibe o formulário HTML ao acessar a rota raiz
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
      <h1>Formulário de Cadastro</h1>
      <form action="/submit" method="post">
        <label>Nome: <input type="text" name="name" required /></label><br/>
        <label>Email: <input type="email" name="email" required /></label><br/>
        <button type="submit">Enviar</button>
      </form>
    `);
    } else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
        // Lida com o envio do formulário
        handlePostRequest(req, res);
    } else {
        // Rota não encontrada
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Página não encontrada</h1>');
    }
});

// Define a porta do servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
