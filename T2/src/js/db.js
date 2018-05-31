//estoque: id, nome, preco, quantidadeRestante, quantidadeVendidas
//servicos: id, nome, dia, horario, preco, estaDisponivel, nomeDoAnimal
//cliente: nome, foto, usuario, senha, cpf, isAdmin
//animais: id, nomeDoAnimal, foto, usuarioDoDono, raca, idade, tipoDeAnimal, servico que esteja recebendo, custo total dos servicos
$(document).ready( function(){
    var request = indexedDB.open("petshop", 3);

    console.log("Veio aqui");

    request.onupgradeneeded = function(event) {
        var db = event.target.result;

        var users = db.createObjectStore("Usuarios", {keyPath: "login"});
        var stock = db.createObjectStore("Estoque", {keyPath: "id", autoIncrement: true});
        var services = db.createObjectStore("Servicos", {keyPath: "id", autoIncrement: true});
        var pet = db.createObjectStore("Animais", {keyPath: "login"});

        db.close();
    };

    request.onsuccess = function(event){
        var db = event.target.result;

        var transaction = db.transaction(["Usuarios"], "readwrite");

        var store = transaction.objectStore("Usuarios");

        var user = {
            name: "Vitor",
            login: "Vitor",
            passWord: "1234",
            address: "AV 3",
            tel: 38070477,
            email: "vitor.dellinocente@usp.br",
            isAdmin: true
        };

        var add = store.add(user);

        add.onsuccess = function(e){
            console.log("cadastrou bunito");
        }

        db.close()
    };
});




