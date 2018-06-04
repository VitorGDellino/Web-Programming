/*----------------FUNCOES RELACIONADAS A NAVEGACAO----------------------------*/
state = 0;
loggedUser = "";
pet_id = 0;
cart = [];

//window.location.reload(true);
function goToHome(){
    $(document).ready( function(){
        document.body.style.backgroundImage = "url(./assets/background.png)";
        $("#mutableContent").load("../html/home.html");
        state = 0;
    });

}

function goToProducts(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/produtos.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioprodutos.html");
        }
        state = 1;
    });
}

function goToServices(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/servicos.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioservicos.html");
        }
        state = 1;
    });
}

function goToAbout(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/about.html");
        document.body.style.backgroundImage = "none";
        state = 0;
    });
}

function goToAdminRegister(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/admregister.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioadminregister.html");
        }
        state = 1;
    });
}

function goToClientRegister(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/clientregister.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioclientregister.html");

        }
        state = 1;
    });
}

function goToServiceManager(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/servicesmanager.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioservicesmanager.html");
        }

        listServices();
        state = 1;
    });
}

function goToStockManager(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/stockmanager.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameiostockmanager.html");
        }
        listStock();
        state = 1;
    });
}

function goToBuy(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/buy.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameiobuy.html");
        }
        state = 1;
    });
}


function insertInCart (product) {
    var quantity = document.getElementById(product).value;
    var hasUpdate = false;
    if(quantity != "") {
        aux = {
            name: product,
            quant: parseInt(quantity)
        };
        for (var item in cart) {
            if (cart[item].name == product) {//Este produto ja esta inserido
                //atualiza somente a quantidade dele
                cart[item].quant = parseInt(quantity);
                hasUpdate = true;
            }
        }

        if (!hasUpdate) {
            cart.push(aux);
            hasUpdate = false;
        }
    } else {
        for (var elem in cart) {
            if (cart[elem].name == product) {
                delete cart[elem];
            }
        }
    }
    console.log(cart);
}


function goToFinalizeBuy(){
    $(document).ready( function(){
        var valorDaCompra = 0;

        var request = indexedDB.open("petshop", 3);

        request.onsuccess = function(event){
            var db = event.target.result;
            var transaction = db.transaction(["Estoque"], "readwrite");
            var store = transaction.objectStore("Estoque");
            var count = store.count();
            count.onsuccess = function(){
                n = count.result;
            };
            var getAll = store.getAll();
            getAll.onsuccess = function(e){
                for (var item_cart in cart) { //checa se os a quantidade pedida esta disponivel em estoque e calcula o valor final da compra
                    for (var item_bd in e.target.result) {
                        if (cart[item_cart].name == e.target.result[item_bd].name) {
                            if (e.target.result[item_bd].qtd_estoque < cart[item_cart].quant) {
                                alert ("Quantidade de item nao disponivel em estoque");
                                //TODO voltar para tela inicial de Comprar
                                cart = [];
                                break;
                            } else {
                                valorDaCompra += e.target.result[item_bd].preco * cart[item_cart].quant;
                                updateStorage(item_bd, cart[item_cart].quant);
                            }
                        }
                    }
                }
                finishingSale(valorDaCompra);
            };

            db.close();
        };


        // console.log(document.getElementById('#finalizeBuy').innerHTML);

        $("#mutableMiddleColumn").load("../html/colunameioprodutocartao.html");
        state = 1;
    });
}

function finishingSale(totalValue) {
    var request = indexedDB.open("petshop", 3);
    request.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction(["Vendas"], "readwrite");
        var store = transaction.objectStore("Vendas");
        var itens = "";
        for (var item_cart in cart) {
            itens += cart[item_cart].name + "," + cart[item_cart].quant + ". ";
        }
        console.log(totalValue);
        var venda = {
            user: loggedUser,
            itens: itens,
            total: totalValue
        };
        var request = store.add(venda);

        db.close();
    };
}

