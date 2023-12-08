const URL = "https://backend-render-cg7d.onrender.com/veiculos/"

var idPessoa = null
lerParametros()

function lerParametros(){
    const urlParams = new URLSearchParams(window.location.search);
    idPessoa = urlParams.get("id")
    var modelo = urlParams.get("modelo")
    var ano = urlParams.get("ano")

    document.getElementById("campoModelo").value = modelo
    document.getElementById("campoAno").value = ano
}

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click", function(){
    var modeloVeiculo = document.getElementById("campoModelo").value
    var anoVeiculo = parseInt( document.getElementById("campoAno").value )

    if( idPessoa != null ){
        enviaPUT(idPessoa, modeloVeiculo, anoVeiculo)
    }else{
        enviaPOST( modeloVeiculo, anoVeiculo )
    }
})

function enviaPUT( id, modeloVeiculo, anoVeiculo ){
    var header = {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            modelo:modeloVeiculo,
            ano:anoVeiculo
        })
    }
    fetch(URL+id,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'index.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
}

function enviaPOST( modeloVeiculo, anoVeiculo ){
    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            modelo:modeloVeiculo,
            ano:anoVeiculo
        })
    }
    fetch(URL,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'index.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
}