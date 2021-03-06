const cardLista = document.getElementById('cardLista');

let edicao = false;
let idEdicao = 0;

const vst = './img/vst.png'
const fls = './img/fls.png'

const nome = document.getElementById('nome');
const genero = document.getElementById('genero');
const imagem = document.getElementById('imagem');
const nota = document.getElementById('nota');
const trailer = document.getElementById('trailer');

const apiUrl = 'http://localhost:3000';

const cardLista_ = async () => {
    const response = await fetch(apiUrl)
    const filmes= await response.json();

    filmes.map((filmes_) => {
      if(filmes_.visto == false) {
        filmes_.visto = fls
      }
      else {
        filmes_.visto = vst
      }
        cardLista.insertAdjacentHTML('beforeend', `
      <div class="card" style="width: 19rem;">
        <img src=${filmes_.imagem} class="card-img-top" alt="...">
        <div class="card-body">
          <iframe class="video" width="310" height="210" src=${filmes_.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <h5 class="card-title">${filmes_.nome}</h5>
          <p class="card-text"><b>Gêneros</b>: ${filmes_.genero}</p>
          <p class="card-text"><img src="./img/imdb.png" class="card-img-nota" alt="icone imdb"> ${filmes_.nota.toFixed(2).toString().replace(".", ",")}</p>
          <div class="btn-card">

            <button type="button" class="btn btn-link" onclick="editFilme(${filmes_.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" data-toggle="tooltip" data-placement="top" title="Editar" ><img src=./img/edit.png></button>

            <button type="button" class="btn btn-link" data-toggle="tooltip" data-placement="top" title="Deletar" onclick='deleteFilme("${filmes_.id}", "${filmes_.nome}")'><img src=./img/del.png></button>
              
            <button type="button" class="btn btn-link" onclick="editVisto(${filmes_.id})" id="img_fls-vst" data-toggle="tooltip" data-placement="top" title="Marcar como visto"><img src=${filmes_.visto}></button>

          </div>
        </div>
      </div>
        `)   
    })
    
};

const submitForm = async (event) => {
  event.preventDefault();
  const filmes_ = {
    nome: nome.value,
    genero: genero.value,
    imagem: imagem.value,
    trailer: trailer.value,
    nota: parseFloat(nota.value)
  }

  if(edicao) {
    putFilme(filmes_, idEdicao);
  } else {
    createFilme(filmes_);
  }
  cardLista.innerHTML = '';
}

const createFilme = async(filmes_) => {
  const request = new Request(`${apiUrl}/add`, {
    method: 'POST',
    body: JSON.stringify(filmes_),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
  })
  const response = await fetch(request);
  const result = await response.json();
  cardLista.innerHTML = '';
  alert(result.message)
  clearFields();
  cardLista_();

}

const putFilme = async (filmes_, id) => {
  const request = new Request(`${apiUrl}/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(filmes_),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
  })

  const response = await fetch(request);
  const result = await response.json();
  alert(result.message);
  edicao = false;
  idEdicao = 0;
  clearFields();
  cardLista_();
}

const getFilmeById = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  return await response.json();
}

const editFilme = async (id) => {
  edicao = true;
  idEdicao = id;
  const filmes_ = await getFilmeById(id);
  nome.value = filmes_.nome;
  genero.value = filmes_.genero;
  imagem.value = filmes_.imagem;
  trailer.value = filmes_.trailer;
  nota.value = filmes_.nota;
}

const editVisto = async (id) => {
  const filmes_ = await getFilmeById(id);

  const request = new Request(`${apiUrl}/editVisto/${id}`, {
    method: 'PUT',
    body: JSON.stringify(filmes_),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
  })
  const response = await fetch(request);
  const result = await response.json();
  cardLista.innerHTML = '';
  cardLista_();

}
 
const deleteFilme = async (id, nome) => {
 
const confirm = window.confirm(
  `Tem certeza que deseja deletar ${nome}?`
);

if (confirm) {
  const request =  new Request(`${apiUrl}/delete/${id}`, {
    method: 'DELETE'
  });

  const response = await fetch(request);
  const result = await response.json();
  alert(result.message);
  cardLista.innerHTML = '';
  cardLista_();
}
}

const clearFields = () => {
  nome.value = '';
  genero.value = '';
  imagem.value = '';
  trailer.value = '';
  nota.value = '';
}

cardLista_();
