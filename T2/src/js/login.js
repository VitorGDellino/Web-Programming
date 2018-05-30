/*----------------FUNCOES RELACIONADAS A NAVEGACAO----------------------------*/
state = 0;
//window.location.reload(true)
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
            $("#mutableContent").load("../html/adminregister.html");
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

function goToFinalizeBuy(){
    $(document).ready( function(){
        $("#mutableMiddleColumn").load("../html/colunameioprodutocartao.html");
        state = 1;
    });
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

function goToEditPet(){
    $("#mutableMiddleColumn").load("../html/colunameioeditaranimais.html");
    state = 1;
}

function registerPet(){
    $(document).ready( function(){
        var petName = $("#petName").val();
        var race = $("#race").val();
        var age = $("#age").val();

        console.log(petName);
        console.log(race);
        console.log(age);
    });
}

function editProfile(){
    $(document).ready(function(){
        var newName = $("#newName").val();
        var newLogin = $("#newLogin").val();
        var oldPassWord = $("#oldPassWord").val();
        var newPassWord = $("#newPassWord").val();
        var newPassWord2 = $("#newPassWord2").val();
        var newAdress = $("#newAdress").val();
        var newTel = $("#newTel").val();
        var newEmail = $("#newEmail").val();

        if(newPassWord === newPassWord2){
            if(newPassWord === oldPassWord && newPassWord !== ""){
                alert("A senha deve ser distinta da anterior");
            }else{
                alert("Alteracao realizada com sucesso");
            }
        }else{
            alert("Novas senhas diferem");
        }
    });
}
/*----------------------------------------------------------------------------*/
function userCard(name, photo){
    $(document).ready( function(){
        $("#mutableCard").load("../html/usercard.html", function(){
            $("#personName").html(name);
        });
    });
}

function adminCard(name, photo){
    $(document).ready( function(){
        $("#mutableCard").load("../html/admincard.html", function(){
            $("#personName").html(name);
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
function registerAdmin(){
    $(document).ready( function(){
        try{
            var name = $("#name").val();
            var login = $("#login").val();
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
							passWord: passWord,
							address: address,
							tel: tel,
							email: email,
							isAdmin: true
						};

						var add = store.add(user);

						add.onsuccess = function(e){
							console.log("cadastrou bunito");
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
							passWord: passWord,
							address: address,
							tel: tel,
							email: email,
							isAdmin: false
						};

						var add = store.add(user);

						add.onsuccess = function(e){
							console.log("cadastrou bunito");
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

function userLogin(){
    try{
        var userName = document.getElementById("login").elements.namedItem("userName").value;
        var passWord = document.getElementById("login").elements.namedItem("passWord").value;

        console.log(userName);
        console.log(passWord);

        //FAREI UMA PESQUISA NO BANCO DE DADOS DEPOIS
        var user = "Vitor"; // TODO 1: buscar usuário
        var pass = "1234"; // TODO 2: buscar senha

        if(user === userName && pass === passWord){
            userNavBar();
            userCard(user, "");
            console.log("LOGIN efetuado com sucesso");
        }else{
            alert("Usuário ou senha incorreto(s)!");
        }

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

        //FAREI UMA PESQUISA NO BANCO DE DADOS DEPOIS
        var user = "Vitor"; // TODO 1: buscar usuário
        var pass = "1234"; // TODO 2: buscar senha

        if(user === userName && pass === passWord){
            adminNavBar();
            adminCard(user, "");
            console.log("WELCOME LORD");
        }else{
            alert("YOU SHALL NOT PASS!!");
        }

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
