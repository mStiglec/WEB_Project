$(document).ready(function(){
    $("#livescoreBtn").click(function(){
        alert("clicked");
        if($("#wg-api-football-livescore").is(":hidden")){
            alert("hidden");
            $("#livescoreDiv").show();
        }else{
            alert("show");
            $("#livescoreDiv").hide();
        }
    });
});

