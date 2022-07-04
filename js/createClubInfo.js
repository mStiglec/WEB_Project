var teamStatistic = [];

function fetchClubStatisticsFromApi(leagueId,teamId){
    var url = "https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=" + leagueId + "&season=2021&team=" + teamId;
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (json) {
        console.log(json.response);
        teamStatistic = json.response;
    });
}

function createClubInfo(){
    createHeader(teamStatistic.league,teamStatistic.team);
    createForm(teamStatistic.form);
    updateGamesBarChart("total");
    //createPlayerList();
}

function createHeader(leagueData,teamData){
    var clubInfoHeader = d3.select("#clubInfoHeader");
    clubInfoHeader.html("");
    clubInfoHeader.append("div")
        .style("float","left")
         .append("img")
          .attr("src",teamData.logo)
          .attr("class","mt-2")
          .attr("width","100px")
          .attr("height","100px")

    clubInfoHeader.append("p").attr("class","text-center mt-3 fw-bold h4").html(teamData.name);
    clubInfoHeader.append("p")
        .attr("class","text-center fw-bold h6")
        .html("Season: " + leagueData.season);

    clubInfoHeader.append("div")
        .attr("class","text-center")
         .append("img")
          .attr("src",leagueData.flag)
          .attr("class","rounded-circle mb-2")
          .attr("width","35px")
          .attr("height","35px");
}

function createForm(clubForm){
    var formData = [];
    for(let i=0;i<15;i++){
        formData.push(clubForm[clubForm.length-1-i]);
    }

    d3.select("clubForm svg").html("");
    d3.select("#clubForm svg").selectAll("circle")
        .data(formData)
        .enter()
         .append("circle")
          .attr("cx",function(d,i){return 26*i+15;})
          .attr("cy",20)
          .attr("r",12)
          .attr("fill",function(d){
            if(d == "W"){return "#04c43a";}
            if(d == "D"){return "#fce303";}
            if(d == "L"){return "#f23847";}
          });

    d3.select("#clubForm svg").selectAll("text")
        .data(formData)
        .enter()
         .append("text")
          .attr("fill","black")
          .attr("dx",function(d,i){return 26*i+7;})
          .attr("dy",25)
          .attr("class","fw-bold h6")
          .text(function(d){return d;});
}

function updateGamesBarChart(inputText){
    d3.select("#clubGames svg").html("");
    $.getJSON("../json/TeamStatistic.json",function(json){
        var gamesData = [];
        fixturesData = json.response.fixtures;
        if(inputText=="total"){
            gamesData = [fixturesData.wins.total,
                         fixturesData.draws.total,
                         fixturesData.loses.total];
        }else if(inputText == "home"){
            gamesData = [fixturesData.wins.home,
                         fixturesData.draws.home,
                         fixturesData.loses.home];
        }else if(inputText == "away"){
            gamesData = [fixturesData.wins.away,
                         fixturesData.draws.away,
                         fixturesData.loses.away];
        }
    
        var colors = ["#04c43a","#fce303","#f23847"];

        d3.select("#clubGames svg").selectAll("text")
        .data(gamesData)
        .enter()
         .append("text")
          .attr("fill","white")
          .attr("dx",10)
          .attr("dy",function(d,i){return 40*i+30;})
          .attr("class","fw-bold h6 text-white")
          .text(function(d,i){
            if(i==0){return "Wins (" + d + ")";}
            if(i==1){return "Draws (" + d + ")";}
            if(i==2){return "Loses (" + d + ")";}
            });   

        d3.select("#clubGames svg").selectAll("rect")
        .data(gamesData)
        .enter()
        .append("rect")
        .attr("fill",function(d,i){return colors[i];})
        .attr("height",30)
        .attr("x",100)
        .attr("y",function(d,i){return 40*i + 10;})
        .transition()
        .duration(2000)
        .attr("width",function(d){
            return d*10;
        })
    });
}

function createPlayerList(){
    $.getJSON("../json/PlayersByTeamId.json",function(json){
        var playerData = [];
        for(let i = 0;i<json.response.length;i++){
            if(!json.response[i].statistics[0].games.rating){
                json.response[i].statistics[0].games.rating = "0";
            }
            playerData.push({"name":json.response[i].player.name,
                             "photo":json.response[i].player.photo,
                             "nationality":json.response[i].player.nationality,
                             "position":json.response[i].statistics[0].games.position,
                             "rating":parseFloat(json.response[i].statistics[0].games.rating)});
        }

        sort(playerData);

        var playerDivs = d3.select("#playerClubList").selectAll("div")
                .data(playerData)
                .enter()
                .append("div")
                .style("float","left")
                .attr("class","mt-2");

        playerDivs.append("img")
            .attr("src",function(d){return d.photo;})
            .style("float","left")
            .attr("class","rounded-circle ms-3 mb-1")
            .attr("width","50px")
            .attr("height","50px");
        
        var nameDiv = playerDivs.append("div").style("float","left");
        nameDiv.append("p").attr("class","ps-3 m-0").html(function(d){return d.name;});
        nameDiv.append("p").attr("class","ps-3 m-0").html(function(d){return d.position;});

        playerDivs.append("p")
            .attr("class","p-2 border rounded-2 ms-4")
            .style("float","left")
            .html(function(d){return d.rating.toFixed(2);});

        createPlayerStatistics(json.response[0]);
    });
}

function sort(playerData){
    for(let i=0;i<playerData.length-1;i++){
        for(let j=0;j<playerData.length-1;j++){
            if(playerData[j].rating < playerData[j+1].rating){
                var temp = playerData[j];
                playerData[j] = playerData[j+1];
                playerData[j+1] = temp;
            }
        }
    }
}