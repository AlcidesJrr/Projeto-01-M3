const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

const filmes= [
    {
        id: 1,
        nome: "A Batalha Esquecida",
        genero: "Drama, Guerra, história",
        lancamento: 2021,
        imagem: "https://br.web.img3.acsta.net/c_310_420/pictures/21/10/06/15/28/1435725.jpg"
        },
    {
        id: 2,
        nome: "Duna",
        genero: "Ação, Aventura, Ficção",
        lancamento: 2021,
        imagem: "https://br.web.img3.acsta.net/c_310_420/pictures/21/09/29/20/10/5897145.jpg"
    },
    {
        id: 3,
        nome: "Onda de choque 2",
        genero: " Ação, Aventura",
        lancamento: 2021,
        imagem: "https://ondebaixa.com/imagens/onda-de-choque-2-download-torrent-2021-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg"
    },
    {
        id: 4,
        nome: "Dupla Explosiva 2 – E a Primeira-Dama do Crime",
        genero: " Ação, Comédia, Crime",
        lancamento: 2021,
        imagem: "https://br.web.img2.acsta.net/c_310_420/pictures/21/05/17/20/05/5122165.jpg"
    },
    {
        id: 5,
        nome: "Teste",
        genero: " teste 1",
        lancamento: 2021,
        imagem: "teste"
    }
];

app.get("/", (req, res) => {
    res.send("Lista de Filmes")
});


app.get("/filmes", (req, res) => {
    res.send(filmes)
});


app.get("/filmes/:id", (req, res) => {
    const id = req.params.id -1;

    res.send(filmes[id])
});


app.put("/filmes/:id", (req, res) => {
    const id = req.params.id -1;
    filmes[id] = req.body;

    res.send(filmes[id]);
});


app.delete("/filmes/:id", (req, res) => {
    const id = req.params.id -1;
    delete filmes[id];

    res.send(filmes);
});


app.post("/filmes/criar", (req, res) => {
    const { id, nome, genero, lancamento, imagem } = req.body;
    card_novo = {id, nome, genero, lancamento, imagem};
    filmes.push(card_novo)

    res.send(filmes);
});

app.listen(port, () => {
    console.log(`o app está rodando em: http://localhost:${port}`);
});