function updateStorage(product_id, quantidadeVendida) {
    var request = indexedDB.open("petshop", 3);
    console.log("id: "+product_id);

    request.onsuccess = function(event){
        var db = event.target.result;
        var transaction = db.transaction(["Estoque"], "readwrite");
        var store = transaction.objectStore("Estoque");
        var get = store.get(product_id);

        get.onsuccess = function(e) {
            var result = e.target.result;
            if(typeof result !== "undefined"){
                var produto = {
                    name: result.name,
                    photo: result.photo,
                    descricao: resulta.descricao,
                    preco: result.preco,
                    qtd_estoque: result.qtd_estoque - quantidadeVendida,
                    qtd_vendida: result.qtd_vendida + quantidadeVendida
                };
                var update = store.put(produto);
                update.onssuccess = function(e) {
                    console.log("fechou o produto");
                }
            }
        };

        db.close();
    };
}

function goToEditRegister(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/edit.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioedit.html");
        }
        state = 1;
    });
}

function goToRegisterOrListPet(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/pet.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameiopet.html");
        }
        listPets();
        state = 1;
    });
}

function goToSchedule(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/calendarioservicosescolherdia.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunaMeioCalendarioServicosEscolherDia.html");
        }
        state = 1;
    });
}

function goToDeleteService(){
	$("#mutableMiddleColumn").load("../html/colunameiodeletarservico.html");
    state = 1;
}

function goToUpdateService(){
	$("#mutableMiddleColumn").load("../html/colunameioatualizarservico.html");
    state = 1;
}

function goToRegisterService(){
	$("#mutableMiddleColumn").load("../html/colunameiocadastrarservico.html");
    state = 1;
}

function goToDeleteProduct(){
	$("#mutableMiddleColumn").load("../html/colunameiodeletarprodutos.html");
    state = 1;
}

function goToUpdateProduct(){
	$("#mutableMiddleColumn").load("../html/colunameioatualizarprodutos.html");
    state = 1;
}

function goToRegisterProduct(){
	$("#mutableMiddleColumn").load("../html/colunameiocadastrarprodutos.html");
    state = 1;
}

function goToSelectHour(){
	$("#mutableMiddleColumn").load("../html/colunaMeioCalendarioServicosEscolherHorario.html");
    state = 1;
}

function goToFinalizeService(){
    $("#mutableMiddleColumn").load("../html/colunameioschedule.html");
    state = 1;
}

function goToRegisterPet(){
    $("#mutableMiddleColumn").load("../html/colunameiocadastraranimais.html");
    state = 1;
}

