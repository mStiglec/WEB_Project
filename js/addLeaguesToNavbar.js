function updateLeaguesNavbar(inputText){
    if(inputText==""){createLeaguesNavbar();return;}
    $.getJSON("../json/allLeagues.json",function(json){
        var leagues = json.response;
        var chosenLeagues = [];
        for(let i=0;i<leagues.length;i++){
            if((leagues[i].league.name.toLowerCase()).includes(inputText.toLowerCase())){
                chosenLeagues.push({"name":leagues[i].league.name,
                                    "logo":leagues[i].league.logo});
                if(chosenLeagues.length>12){break;};
            };
        }
        updateLeagueNavbar(chosenLeagues);
    });
}

function createLeaguesNavbar(){
    d3.select("#leaguesNav").html("");
    var popularLeagues = [{"name":"Premier League","logo":"https://media.api-sports.io/football/leagues/39.png"},
                          {"name":"La Liga","logo":"https://media.api-sports.io/football/leagues/140.png"},
                          {"name":"Serie A","logo":"https://media.api-sports.io/football/leagues/135.png"},
                          {"name":"Bundesliga 1","logo":"https://media.api-sports.io/football/leagues/78.png"},
                          {"name":"Ligue 1","logo":"https://media.api-sports.io/football/leagues/61.png"},
                          {"name":"Primiera Liga","logo":"https://media.api-sports.io/football/leagues/94.png"},
                          {"name":"Eredivisie","logo":"https://media.api-sports.io/football/leagues/88.png"},
                          {"name":"Prva HNL","logo":"https://media.api-sports.io/football/leagues/210.png"}];

    var leaguesLists = d3.select("#leaguesNav")
        .selectAll("li")
        .data(popularLeagues)
        .enter()
        .append("li")
        .style("clear","both");

        leaguesLists.append("img")
        .attr("src",function(d){return d.logo;})
        .attr("alt","no_image")
        .attr("width","30px")
        .attr("height","30px")
        .attr("class","rounded-circle m-1")
        .style("float","left")
        .style("background-color","white");
        
        leaguesLists.append("p")
        .attr("class","text-white h6 pt-1 ps-2")
        .style("float","left")
        .html(function(d){return d.name;});
}

function updateLeagueNavbar(chosenLeagues){
    d3.select("#leaguesNav").html("");

    var leaguesLists = d3.select("#leaguesNav")
        .selectAll("li")
        .data(chosenLeagues)
        .enter()
        .append("li")
         .style("clear","both");

    leaguesLists.append("img")
        .attr("src",function(d){return d.logo;})
        .attr("alt","no_image")
        .attr("width","30px")
        .attr("height","30px")
        .attr("class","rounded-circle")
        .style("background-color","white")
        .style("float","left");
        
    leaguesLists.append("p")
        .attr("class","text-white pt-1 ps-1")
        .style("float","left")
        .style("font-size","14px")
        .style("max-width","200px")
        .html(function(d){return d.name;});
}