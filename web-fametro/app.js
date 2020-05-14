// adicionar as ações aqui

// Este array simulará uma base de dados
const localStorage = [];
// Este array será usaso para sortear nome aleatórios
const nomes = [
  "Carlos",
  "Patrícia",
  "Lucas",
  "Erica",
  "André",
  "Samanta",
  "Tiago",
  "Larissa",
  "Felipe",
  "Carla",
];
// Esta variável vai controlar os IDs de cada pessoa
var idControl = 0;

// Reagindo ao evento de valor inválido para o campo nome
document.dados.nome.addEventListener(
  "invalid",
  function () {
    document.dados.nome.setCustomValidity(
      "Ops, é obrigatório preencher o campo nome."
    );
  },
  false
);

// Limpando mensagem para o campo nome
document.dados.nome.addEventListener(
  "change",
  function () {
    document.dados.nome.setCustomValidity("");
  },
  false
);

// Reagindo ao evento de valor inválido para o campo idade
document.dados.idade.addEventListener(
  "invalid",
  function () {
    document.dados.idade.setCustomValidity(
      "Ops, é obrigatório preencher o campo idade."
    );
  },
  false
);

// Limpando mensagem para o campo nome
document.dados.idade.addEventListener(
  "change",
  function () {
    document.dados.idade.setCustomValidity("");
  },
  false
);

// Verificar se o valor satisfaz ao intervalo de valores
function maxLengthCheck(inputElement) {
  if (Number(inputElement.value) > Number(inputElement.max)) {
    inputElement.value = inputElement.max;
    return;
  }
}

// Permite apenas inteiros
function isNumeric(event) {
  var theEvent = event || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /[0-9]/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

// Devolve um número randômico
function random(max) {
  return Math.floor(Math.random() * max);
}

// Criando como prototype
// function Pessoa(id, nome, idade, sobre) {
//     this.id = id;
//     this.nome = nome;
//     this.idade = idade;
//     this.sobre = sobre;
// }
// Criando como classe
class Pessoa {
  constructor(id, nome, idade, sobre) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.sobre = sobre;
  }
}

function criarAleatoria() {
  let nome = nomes[random(10)];
  let idade = random(120);
  let sobre = `Aqui vai uma descrição para ${nome} de ${idade} anos.`;
  let pessoa = new Pessoa(++idControl, nome, idade, sobre);

  localStorage.push(pessoa);

  adicionarNaTabela(pessoa);
}

// Função para adicionar a pessoa à base de dados (array)
function adicionar() {
  let nome = document.getElementById("nome").value;
  let idade = document.getElementById("idade").value;
  let sobre = document.getElementById("sobre").value;
  let pessoa = new Pessoa(++idControl, nome, idade, sobre);

  localStorage.push(pessoa);

  adicionarNaTabela(pessoa);

  alert("Pessoa adicionada com sucesso");

  return false;
}

// Função para adicionar a pessoa como uma linha na tabela
function adicionarNaTabela(pessoa) {
  let tabela = document
    .getElementById("lista-pessoas")
    .getElementsByTagName("tbody")[0];
  let numLinhas = tabela.rows.length;
  let linha = tabela.insertRow(numLinhas);

  // adicionar nome
  let tdNome = linha.insertCell(0);
  tdNome.innerHTML = pessoa.nome;

  // adicionar idade
  let tdIdade = linha.insertCell(1);
  tdIdade.innerHTML = pessoa.idade;

  // adicionar sobre
  let tdSobre = linha.insertCell(2);
  tdSobre.innerHTML = pessoa.sobre == "" ? "-" : pessoa.sobre;

  // adicionar botão remover
  let tdRemover = linha.insertCell(3);
  var botaoRemover = document.createElement("input");
  botaoRemover.type = "button";
  botaoRemover.value = "x";
  botaoRemover.onclick = function (event) {
    let remover = confirm(
      'Deseja remover "' + event.target.dataset.nome + '"?'
    );
    if (remover) {
      removerPessoa(event.target.dataset.id);
    }
    return false;
  };
  botaoRemover.className = "botao remover";
  botaoRemover.dataset.id = pessoa.id;
  botaoRemover.dataset.nome = pessoa.nome;
  tdRemover.appendChild(botaoRemover);

  limpar();
}

function removerPessoa(id) {
  try {
    let tabela = document
      .getElementById("lista-pessoas")
      .getElementsByTagName("tbody")[0];

    let index = localStorage.findIndex(function (p) {
      return p.id == id;
    });

    tabela.deleteRow(index);

    localStorage.splice(index, 1);
  } catch (e) {
    console.log(e);
    alert("Erro ao remover a pessoa");
  }
}

function removerTodas() {
  let tabela = document
    .getElementById("lista-pessoas")
    .getElementsByTagName("tbody")[0];

    while (tabela.hasChildNodes()) {
      tabela.removeChild(tabela.lastChild);
    }

  localStorage.length = 0;
}

function limpar() {
  document.dados.reset();
  document.dados.nome.focus();
}
