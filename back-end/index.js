const express = require('express');
const cors = require('cors');
const port = 3000;

const filmesRouter = require('./routes/filmes.routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', filmesRouter);

app.listen(port, () => {
    console.log(`o app está rodando em: http://localhost:${port}`);
});

 