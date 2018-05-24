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
        $("#mutableContent").load("../html/about.html");
        document.body.style.backgroundImage = "none";
    });
}
function goToServiceManager(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/about.html");
        document.body.style.backgroundImage = "none";
    });
}
function goToStockManager(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/about.html");
        document.body.style.backgroundImage = "none";
    });
}
