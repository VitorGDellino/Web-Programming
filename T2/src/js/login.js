/*----------------FUNCOES RELACIONADAS A NAVEGACAO----------------------------*/
function goToHome(){
    $(document).ready( function(){
        document.body.style.backgroundImage = "url(../assets/background.png)";
        $("#mutableContent").load("../html/home.html");
    });

}

function goToProducts(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/produtos.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToServices(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/servicos.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToAbout(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/about.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToAdminRegister(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/adminregister.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToClientRegister(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/clientregister.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToServiceManager(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/servicesmanager.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToStockManager(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/stockmanager.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToBuy(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/buy.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToEditRegister(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/editregister.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToRegisterOrListPet(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/registerorlistpet.html");
        document.body.style.backgroundImage = "none";
    });
}

function goToSchedule(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/schedule.html");
        document.body.style.backgroundImage = "none";
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