function goToEditPet(id){
    $("#mutableMiddleColumn").load("../html/colunameioeditaranimais.html");
    state = 1;
    pet_id = id;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#photo')
                .attr('src', e.target.result)
                .width(130)
                .height(130);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function registerPet(){
    $(document).ready( function(){
        console.log("entrou pet");
        try {
            var petName = $("#petName").val();
            var race = $("#race").val();
            var petPhoto = $("#photo").attr('src');
            var age = $("#age").val();

            if (petName !== "" && race !== "" && age !== "") {
                var request = indexedDB.open("petshop", 3);
                request.onsuccess = function(e) {
                    var db = e.target.result;
                    var transaction = db.transaction(["Animais"], "readwrite");
                    var store = transaction.objectStore("Animais");
                    var pet = {
                        login: loggedUser,
                        petPhoto: petPhoto,
                        petName: petName,
                        race: race,
                        age: age
                    };
                    var add = store.add(pet);
                    add.onsuccess = function(e){
                        console.log("cadastrou bunito");
                    }

                    db.close();

                    goToRegisterOrListPet();
                }
            }
        } catch(err) {
            console.log(err.message);
        }

        console.log(petName);
        console.log(race);
        console.log(age);
    });
}

function editPet(){
    $(document).ready( function(){
        var newPetName = $("#petName").val();
        var newPetPhoto = $("#photo").attr('src');
        var newRace = $("#race").val();
        var newAge = $("#age").val();

        var request = indexedDB.open("petshop", 3);

        request.onsuccess = function(event){
            var db = event.target.result;

            var transaction = db.transaction(["Animais"], "readwrite");

            var store = transaction.objectStore("Animais");

            var get = store.get(pet_id);

            get.onsuccess = function(e){
                var result = e.target.result;


                if(typeof result !== "undefined"){
                    if(newPetName === ""){
                        newPetName = result.petName;
                    }

                    if(newRace === ""){
                        newRace = result.race;
                    }

                    if(newPetPhoto === "../assets/pic.jpg"){
                        newPetPhoto = result.petPhoto;
                    }

                    if(newAge === ""){
                        newAge = result.age;
                    }

                    var pet = {
                        id: Number(pet_id),
                        petName: newPetName,
                        petPhoto: newPetPhoto,
                        race: newRace,
                        age: Number(newAge),
                        login: result.login
                    };

                    var update = store.put(pet);

                }
            };

            db.close();

            goToRegisterOrListPet();

        };
    });

}

function editProfile(){
    $(document).ready(function(){
        var newName = $("#newName").val();
        var newPhoto = $("#photo").attr('src');
        var newLogin = $("#newLogin").val();
        var oldPassWord = $("#oldPassWord").val();
        var newPassWord = $("#newPassWord").val();
        var newPassWord2 = $("#newPassWord2").val();
        var newAdress = $("#newAdress").val();
        var newTel = $("#newTel").val();
        var newEmail = $("#newEmail").val();
        var isAdmin = false;
        var empty_password = 0;

        var request = indexedDB.open("petshop", 3);

        request.onsuccess = function(event){
            var db = event.target.result;

            var transaction = db.transaction(["Usuarios"], "readwrite");

            var store = transaction.objectStore("Usuarios");

            var get = store.get(loggedUser);


            get.onsuccess = function(e){
                var result = e.target.result;


                if(typeof result !== "undefined"){
                    if(newName === ""){
                        newName = result.name;
                    }

                    if(newPhoto === "/assets/pic.jpg"){
                        newPhoto = result.photo;
                    }

                    if(newPassWord === "" && newPassWord2 === ""){
                        newPassWord = result.passWord;
                        newPassWord2 = result.passWord;
                        empty_password = 1;
                    }

                    if(newAdress === ""){
                        newAdress = result.address;
                    }

                    if(newTel === ""){
                        newTel = result.tel;
                    }

                    if(newEmail === ""){
                        newEmail = result.email;
                    }

                    isAdmin = result.isAdmin;
                }



                var user = {
                    name: newName,
                    photo: newPhoto,
                    login: loggedUser,
                    passWord: newPassWord,
                    address: newAdress,
                    tel: newTel,
                    email: newEmail,
                    isAdmin: isAdmin
                };

                console.log(newPhoto);

                if(newPassWord === newPassWord2){
                    if(newPassWord === oldPassWord && newPassWord !== "" && empty_password == 0){
                        alert("A senha deve ser distinta da anterior");
                    }else{
                        var update = store.put(user);

                        update.onsuccess = function(){
                            console.log("alterou bunito");
                            $("#userPhoto").attr('src', user.photo);
                        }

                        alert("Alteracao realizada com sucesso");
                    }
                }else{
                    alert("Novas senhas diferem");
                }
            };

            db.close();
        };


    });
}
/*----------------------------------------------------------------------------*/
function userCard(name, photo){
    $(document).ready( function(){
        $("#mutableCard").load("../html/usercard.html", function(){
            $("#personName").html(name);
            $("#userPhoto").attr('src', photo);
        });
    });
}

function adminCard(name, photo){
    $(document).ready( function(){
        $("#mutableCard").load("../html/admincard.html", function(){
            $("#personName").html(name);
            $("#photoAdmin")
                .attr('src', photo)
                .width(130)
                .height(130);
        });
    });
}

function loginCard(){
    $(document).ready( function(){
        $("#mutableCard").load("../html/logincard.html");
    });
}

function userNavBar(){
    $(document).ready( function(){
        $("#mutableNavBar").load("../html/usernavbar.html");
    });
}

function guestNavBar(){
    $(document).ready( function(){
        $("#mutableNavBar").load("../html/guestnavbar.html");
    });
}

function adminNavBar(){
    $(document).ready( function(){
        $("#mutableNavBar").load("../html/adminnavbar.html");
    });
}
/*----------------------------utilidades--------------------------------------*/

function deletePet(id){
    $(document).ready( function(){
        if(confirm("Deseja mesmo deletar esse Animal?")){
            var request = indexedDB.open("petshop", 3);

            request.onsuccess = function(event){
                var db = event.target.result

                var transaction = db.transaction(["Animais"], "readwrite");

                var store = transaction.objectStore("Animais");

                var del = store.delete(id);

                db.close();

                goToRegisterOrListPet();
            };
        }
    });
}

function carregarServico(){
	$(document).ready( function(){
        try{
            var id = $("#ID").val();

            if(id !== ""){

				var request = indexedDB.open("petshop", 3);

				request.onsuccess = function(event){
					var db = event.target.result;
					var transaction = db.transaction(["Servicos"], "readwrite");
					var store = transaction.objectStore("Servicos");
					var request = store.get(Number(id));

					request.onsuccess = function(e){

						var result = e.target.result;
						if(typeof result !== "undefined"){

							document.getElementById("productName").value = request.result.name;
							document.getElementById("photo").src = request.result.photo;
							document.getElementById("descricao").value = request.result.descricao;
							document.getElementById("price").value = request.result.preco;
							// console.log(request.result.name + " " + request.result.descricao + " " + request.result.preco);
						}else{
							alert("O ID não existe");
						}
					};

					db.close();
				}
            }else{
                alert("É necessário preencher o ID!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

function atualizarServico(){
	$(document).ready( function(){
        try{
            var id = $("#ID").val();
			var name = $("#productName").val();
            var photo = $("#photo").attr('src');
			var descricao = $("#descricao").val();
			var preco = $("#price").val();

            if(confirm("Quer mesmo atualizar o servico?")){
				if(id !== "" && name !== "" && descricao !== "" && preco !== ""){

					var request = indexedDB.open("petshop", 3);

					request.onsuccess = function(event){
						var db = event.target.result;
						var transaction = db.transaction(["Servicos"], "readwrite");
						var store = transaction.objectStore("Servicos");
						var request = store.get(Number(id));

						request.onsuccess = function(e){
							var data = request.result;
							data.name = name;
							data.photo = photo;
							data.descricao = descricao;
							data.preco = preco;
							// console.log(request.result.name + " " + request.result.descricao + " " + request.result.preco);

							var requestUpdate = store.put(data);
								requestUpdate.onsuccess = function(event){
									alert("O id " + id + " foi atualizado");
								}
						};

						db.close();
						goToServiceManager();
					}
				}else{
					alert("É necessário preencher os campos!");
				}
			}
        }catch(err){
			console.log(err.message);
        }
    });
}

function deletarServico(){
	$(document).ready( function(){
        try{
            var id = $("#ID").val();
			var name = $("#productName").val();
			var descricao = $("#descricao").val();
			var preco = $("#price").val();

            if(confirm("Quer mesmo deletar o servico?")){
				if(id !== "" && name !== "" && descricao !== "" && preco !== ""){

					var request = indexedDB.open("petshop", 3);

					request.onsuccess = function(event){
						var db = event.target.result;
						var transaction = db.transaction(["Servicos"], "readwrite");
						var store = transaction.objectStore("Servicos");


						var request = store.delete(Number(id));
						request.onsuccess = function(e){
							alert("O id " + id + " foi deletado");
						};

						db.close();
						goToServiceManager();
					}
				}else{
					alert("É necessário preencher os campos!");
				}
			}
        }catch(err){
			console.log(err.message);
        }
    });
}

function carregarProduto(){
	$(document).ready( function(){
        try{
            var id = $("#ID").val();

            if(id !== ""){

				var request = indexedDB.open("petshop", 3);

				request.onsuccess = function(event){
					var db = event.target.result;
					var transaction = db.transaction(["Estoque"], "readwrite");
					var store = transaction.objectStore("Estoque");
					var request = store.get(Number(id));

					request.onsuccess = function(e){

						var result = e.target.result;
						if(typeof result !== "undefined"){

							document.getElementById("productName").value = request.result.name;
							document.getElementById("photo").src = request.result.photo;
							document.getElementById("descricao").value = request.result.descricao;
							document.getElementById("price").value = request.result.preco;
							document.getElementById("stock").value = request.result.qtd_estoque;
							document.getElementById("sold").value = request.result.qtd_vendida;
							// console.log(request.result.name + " " + request.result.descricao + " " + request.result.preco);
						}else{
							alert("O ID não existe");
						}
					};

					db.close();
				}
            }else{
                alert("É necessário preencher o ID!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

function atualizarProduto(){
	$(document).ready( function(){
        try{
            var id = $("#ID").val();
			var name = $("#productName").val();
            var photo = $("#photo").attr('src');
			var descricao = $("#descricao").val();
			var preco = $("#price").val();
			var stock = $("#stock").val();
			var sold = $("#sold").val();
			console.log(photo);

            if(confirm("Quer mesmo atualizar o produto?")){
				if(id !== "" && name !== "" && descricao !== "" && preco !== "" && stock !== "" && sold !== ""){

					var request = indexedDB.open("petshop", 3);

					request.onsuccess = function(event){
						var db = event.target.result;
						var transaction = db.transaction(["Estoque"], "readwrite");
						var store = transaction.objectStore("Estoque");
						var request = store.get(Number(id));

						request.onsuccess = function(e){
							var data = request.result;
							data.name = name;
							data.photo = photo;
							data.descricao = descricao;
							data.preco = preco;
							data.qtd_estoque = stock;
							data.qtd_vendida = sold;
							// console.log(request.result.name + " " + request.result.descricao + " " + request.result.preco);

							var requestUpdate = store.put(data);
								requestUpdate.onsuccess = function(event){
									alert("O id " + id + " foi atualizado");
								}
						};

						db.close();
						goToStockManager();
					}
				}else{
					alert("É necessário preencher os campos!");
				}
			}
        }catch(err){
			console.log(err.message);
        }
    });
}

function deletarProduto(){
	$(document).ready( function(){
        try{
            var id = $("#ID").val();
			var name = $("#productName").val();
			var descricao = $("#descricao").val();
			var preco = $("#price").val();
			var stock = $("#stock").val();
			var sold = $("#sold").val();

            if(confirm("Quer mesmo deletar o produto?")){
				if(id !== "" && name !== "" && descricao !== "" && preco !== ""){

					var request = indexedDB.open("petshop", 3);

					request.onsuccess = function(event){
						var db = event.target.result;
						var transaction = db.transaction(["Estoque"], "readwrite");
						var store = transaction.objectStore("Estoque");


						var request = store.delete(Number(id));
						request.onsuccess = function(e){
							alert("O id " + id + " foi deletado");
						};

						db.close();
						goToStockManager();
					}
				}else{
					alert("É necessário preencher os campos!");
				}
			}
        }catch(err){
			console.log(err.message);

        }
    });
}

function changeHMTL(table, n, id){
    if(id === "#estoque"){
        var eachline = "<tr><th>Id</th><th>Nome</th><th>Descrição</th><th>Preço</th><th>Quantidade em estoque</th><th>Quantidade vendida</th></tr>";
        for(i=0; i<n; i++){
            eachline += "<tr><td>"+ table[i].id.toString()+"</td><td>"+ table[i].name+"</td><td>"+table[i].descricao+"</td><td>"+table[i].preco.toString()+"</td><td>"+table[i].qtd_estoque.toString()+"</td><td>"+table[i].qtd_vendida.toString()+"</td></tr>";
        }
    }else if(id === "#servicos"){
        var eachline = "<tr><th>Id</th><th>Nome</th><th>Descrição</th><th>Preço</th></tr>";
        for(i=0; i<n; i++){
            eachline += "<tr><td>"+ table[i].id.toString()+"</td><td>"+ table[i].name+"</td><td>"+table[i].descricao+"</td><td>"+table[i].preco.toString()+"</td></tr>";
        }
    }else{
        eachline="";
        for(i=0; i<n; i++){
            console.log(n);
            eachline += '<li><img src='+ table[i].petPhoto+ ' alt="Someone" style="width:130px; height:130px;"><br>Nome: ' + table[i].petName + "<br>Raça: " + table[i].race + "<br>Idade: " + table[i].age + "<br>" + '<a><button class="btn" type="button" onClick="goToEditPet('+table[i].id+');">Atualizar</button></a><button class="btn" type="button" onclick="deletePet('+table[i].id+')">Deletar</button><br></li>';
        }
    }

    $(id).html(eachline);
}

function listPets(){
    $(document).ready( function(){
        try{

            var n = 0;
            var table;
            var request = indexedDB.open("petshop", 3);

            request.onsuccess = function(event){
                var db = event.target.result;

                var transaction = db.transaction(["Animais"], "readwrite");

                var store = transaction.objectStore("Animais");

                var count = store.count();

                count.onsuccess = function(){
                    n = count.result;
                };

                var getAll = store.getAll();

                getAll.onsuccess = function(e){
                    table = e.target.result;
                    var table2 = [];
                    var n2 = 0;

                    for (i=0;i<n;i++){
                        if(table[i].login === loggedUser){
                            table2[n2] = table[i];
                            n2++;
                        }
                    }
                    changeHMTL(table2, n2, "#pets");
                };

                db.close();
            };

        }catch(err){
            console.log(err.message);
        }
    });
}

function listStock(){
    $(document).ready( function(){
        try{

            var n = 0;
            var table;
            var request = indexedDB.open("petshop", 3);

            console.log("estoque");

            request.onsuccess = function(event){
                var db = event.target.result;

                var transaction = db.transaction(["Estoque"], "readwrite");

                var store = transaction.objectStore("Estoque");

                var count = store.count();

                count.onsuccess = function(){
                    n = count.result;
                };

                var getAll = store.getAll();

                getAll.onsuccess = function(e){
                    table = e.target.result;
                    changeHMTL(table, n, "#estoque");
                };

                db.close();
            };

        }catch(err){
            console.log(err.message);
        }
    });
}

function listServices(){
    $(document).ready( function(){
        try{

            var n = 0;
            var table;
            var request = indexedDB.open("petshop", 3);

            request.onsuccess = function(event){
                var db = event.target.result;

                var transaction = db.transaction(["Servicos"], "readwrite");

                var store = transaction.objectStore("Servicos");

                var count = store.count();

                count.onsuccess = function(){
                    n = count.result;
                };

                var getAll = store.getAll();

                getAll.onsuccess = function(e){
                    table = e.target.result;
                    changeHMTL(table, n, "#servicos");
                };

                db.close();
            };

        }catch(err){
            console.log(err.message);
        }
    });
}


function registerAdmin(){
    $(document).ready( function(){
        try{
            var name = $("#name").val();
            var login = $("#login").val();
            var photo = $("#photo").attr('src');
            var passWord = $("#passWord").val();
            var passWord2 = $("#passWord2").val();
            var address = $("#address").val();
            var tel = $("#tel").val();
            var email = $("#email").val();

            if(name !== "" && login !== "" && passWord !== "" && passWord2 !== "" && address !== "" && tel !== "" && email !== ""){
                if(passWord === passWord2){

					var request = indexedDB.open("petshop", 3);

					request.onsuccess = function(event){
						var db = event.target.result;

						var transaction = db.transaction(["Usuarios"], "readwrite");

						var store = transaction.objectStore("Usuarios");

						var user = {
							name: name,
							login: login,
                            photo: photo,
							passWord: passWord,
							address: address,
							tel: tel,
							email: email,
							isAdmin: true
						};

						var add = store.add(user);

						add.onsuccess = function(e){
							console.log("cadastrou bunito");
                            alert("Cadastro realizado com sucesso");
                            goToAdminRegister();
						}

						db.close()
					};
                }else{
                    alert("Senhas diferem");
                }
            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

function registerClient(){
    $(document).ready( function(){
        try{
            var name = $("#name").val();
            var login = $("#login").val();
            var photo = $("#photo").attr('src');
            var passWord = $("#passWord").val();
            var passWord2 = $("#passWord2").val();
            var address = $("#address").val();
            var tel = $("#tel").val();
            var email = $("#email").val();

            if(name !== "" && login !== "" && passWord !== "" && passWord2 !== "" && address !== "" && tel !== "" && email !== ""){
                if(passWord === passWord2){

					var request = indexedDB.open("petshop", 3);

					request.onsuccess = function(event){
						var db = event.target.result;

						var transaction = db.transaction(["Usuarios"], "readwrite");

						var store = transaction.objectStore("Usuarios");

						var user = {
							name: name,
							login: login,
                            photo: photo,
							passWord: passWord,
							address: address,
							tel: tel,
							email: email,
							isAdmin: false
						};

						var add = store.add(user);

						add.onsuccess = function(e){
							console.log("cadastrou bunito");
                            alert("Cadastro efetuado com sucesso");
                            goToClientRegister();
						};


						db.close()
					};
                }else{
                    alert("Senhas diferem");
                }
            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

function registerProduct(){
    $(document).ready( function(){
        try{
            var name = $("#productName").val();
            var descricao = $("#descricao").val();
            var photo = $("#photo").attr('src');
            var price = $("#price").val();
            var stock = $("#stock").val();
            var sold = $("#sold").val();

            if(name !== "" && descricao !== "" && price !== "" && stock !== "" && sold !== ""){

				var request = indexedDB.open("petshop", 3);

				request.onsuccess = function(event){
					var db = event.target.result;

					var transaction = db.transaction(["Estoque"], "readwrite");

					var store = transaction.objectStore("Estoque");

					var product = {
						name: name,
						descricao: descricao,
                        photo: photo,
						preco: Number(price),
						qtd_estoque: Number(stock),
						qtd_vendida: Number(sold),
					};

					var add = store.add(product);

					add.onsuccess = function(e){
						console.log("cadastrou bunito");
					};


					db.close()
				};
				goToStockManager();

            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

function registerService(){
    $(document).ready( function(){
        try{
            var name = $("#productName").val();
            var descricao = $("#descricao").val();
            var photo = $("#photo").attr('src');
            var price = $("#price").val();

            if(name !== "" && descricao !== "" && price !== ""){

				var request = indexedDB.open("petshop", 3);

				request.onsuccess = function(event){
					var db = event.target.result;

					var transaction = db.transaction(["Servicos"], "readwrite");

					var store = transaction.objectStore("Servicos");

					var service = {
						name: name,
                        photo: photo,
						descricao: descricao,
						preco: Number(price),
					};

					var add = store.add(service);

					add.onsuccess = function(e){
						console.log("cadastrou bunito");
					};


					db.close()
				};

                goToServiceManager();
            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

function userLogin(){
    try{
        var userName = document.getElementById("login").elements.namedItem("userName").value;
        var passWord = document.getElementById("login").elements.namedItem("passWord").value;
        loggedUser = userName;

        console.log(userName);
        console.log(passWord);

        var request = indexedDB.open("petshop", 3);

        request.onsuccess = function(event){
            request = event.target.result;

            var transaction = request.transaction(["Usuarios"], "readonly");
            var store = transaction.objectStore("Usuarios");

            var get = store.get(userName);

            get.onsuccess = function(e){
                var result = e.target.result;

                if(typeof result !== "undefined"){
                    if(result.login === userName && result.passWord === passWord){
                        userNavBar();
                        userCard(userName, result.photo);
                    }else{
                        alert("Senha inválida");
                    }
                }else{
                    alert("Usuário inválido!");
                }

            };

            request.close();
        };

    }catch(err){
        console.log(err.message);
    }
}

function adminLogin(){
    try{
        var userName = document.getElementById("login").elements.namedItem("userName").value;
        var passWord = document.getElementById("login").elements.namedItem("passWord").value;

        console.log(userName);
        console.log(passWord);

        var request = indexedDB.open("petshop", 3);

        request.onsuccess = function(event){
            request = event.target.result;

            var transaction = request.transaction(["Usuarios"], "readonly");
            var store = transaction.objectStore("Usuarios");

            var get = store.get(userName);

            get.onsuccess = function(e){
                var result = e.target.result;

                if(typeof result !== "undefined"){
                    if(result.login === userName && result.passWord === passWord && result.isAdmin){
                        adminNavBar();
                        adminCard(userName, result.photo);
                        console.log("WELCOME LORD");
                    }else{
                        alert("VOCE NÃO É UM ADMIN!!");
                    }
                }else{
                    alert("Usuário inválido!");
                }

            };

            request.close();
        };

    }catch(err){
        console.log(err.message);

    }
}

function logout(){
    try{
        guestNavBar();
        loginCard();
        goToHome();
    }catch(err){
        console.log(err.message)
    }
}
