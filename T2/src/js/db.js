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

        var transaction = event.target.transaction;

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

        store = transaction.objectStore("Servicos");

        var service = {
            name: "Banho",
            descricao: "Lavagem de animais",
            preco: 59.99
        };

        add = store.add(service);

        service = {
            name: "Tosa",
            descricao: "Tosa de animais",
            preco: 25.99
        };

        add = store.add(service);

        service = {
            name: "Veterinario de plantao",
            descricao: "Checar a disponibilidade de um veterinario",
            preco: 89.99
        };

        add = store.add(service);

        service = {
            name: "Adestramento",
            descricao: "Serviço de adestramento de animais",
            preco: 150
        };

        add = store.add(service);

        service = {
            name: "Loja física",
            descricao: "Checar localizacao de nossas lojas",
            preco: 0
        };

        add = store.add(service);

        store = transaction.objectStore("Estoque");

        var product = {
            name: "Comida de cachorro",
            descricao: "Saco de ração de cachorro",
            preco: 49.99,
            qtd_estoque: 150,
            qtd_vendida: 20
        }

        add = store.add(product);

        product = {
            name: "Comida de gato",
            descricao: "Saco de ração de gato",
            preco: 39.99,
            qtd_estoque: 190,
            qtd_vendida: 10
        }

        add = store.add(product);

        product = {
            name: "Casinha",
            descricao: "Casinha para animais de médio porte",
            preco: 99.90,
            qtd_estoque: 25,
            qtd_vendida: 3
        }

        add = store.add(product);

        product = {
            name: "Brinquedo de cachorro",
            descricao: "Osso de brinquedo para cachorro",
            preco: 19.90,
            qtd_estoque: 150,
            qtd_vendida: 89
        }

        add = store.add(product);

        console.log("BD atualizado");

        db.close();
    };
});
