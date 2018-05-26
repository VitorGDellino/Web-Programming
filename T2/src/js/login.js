/*----------------FUNCOES RELACIONADAS A NAVEGACAO----------------------------*/
state = 0;

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
        state = 1
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
            $("#mutableContent").load("../html/editregister.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioeditregister.html");
        }
        state = 1;
    });
}

function goToRegisterOrListPet(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/registerorlistpet.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioregorlistpet.html");
        }
        state = 1;
    });
}

function goToSchedule(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/calendarioservicos.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameiocalendarioservicos.html");
        }
        state = 1;
    });
}

function goToFinalizeService(){
    $("#mutableMiddleColumn").load("../html/colunameioschedule.html");
    state = 1;
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
                    alert("Cadastro efetuado com sucesso");
                }else{
                    alert("Senhas diferem");
                }
            }else{
                alert("É necessário preencher todos os campos!");
            }
            console.log(name);
            console.log(login);
            console.log(passWord);
            console.log(passWord2);
            console.log(address);
            console.log(tel);
            console.log(email);

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
                    alert("Cadastro efetuado com sucesso");
                }else{
                    alert("Senhas diferem");
                }
            }else{
                alert("É necessário preencher todos os campos!");
            }

            console.log(name);
            console.log(login);
            console.log(passWord);
            console.log(passWord2);
            console.log(address);
            console.log(tel);
            console.log(email);

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
