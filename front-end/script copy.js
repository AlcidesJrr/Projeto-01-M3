const cardLista = document.getElementById('cardLista');

let edicao = false;
let idEdicao = 0;

const nome = document.getElementById('nome');
const genero = document.getElementById('genero');
const imagem = document.getElementById('imagem');
const nota = document.getElementById('nota');

const apiUrl = 'http://localhost:3000';

const cardLista_ = async () => {
    const response = await fetch(apiUrl)
    const filmes= await response.json();
    console.log(filmes);
    filmes.map((filmes_) => {
        cardLista.insertAdjacentHTML('beforeend', `
        <div class="card" style="width: 19rem;">
      <img src=${filmes_.imagem} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${filmes_.nome}</h5>
        <p class="card-text"><b>Genero</b>: ${filmes_.genero}</p>
        <p class="card-text"><img src="./img/imdb.png" class="card-img-nota" alt="icone imdb"> ${filmes_.nota}</p>
        <div class="btn-card-all">
          <div class="btn-card">
              <button type="button" class="btn btn-outline-success" onclick="editFilme(${filmes_.id})" >Edit</button>
              <button type="button" class="btn btn-outline-danger" onclick="deleteFilme(${filmes_.id})">Del</button>
          </div>
          <div class="texto" contenteditable="false">
      </div>
      
      <div class="form-check">

      <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off">
      <label class="btn btn-secondary" for="option4">Visto</label>
      
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
    nota: parseFloat(nota.value),
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
  cardLista_();

}
  
const putFilme = async(filmes_, id) => {
  const request = new Request(`${apiUrl}/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(filmes_),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
  })

  const response = await fetch(request);
  const result = await response.json();
  alert(result.message)
  edicao = false;
  idEdicao = 0;
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
  nota.value = filmes_.nota;
}

const deleteFilme = async (id) => {
  const request =  new Request(`${apiUrl}/delete/${id}`, {
    method: 'DELETE'
  })
  const response = await fetch(request);
  const result = await response.json();

  alert(result.message);
  cardLista.innerHTML = '';
  cardLista_();
}

const clearFields = () => {
  nome.value = '';
  genero.value = '';
  imagem.value = '';
  nota.value = '';
}

cardLista_();