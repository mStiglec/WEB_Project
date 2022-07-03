function createPlayerStatistics(playerData){
    setPlayerStatistics(playerData,0);
    var playerLeagues = d3.select("#playerLeagues");
    for(let i=0;i<playerData.statistics.length;i++){
        playerLeagues.append("button")
                .style("float","left")
                .attr("class","btn btn-primary m-1 p-0")
                .style("width",860/playerData.statistics.length + "px")
                .html(playerData.statistics[i].league.name)
                .on("click",function(){
                    setPlayerStatistics(playerData,i);
                })
    }
}

function setPlayerStatistics(playerData,index){
    console.log(playerData.statistics[index].team.logo);
    d3.select("#playerImage").attr("src",playerData.player.photo);
    d3.select("#playerClub").attr("src",playerData.statistics[index].team.logo);

    d3.select("#playerName").html(playerData.player.name);
    d3.select("#playerBirth").html(playerData.player.age);
    d3.select("#playerHeight").html(playerData.player.height);
    d3.select("#playerWeight").html(playerData.player.weight);
    d3.select("#playerNationality").html(playerData.player.nationality);

    d3.select("#playerApps").html(playerData.statistics[index].games.appearences);
    d3.select("#playerPosition").html(playerData.statistics[index].games.position);
    d3.select("#playerRating").html(playerData.statistics[index].games.rating);

    d3.select("#playerShots").html(playerData.statistics[index].shots.total + " (" 
                                        + playerData.statistics[index].shots.on + ")");

    d3.select("#playerGoals").html(playerData.statistics[index].goals.total + 
                                    " (" + playerData.statistics[index].goals.assists + ")");

    d3.select("#playerPasses").html(playerData.statistics[index].passes.total);

    d3.select("#playerDuels").html(playerData.statistics[index].duels.total 
                                    + " (" + playerData.statistics[index].duels.won + ")");

    d3.select("#playerCards").html(playerData.statistics[index].cards.yellow + " (" + 
                                        playerData.statistics[index].cards.red + ")");

    d3.select("#playerFoules").html(playerData.statistics[index].fouls.drawn);
}