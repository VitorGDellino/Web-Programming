/*----------------FUNCOES RELACIONADAS A NAVEGACAO----------------------------*/
state = 0;

function goToHome(){
    $(document).ready( function(){
        document.body.style.backgroundImage = "url(../assets/background.png)";
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
        conole.log("TA AQUI");
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
            $("#mutableContent").load("../html/schedule.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioschedule.html");
        }
        state = 1;
    });
}
/*----------------------------------------------------------------------------*/
function userCard(name, photo){
    $(document).ready( function(){
        $("#mutableCard").load("../html/usercard.html");
        console.log(name);
        document.getElementById("personName").innerHTML = name;
    });
}

function adminCard(name, photo){
    $(document).ready( function(){
        $("#mutableCard").load("../html/admincard.html");
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
