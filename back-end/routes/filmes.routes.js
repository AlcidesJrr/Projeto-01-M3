const express = require('express');
const router = express.Router();

const filmes= [
    {
        id: 1,
        nome: "Velozes & Furiosos: Hobbs & Shaw",
        genero: "Ação",
        nota: 8.5,
        imagem: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/b4ad02ba551bcd32cb496f82f6ec0e3b0cff3f0ddb218ee9b6844a4824e225f7._UR1920,1080_RI_UX400_UY225_.jpg"
        },
    {
        id: 2,
        nome: "John Wick: Chapter 3 - Parabellum",
        genero: "Ação",
        nota: 7.4,
        imagem: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/54970855768ec30aa5a04100c6ba4fed199dab46b617811f442a63dc7fecb43c._UR1920,1080_RI_SX356_FMwebp_.jpg"
    },
    {
        id: 3,
        nome: "A Colônia",
        genero: "Ficção Científica, Suspense, Ação",
        nota: 5.3,
        imagem: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ff283967d5d2361544c7d0bc3ac4020decf296fcc2070cfe669e9be8ce0549f9._UR1920,1080_RI_SX356_FMwebp_.jpg"
    },
    {
        id: 4,
        nome: "Chamas da Vingança",
        genero: "Chamas da Vingança",
        nota: 7.7,
        imagem: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/04c8311a04f7d9b8949004006bfd3d6f602befccba63295a3956a7928b76adfe._UR1920,1080_RI_SX356_FMwebp_.jpg"
    },
    {
        id: 5,
        nome: "Blitz",
        genero: "Suspense, Ação",
        nota: 6.2,
        imagem: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/45e4a396f47b5f74301b2ab31a42938d970c8ecf05be7120bf192547ea47310f._UR1920,1080_RI_SX356_FMwebp_.jpg"
    }
];


router.get('/', (req, res) => {
    res.send(filmes);
});

router.post('/add', (req, res) => {
    const filmes_ = req.body;
    filmes_.id = Date.now();
    filmes.push(filmes_);
    res.status(201).send({
        message: 'Cadastro com sucesso',
        data: filmes_
    });
});


router.put('/edit/:id', (req, res) => {
    const filmesEdit = req.body;
    const idParam = req.params.id;
    let index = filmes.findIndex(filmes_ => filmes_.id == idParam);

    filmes[index] = {
        ...filmes[index],
        ...filmesEdit
    };
    res.send({
        message: `vaga ${filmes[index].titulo} atualizada com sucesso`,
        data: filmes[index]
    });
});


router.delete('/delete/:id', (req, res) => {
    const idParam = req.params.id;

    const index = filmes.findIndex(filmes_ => filmes_.id == idParam);
    const nome = filmes[index];
    filmes.splice(index, 1);
    res.send({
        message: `Vaga ${nome.nome} excluida com sucesso !`,
    });
});


module.exports = router;