//
//     $("#cadastrarProduto").click(function(){ //FUNCAO CHAMADA PELO BOTAO DE CADASTRAR UM NOVO PRODUTO NO ESTOQUE
//         var nome = $("#inputNome").val();
//         var preco = $("#inputPreco").val();
//         var quantidadeRestante = $("#inputQuantidadeRestante").val();
//         var quantidadeVendidas = $("#inputQuantidadeVendidas").val();
//         if (nome.length == 0 || preco.length == 0 || quantidadeRestante.length == 0 || quantidadeVendidas.length == 0) {
//             alert("Todos os campos devem ser preenchidos para um novo cadastro");
//         } else {
//             db.onsuccess = function(e) {
//                 db = e.target.result;
//                 transaction = db.transaction(["Estoque"], "readwrite");
//                 var store = transaction.objectStore("Estoque");
//                 var produto = {
//                     nome: nome,
//                     preco: preco,
//                     quantidadeRestante: quantidadeRestante,
//                     quantidadeVendidas: quantidadeVendidas
//                 };
//                 var request = store.add(produto);
//                 request.onsuccess = function(e) {
//                     console.log("cadastro realizado com sucesso :D");
//                     //VOLTAR PARA TELA INICIAL
//                 }
//                 request.onerror = function(e) {
//                     alert("Ocorreu um erro!");
//                     console.log(e);
//                 }
//                 db.close();
//             }
//         }
//     });
//     $("cadastrarServico").click(function(){
//         var nome = $("#inputNome").val();
//         var dia = $("#inputDia").val();
//         var horario = $("#inputHorario").val();
//         var preco = $("#inputPreco").val();
//         var estaDisponivel = $("#inputEstaDisponivel").val();
//         var nomeDoAnimal = $("#inputNomeDoAnimal").val();
//         if (nome.length == 0 || dia.length == 0 || horario.length == 0 || preco.length == 0 || estaDisponivel.length == 0 || nomeDoAnimal.length == 0) {
//             alert("Todos os campos devem ser preenchidos para um novo cadastro");
//         } else {
//             db.onsuccess = function (e) {
//                 db =db e.target.result;
//                 transaction = db.transaction(["Servicos"], "readwrite");
//                 var store = transaction.objectStore("Servicos");
//                 servico = {
//                     nome: nome,
//                     dia: dia,
//                     horario: horario,
//                     preco: preco,
//                     estaDisponivel: estaDisponivel,
//                     nomeDoAnimal: nomeDoAnimal
//                 };
//                 var request = store.add(servico);
//                 request.onsuccess = function(e) {
//                     console.log("cadastro do servico realizado com sucesso :D");
//                     //VOLTAR PARA TELA INICIAL
//                 }
//                 request.onerror = function(e) {
//                     alert("Ocorreu um erro!");
//                     console.log(e);
//                 }
//                 db.close();
//             }
//         }
//     });
//     $("#cadastrarCliente").click(function(){ //FUNCAO CHAMADA PELO BOTAO DE CADASTRAR UM NOVO CLIENTE
//         var name = $("#name").val();
//         // var foto = $("#foto").val();
//         var login = $("#login").val();
//         var passWord = $("#passWord").val();
//         var address = $("#address").val();
//         var tel = $("#tel").val();
//         var email = $("#email").val();
//         if (name.length == 0 || login.length == 0 || passWord.length == 0 || address.length == 0 || tel.length == 0
//              || email.length == 0) {
//             alert("Todos os campos devem ser preenchidos para um novo cadastro");
//         } else {
//             console.log("entrou aqui");
//             db.onsuccess = function(e) {
//                 db = e.target.result;
//                 transaction = db.transaction(["Clientes"], "readwrite");
//                 var store = transaction.objectStore("Clientes");
//                 var cliente = {
//                     name: name,
//                     // foto: foto,
//                     login: login,
//                     passWord: passWord,
//                     address: address,
//                     tel: tel,
//                     email: email,
//                     isAdmin: false
//                 };
//                 var request = store.add(cliente);
//                 request.onsuccess = function(e) {
//                     console.log("cadastro realizado com sucesso :D");
//                     //VOLTAR PARA TELA INICIAL
//                 }
//                 request.onerror = function(e) {
//                     alert("Ocorreu um erro!");
//                     console.log(e);
//                 }
//                 db.close();
//             }
//         }
//     });
//     $("#cadastrarAnimal").click(function(){ //FUNCAO CHAMADA PELO BOTAO DE CADASTRAR UM NOVO CLIENTE
//         var nome = $("#inputNome").val();
//         var foto = $("#inputfoto").val();
//         var usuarioDono = $("#inputUsuarioDono").val();
//         var raca = $("#inputRaca").val();
//         var idade = $("#inputIdade").val();
//         var tipoDeAnimal = $("#inputTipoDeAnimal").val();
//         var servicosRecebidos = $("#inputServicosRecebidos").val();
//         var custoTotalServicos = $("#inputCustoTotalServicos").val();
//
//         if (nome.length == 0 || foto.length == 0 || usuarioDono.length == 0 || raca.length == 0 || idade.length == 0 ||
//              tipoDeAnimal.length == 0 || servicosRecebidos.length == 0 || custoTotalServicos.length == 0) {
//             alert("Todos os campos devem ser preenchidos para um novo cadastro");
//         } else {
//             db.onsuccess = function(e) {
//                 db = e.target.result;
//                 transaction = db.transaction(["Animais"], "readwrite");
//                 var store = transaction.objectStore("Animais");
//                 var animal = {
//                     nome: nome,
//                     foto: foto,
//                     usuarioDono: usuarioDono,
//                     raca: raca,
//                     idade: idade,
//                     tipoDeAnimal: tipoDeAnimal,
//                     servicosRecebidos: servicosRecebidos,
//                     custoTotalServicos: custoTotalServicos
//                 };
//                 var request = store.add(animal);
//                 request.onsuccess = function(e) {
//                     console.log("cadastro realizado com sucesso :D");
//                     //VOLTAR PARA TELA INICIAL
//                 }
//                 request.onerror = function(e) {
//                     alert("Ocorreu um erro!");
//                     console.log(e);
//                 }
//                 db.close();
//             }
//         }
//     });
//
//
// });
