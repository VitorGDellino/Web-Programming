//estoque: id, nome, preco, quantidadeRestante, quantidadeVendidas
//servicos: id, nome, dia, horario, preco, estaDisponivel, nomeDoAnimal
//cliente: nome, foto, usuario, senha, cpf, isAdmin
//animais: id, nomeDoAnimal, foto, usuarioDoDono, raca, idade, tipoDeAnimal, servico que esteja recebendo, custo total dos servicos


$(document).ready(function(){
    //Checar se a plataforma suporta IndexedDB
    if ((return "indexedDB" in window && !/iPad|iPhone|iPod/.test(navigator.platform))) {
        return;
    }

    var db = indexedDB.open("db", 1);

    db.onunpdateneeded = function(e) {
        db = e.target.result
        db.createObjectStore("Estoque");
        db.createObjectStore("Servicos");
        db.createObjectStore("Clientes");
        db.createObjectStore("Animais");
    }

    $("#cadastrarProduto").click(function(){ //FUNCAO CHAMADA PELO BOTAO DE CADASTRAR UM NOVO PRODUTO NO ESTOQUE
        var nome = $("#inputNome").val();
        var preco = $("#inputPreco").val();
        var quantidadeRestante = $("#inputQuantidadeRestante").val();
        var quantidadeVendidas = $("#inputQuantidadeVendidas").val();
        if (nome.length == 0 || preco.length == 0 || quantidadeRestante.length == 0 || quantidadeVendidas.length == 0) {
            alert("Todos os campos devem ser preenchidos para um novo cadastro");
        } else {
            db.onsuccess = function(e) {
                db = e.target.result;
                transaction = db.transaction(["Estoque"], "readwrite");
                var store = transaction.objectStore("Estoque");
                var produto = {
                    nome: nome,
                    preco: preco,
                    quantidadeRestante: quantidadeRestante,
                    quantidadeVendidas: quantidadeVendidas
                };
                var request = store.add(produto);
                request.onsuccess = function(e) {
                    console.log("cadastro realizado com sucesso :D");
                    //VOLTAR PARA TELA INICIAL
                }
                request.onerror = function(e) {
                    alert("Ocorreu um erro!");
                    console.log(e);
                }
                db.close();
            }
        }
    });
    $("cadastrarServico").click(function(){
        var nome = $("#inputNome").val();
        var dia = $("#inputDia").val();
        var horario = $("#inputHorario").val();
        var preco = $("#inputPreco").val();
        var estaDisponivel = $("#inputEstaDisponivel").val();
        var nomeDoAnimal = $("#inputNomeDoAnimal").val();
        if (nome.length == 0 || dia.length == 0 || horario.length == 0 || preco.length == 0 || estaDisponivel.length == 0 || nomeDoAnimal.length == 0) {
            alert("Todos os campos devem ser preenchidos para um novo cadastro");
        } else {
            db.onsuccess = function (e) {
                db = e.target.result;
                transaction = db.transaction(["Servicos"], "readwrite");
                var store = transaction.objectStore("Servicos");
                servico = {
                    nome: nome,
                    dia: dia,
                    horario: horario,
                    preco: preco,
                    estaDisponivel: estaDisponivel,
                    nomeDoAnimal: nomeDoAnimal
                };
                var request = store.add(servico);
                request.onsuccess = function(e) {
                    console.log("cadastro do servico realizado com sucesso :D");
                    //VOLTAR PARA TELA INICIAL
                }
                request.onerror = function(e) {
                    alert("Ocorreu um erro!");
                    console.log(e);
                }
                db.close();
            }
        }
    });
    $("#cadastrarCliente").click(function(){ //FUNCAO CHAMADA PELO BOTAO DE CADASTRAR UM NOVO CLIENTE
        var nome = $("#inputNome").val();
        var foto = $("#inputfoto").val();
        var usuario = $("#inputUsuario").val();
        var senha = $("#inputSenha").val();
        var cpf = $("#inputCPF").val();
        var isAdmin = $("#inputIsAdmin").val();
        if (nome.length == 0 || foto.length == 0 || usuario.length == 0 || senha.length == 0 || cpf.length == 0 || isAdmin.length == 0) {
            alert("Todos os campos devem ser preenchidos para um novo cadastro");
        } else {
            db.onsuccess = function(e) {
                db = e.target.result;
                transaction = db.transaction(["Clientes"], "readwrite");
                var store = transaction.objectStore("Clientes");
                var cliente = {
                    nome: nome,
                    foto: foto,
                    usuario: usuario,
                    senha: senha,
                    cpf: cpf,
                    isAdmin: isAdmin
                };
                var request = store.add(cliente);
                request.onsuccess = function(e) {
                    console.log("cadastro realizado com sucesso :D");
                    //VOLTAR PARA TELA INICIAL
                }
                request.onerror = function(e) {
                    alert("Ocorreu um erro!");
                    console.log(e);
                }
                db.close();
            }
        }
    });
    $("#cadastrarAnimal").click(function(){ //FUNCAO CHAMADA PELO BOTAO DE CADASTRAR UM NOVO CLIENTE
        var nome = $("#inputNome").val();
        var foto = $("#inputfoto").val();
        var usuarioDono = $("#inputUsuarioDono").val();
        var raca = $("#inputRaca").val();
        var idade = $("#inputIdade").val();
        var tipoDeAnimal = $("#inputTipoDeAnimal").val();
        var servicosRecebidos = $("#inputServicosRecebidos").val();
        var custoTotalServicos = $("#inputCustoTotalServicos").val();

        if (nome.length == 0 || foto.length == 0 || usuarioDono.length == 0 || raca.length == 0 || idade.length == 0 ||
             tipoDeAnimal.length == 0 || servicosRecebidos.length == 0 || custoTotalServicos.length == 0) {
            alert("Todos os campos devem ser preenchidos para um novo cadastro");
        } else {
            db.onsuccess = function(e) {
                db = e.target.result;
                transaction = db.transaction(["Animais"], "readwrite");
                var store = transaction.objectStore("Animais");
                var animal = {
                    nome: nome,
                    foto: foto,
                    usuarioDono: usuarioDono,
                    raca: raca,
                    idade: idade,
                    tipoDeAnimal: tipoDeAnimal,
                    servicosRecebidos: servicosRecebidos,
                    custoTotalServicos: custoTotalServicos
                };
                var request = store.add(animal);
                request.onsuccess = function(e) {
                    console.log("cadastro realizado com sucesso :D");
                    //VOLTAR PARA TELA INICIAL
                }
                request.onerror = function(e) {
                    alert("Ocorreu um erro!");
                    console.log(e);
                }
                db.close();
            }
        }
    });


});
