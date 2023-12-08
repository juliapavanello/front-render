const URL = "https://backend-render-cg7d.onrender.com/veiculos/"
var listaVeiculos = []

function iniciarTabela(){
    return `<div class="linhaVeiculos">
                <p class="item">Id</p>
                <p class="item">Nome</p>
                <p class="item">Idade</p>
                <p class="item">Alterar</p>
                <p class="item">Excluir</p>
            </div>`;
}

function criarLinhaVeiculos(veiculo){
    return `<div class="linhaVeiculos">
                <p class="item">`+veiculo.id+`</p>
                <p class="item">`+veiculo.modelo+`</p>
                <p class="item">`+veiculo.ano+`</p>
                <p class="item"><img class="icone lapis" src="../img/lapis.jpg" alt="icone lápis"></p>
                <p class="item"><img class="icone lixeira" src="../img/lixeira.png" alt="icone lixeira"></p>
            </div>`;
}

function adicionarVeiculos(){
    var tabelaVeiculos = document.getElementById("tabelaVeiculos")
    tabelaVeiculos.innerHTML += iniciarTabela()
    for (let i = 0; i < listaVeiculos.length; i++) {
        const veiculo = listaVeiculos[i];
        tabelaVeiculos.innerHTML += criarLinhaVeiculos(veiculo)
    }
    cadastrarEventosLapis()
    cadastrarEventosLixeira()
}

fetch(URL).then(function(response) {
    return response.json();
}).then(function(data) {
    listaVeiculos = data
    adicionarVeiculos()
}).catch(function(error) {
    console.log(error);
});

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click",function(){
    window.location.href = 'adicionar.html';
})

function atualizarTela(id){
    listaVeiculos = listaVeiculos.filter( p => p.id != id)
    var tabelaPessoas = document.getElementById("tabelaVeiculos")
    tabelaPessoas.innerHTML = ""
    adicionarVeiculos()
}

function realizarExclusao(id){
    var header = {
        method:"DELETE"
    }
    fetch(URL+id,header)
    .then(function(response){
        return response.text()
    }).then(function(data){
        atualizarTela(id)
    }).catch(function(error){
        alert("Erro ao deletar pessoa")
        console.log(error)
    })
}

function cadastrarEventosLixeira(){
    var lixeiras = document.getElementsByClassName("lixeira")
    for (let i = 0; i < lixeiras.length; i++) {
        const l = lixeiras[i];
        l.addEventListener("click",function(event){
            var id = event.target.parentElement.parentElement.children[0].innerText
            realizarExclusao(id)
        })
    }
}

function editarURL(url, id, modelo, ano){
    return url+'?id='+id+'&modelo='+modelo+'&ano='+ano
}

function cadastrarEventosLapis(){
    var lapis = document.getElementsByClassName("lapis")
    for (let i = 0; i < lapis.length; i++) {
        const l = lapis[i];
        l.addEventListener("click",function(event){
            var id = event.target.parentElement.parentElement.children[0].innerText
            var modelo = event.target.parentElement.parentElement.children[1].innerText
            var ano = event.target.parentElement.parentElement.children[2].innerText
            window.location.href = editarURL("adicionar.html",id,modelo,ano);
        })
    }
}