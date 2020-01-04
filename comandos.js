autosize(document.querySelector("textarea"))
var notaEditor = window.document.querySelector("div#notaEditar")
var telaEditor = window.document.querySelector("div#telaEditor")
var tituloEditor = notaEditor.querySelector("input#tituloEditar")
var textoEditor = notaEditor.querySelector("textarea#textoEditar")
var listaNotas = window.document.querySelector("body div#app div#lista")
var dadosNotas = JSON.parse(localStorage.getItem("lista_notas"))||[]
var n=0
var cores=["#f00","#0f0","#00f","burlywood"]

function abrirEditor(){
    telaEditor.style.visibility = 'visible'
}

function fecharEditor(){
    tituloEditor.value = ''
    textoEditor.value = ''
    telaEditor.style.visibility = 'hidden'
}

function criarNota(titulo,texto,cor){
    var novaNota = document.createElement("div")
    var lblTitulo = document.createElement("h1")
    var lblTexto = document.createElement("p")

    novaNota.id = n.toString()
    lblTitulo.innerHTML = titulo
    lblTexto.innerHTML = texto

    novaNota.appendChild(lblTitulo)
    novaNota.appendChild(lblTexto)

    novaNota.classList.add("corpoNota")
    novaNota.style.backgroundColor = cor
    listaNotas.appendChild(novaNota)

}

function adNota(){
    var titulo = tituloEditor.value
    var texto = textoEditor.value.replace(/\r?\n/g,'<br/>')
    var cor = notaEditor.style.backgroundColor
    criarNota(titulo,texto,cor)
    dadosNotas.push({'codigo':n,'titulo':titulo,'texto':texto,'cor':cor})
    salvarNotas()
    fecharEditor()
    n++
}
function carregarNotas(){
    n=0
    for(nota of dadosNotas){
        criarNota(nota.titulo,nota.texto,nota.cor)
        n++
    }
}

function salvarNotas(){
    localStorage.setItem("lista_notas",JSON.stringify(dadosNotas))
}

function carregarCores(){
    var btnDescartar = document.getElementById("btnDescartar")
    for(cor of cores){
        var btnCor = document.createElement("button")
        btnCor.classList.add("btnCor")
        btnCor.style.backgroundColor = cor
        btnCor.setAttribute("onclick","altCor('"+cor+"')")
        telaEditor.insertBefore(btnCor,btnDescartar)
    }
}
function altCor(c){
    notaEditor.style.backgroundColor = c
}
carregarNotas()
carregarCores()