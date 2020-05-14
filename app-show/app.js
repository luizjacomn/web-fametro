const listaDePessoas = [];
var idControl = 0;

function adicionar() {
    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    let sobre = document.getElementById('sobre').value;

    let pessoa = new Pessoa(++idControl, nome, idade, sobre);

    listaDePessoas.push(pessoa);

    addNaTabela(pessoa);
}

function addNaTabela(pessoa) {
    let tbody = document.getElementById('tabela-pessoas').getElementsByTagName('tbody')[0];
    let numLinhas = tbody.rows.length;
    let linha = tbody.insertRow(numLinhas);

    let tdNome = linha.insertCell(0);
    tdNome.innerHTML = pessoa.nome;

    let tdIdade = linha.insertCell(1);
    tdIdade.innerHTML = pessoa.idade;

    let tdSobre = linha.insertCell(2);
    tdSobre.innerHTML = pessoa.sobre;

    let tdRemover = linha.insertCell(3);
    let botaoRemover = document.createElement('input');
    botaoRemover.type = 'button';
    botaoRemover.value = 'x';
    botaoRemover.dataset.id = pessoa.id;
    botaoRemover.onclick = function(event) {
        remover(event.target.dataset.id);
    }

    tdRemover.appendChild(botaoRemover);
}

function remover(id) {
    try {
        let tbody = document.getElementById('tabela-pessoas').getElementsByTagName('tbody')[0];

        let index = listaDePessoas.findIndex(function(pessoa) {
            return pessoa.id == id;
        });

        tbody.deleteRow(index);
    
        listaDePessoas.splice(index, 1);
    } catch (e) {
        alert(e);
    }
}

class Pessoa {
    constructor(id, nome, idade, sobre) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.sobre = sobre;
    }
}