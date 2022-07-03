var NUMBER_OF_CLUB_PARAMETERS = 8;

function createLeagueTable(){
    $.getJSON("../json/premierLeague.json",function(json){
        var clubsInfo = [];
        for(let i = 0;i<json.response[0].league.standings[0].length;i++){
            clubsInfo.push({"clubLogo":json.response[0].league.standings[0][i].team.logo,
                            "clubName":json.response[0].league.standings[0][i].team.name,
                            "gamesPlayed":json.response[0].league.standings[0][i].all.played,
                            "gamesWin":json.response[0].league.standings[0][i].all.win,
                            "gamesDraw":json.response[0].league.standings[0][i].all.draw,
                            "gamesLose":json.response[0].league.standings[0][i].all.lose,
                            "clubGoalsDiff":json.response[0].league.standings[0][i].all.goals.for + 
                                    ":" + json.response[0].league.standings[0][i].all.goals.against,
                            "clubPoints":json.response[0].league.standings[0][i].points});
        }

        var leagueInfo = {"leagueName":json.response[0].league.name,
                          "leagueLogo":json.response[0].league.logo,
                          "leagueSeason":json.response[0].league.season,
                          "leagueCountry":json.response[0].league.country,
                          "countryFlag":json.response[0].league.flag,
                          "clubsInfo":clubsInfo};

        createTableHeader(leagueInfo);
        createTable(leagueInfo.clubsInfo);
    });
}

//add season as dropdown
function createTableHeader(leagueInfo){
    var tableHeader = d3.select("#leagueTableHeader");
    var headerRow = tableHeader.append("div").attr("class","row p-0 m-0")
    headerRow.append("div")
         .attr("class","col-md-1 p-0")
          .append("img")
           .attr("src",leagueInfo.leagueLogo)
           .attr("class","p-1 m-0")
           .attr("height","75px")
           .attr("width","75px");

    var secondColumn = headerRow.append("div").attr("class","col-md-2 ps-1");
    secondColumn.append("p").attr("class","mt-1").html(leagueInfo.leagueName);
    var secondColumnDiv = secondColumn.append("div");
    secondColumnDiv.append("img")
        .style("float","left")
        .attr("src",leagueInfo.countryFlag)
        .attr("class","rounded-circle mb-2")
        .attr("width","25px")
        .attr("height","25px");
    secondColumnDiv.append("p")
        .attr("class","ps-2")
        .style("float","left")
        .html(leagueInfo.leagueCountry);

    headerRow.append("div").attr("class","col-md-10");
}


function createTable(clubsInfo){
    var tableHeaderData = [{"name":"#","width":"20"},
                           {"name":" ","width":"30"},
                           {"name":"Team","width":"200"},
                           {"name":"P","width":"30"},
                           {"name":"W","width":"30"},
                           {"name":"D","width":"30"},
                           {"name":"L","width":"30"},
                           {"name":"Goals","width":"50"},
                           {"name":"Pts","width":"30"}];

    var leagueTable = d3.select("#leagueTable");
    leagueTable.append("thead")
        .append("tr").selectAll("th")
            .data(tableHeaderData)    
            .enter()
             .append("th")
             .attr("scope","col")
             .attr("width",function(d){return d.width + "px"})
             .html(function(d){return d.name;});

    var rows = leagueTable.append("tbody").selectAll("tr")
        .data(clubsInfo)
        .enter()
         .append("tr");
    
    for(let i=0;i<rows._groups[0].length;i++){
        d3.select(rows._groups[0][i]).append("th")
            .attr("scope","col")
            .attr("class","p-1")
            .html(i+1);
        
        for(const [key,value] of Object.entries(clubsInfo[i])){
            if(key == "clubLogo"){
                d3.select(rows._groups[0][i]).append("td")
                    .attr("class","p-0 m-0")
                    .append("img")
                     .attr("src",value)
                     .attr("width","25px")
                     .attr("height","25px")
                     .attr("class","mt-1 mb-1");
            }else{
                d3.select(rows._groups[0][i]).append("td")
                    .attr("class","p-1")
                    .html(value);
            }
        }
    }

}