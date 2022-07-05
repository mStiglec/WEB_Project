var leagues = [];

function fetchLeaguesFromApi(){
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://api-football-v1.p.rapidapi.com/v3/leagues",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (json) {
        leagues = json.response;
    });
}


function updateLeaguesNavbar(inputText){
    if(inputText==""){createLeaguesNavbar();return;}
        var chosenLeagues = [];
        for(let i=0;i<leagues.length;i++){
            if((leagues[i].league.name.toLowerCase()).includes(inputText.toLowerCase())){
                chosenLeagues.push({"name":leagues[i].league.name,
                                    "logo":leagues[i].league.logo,
                                    "id":leagues[i].league.id});
                if(chosenLeagues.length>12){break;};
            };
        }
        updateLeagueNavbar(chosenLeagues);
}

function createLeaguesNavbar(){
    d3.select("#leaguesNav").html("");
    var popularLeagues = [{"name":"Premier League","logo":"https://media.api-sports.io/football/leagues/39.png","id":"39"},
                          {"name":"La Liga","logo":"https://media.api-sports.io/football/leagues/140.png","id":"140"},
                          {"name":"Serie A","logo":"https://media.api-sports.io/football/leagues/135.png","id":"135"},
                          {"name":"Bundesliga 1","logo":"https://media.api-sports.io/football/leagues/78.png","id":"78"},
                          {"name":"Ligue 1","logo":"https://media.api-sports.io/football/leagues/61.png","id":"61"},
                          {"name":"Primiera Liga","logo":"https://media.api-sports.io/football/leagues/94.png","id":"94"},
                          {"name":"Eredivisie","logo":"https://media.api-sports.io/football/leagues/88.png","id":"88"},
                          {"name":"Prva HNL","logo":"https://media.api-sports.io/football/leagues/210.png","id":"210"}];

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
        .style("background-color","white")
        .on("click",function(d,i){
            showTableByLeagueId(i.id);
        });
        
        leaguesLists.append("p")
        .attr("class","text-white h6 pt-1 ps-2")
        .style("float","left")
        .html(function(d){return d.name;})
        .on("click",function(d,i){
            showTableByLeagueId(i.id);
        });
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
        .style("float","left")
        .on("click",function(d,i){
            showTableByLeagueId(i.id);
        });
        
    leaguesLists.append("p")
        .attr("class","text-white pt-1 ps-1")
        .style("float","left")
        .style("font-size","14px")
        .style("max-width","200px")
        .html(function(d){return d.name;})
        .on("click",function(d,i){
            showTableByLeagueId(i.id);
        });
}