//estoque: id, nome, preco, quantidadeRestante, quantidadeVendidas
//servicos: id, nome, dia, horario, preco, estaDisponivel, nomeDoAnimal
//cliente: nome, foto, usuario, senha, cpf, isAdmin
//animais: id, nomeDoAnimal, foto, usuarioDoDono, raca, idade, tipoDeAnimal, servico que esteja recebendo, custo total dos servicos


window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

request = window.indexedDB.open("BancoDeDados", 1), db, tx, store,  index;

request.onupgradeneeded = function(e) {
    let db = request.result,
        store = db.createObjectStore("Estoque", {keypath: "id"}),
        index = store.createIndex("nome", "nome", {unique: false});
};

request.onerror = function(e) {
    console.log("There was an error: " + e.target.errorCode);
}

request.onsuccess = function(e) {
    db = request.result;
    tx = db.transaction("Estoque", "readwrite");
    store = tx.objectStore("Estoque");
    index = store.index("nome");

    db.onerror = function(e) {
        console.log("ERROR" + e.target.errorCode);
    }

    store.put({id: 1, nome: "Jorge", dia: 27, horario: 20, preco: 200, estaDisponivel: true, nomeDoAnimal: "Wolfy"});


    tx.oncomplete = function() {
        db.close();
    }
}
