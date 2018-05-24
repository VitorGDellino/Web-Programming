function userCard(name, photo){
    $(document).ready( function(){
        $("#mutableHeader").load("../html/usercard.html");
        $("#personName").text(name);
    });
}

function adminCard(name, photo){
    $(document).ready( function(){
        $("#mutableHeader").load("../html/admincard.html");
    });
}

function loginCard(){
    $(document).ready( function(){
        $("#mutableHeader").load("../html/logincard.html");
    });
}
