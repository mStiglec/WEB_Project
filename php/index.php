<?php
session_start();

    include("connection.php");
    include("functions.php");

    $user_data = checkIfUserIsLoggedIn($conn);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap-5.2.0-beta1-dist/bootstrap-5.2.0-beta1-dist/css/bootstrap.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/jquery-3.6.0.js"></script>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <!--<script src="https://cdn.jsdelivr.net/npm/chart.js@3.8.0/dist/chart.min.js"></script>-->
    <script type="text/javascript" src="../js/addCountriesToNavbar.js"></script>
    <script type="text/javascript" src="../js/addLeaguesToNavbar.js"></script>
    <script type="text/javascript" src="../js/createClubInfo.js" defer></script>
    <script type="text/javascript" src="../js/createLeagueTable.js" defer></script>
    <script type="text/javascript" src="../js/createPlayerStatistics.js"></script>

    <title>Document</title>
</head>

<script>
    window.onload = function(){
        populateSidebar();
        showTableByLeagueId(39); // 39 from user preferences (php)
        //createClubInfo(39,50);
    }
</script>

<body>
    <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <nav class="navbar navbar-expand-lg" style="background-color:rgba(38,164,59)">
                <div class="container-fluid">  
                    <a class="navbar-brand" href="#">
                        <img  class="me-2" src="../svg/soccer-ball.svg" alt="Soccer ball" height="30px" loading="lazy">
                        <small class="text-white fw-bold">Football API</small>
                    </a>

                    <div class="dropdown">
                    <small class="fw-bold h5"><?php echo $user_data['userName']; ?> </small>
                        <button id="dropdownUserProfileSvg" data-bs-toggle="dropdown" class="btn btn-default dropdown-toggle"  type="button">
                            <img src="../svg/user_profile.svg" height="25px" alt="User profile">
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUserProfileSvg">
                            <li><a class="dropdown-item" href="user_profile.php">User Profile</a></li>
                            <li><a class="dropdown-item" href="logout.php">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div class="col-md-1"></div>
    </div>

    <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <!--NAVBAR-->
            <div class="sidebar-fixed p-3 h-100" style="width: 17%;float:left;background-color:#21201F">
                <ul class="list-unstyled ps-0">
                    <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed text-white" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#country-collapse" 
                                aria-expanded="true">Countries
                        </button>
                        <div class="collapse text-white mt-2" id="country-collapse">
                            <input type="text" id="countryNavBarSearch"
                                               name="countryNavBarSearch"
                                               placeholder="Search for country"
                                               class="rounded mt-1 mb-2"
                                               oninput="updateCountriesNavbar(this.value);"
                                               type="text">
                            <ul id="countriesNav" class="btn-toggle-nav list-unstyled fw-normal pb-1 ms-2 small">

                            </ul>
                        </div>
                    </li>

                    <li class="mb-1 mt-4" style="clear:both">
                        <button class="btn btn-toggle align-items-center rounded collapsed text-white" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#league-collapse" 
                                aria-expanded="false">Leagues
                        </button>
                        <div class="collapse text-white mt-2" id="league-collapse">
                            <input type="text" id="leagueNavBarSearch"
                                               name="leagueNavBarSearch"
                                               placeholder="Search for league"
                                               class="rounded mt-1 mb-2"
                                               oninput="updateLeaguesNavbar(this.value);"
                                               type="text">
                            <ul id="leaguesNav" class="btn-toggle-nav list-unstyled fw-normal pb-1 ms-2 small">

                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- LEAGUE TABLE -->
            <div style="width:58%;float:left" class="p-1">
                <div id="leagueTableHeader"></div>
                <div class="panel panel-default">
                    <table id="leagueTable" class="table table-hover table-striped table-dark"></table>
                </div>
                <div style="background-color:#21201F;color:white" class="rounded-3">
                    <div id="playerLeagues" class="row text-center m-0 p-0 rounded-top border-bottom" style="background-color:#21201F"></div>
                    <div class="row m-0">
                        <div class="col-md-2" style="position:relative">
                            <img id="playerImage" class="rounded-circle pt-2 ps-2 mt-2 ms-4" height="120px" width="120px">
                            <img id="playerClub" class="rounded-circle p-2 m-0" 
                                                    style="position:absolute;margin-left:-25px;left:15%;top:50%" 
                                                    height="60px" 
                                                    width="60px">
                        </div>
                        <div class="col-md-10">
                            <div class="row">
                                <div class="col-md-3 text-center"><p id="playerName" class="h5 mt-3 mb-0"></p><p class="pb-3 ms-2">Name</p></div>
                                <div class="col-md-3 text-center"><p id="playerBirth" class="h5 mt-3 mb-0"></p><p class="pb-3">Age</p></div>
                                <div class="col-md-3 text-center"><p id="playerHeight" class="h5 mt-3 mb-0"></p><p class="pb-3 ms-1">Height</p></div>
                                <div class="col-md-3 text-center"><p id="playerWeight" class="h5 mt-3 mb-0"></p><p class="pb-3 ms-1">Weight</p></div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 text-center"><p id="playerNationality" class="h5 mt-1 mb-0">Netherlands</p><p class="ms-2">Nationality</p></div>
                                <div class="col-md-3 text-center"><p id="playerApps" class="h5 mt-1 mb-0">19(512)</p><p class="ms-2">Appereances(minutes)</p></div>
                                <div class="col-md-3 text-center"><p id="playerPosition" class="h5 mt-1 mb-0">Midfielder</p><p class="ms-2">Position</p></div>
                                <div class="col-md-3 text-center"><p id="playerRating" class="h5 mt-1 mb-0">6.16667</p><p class="ms-2">Rating</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <div class="row">
                                <div class="col-md-4 text-center"><p id="playerShots" class="h5 mt-4 ms-5 mb-0"></p><p class="pb-3 ms-5">Shots (on)</p></div>
                                <div class="col-md-4 text-center"><p id="playerGoals" class="h5 mt-4 ms-5 mb-0"></p><p class="pb-3 ms-5">Goals (assists)</p></div>
                                <div class="col-md-4 text-center"><p id="playerPasses" class="h5 mt-4 ms-5 mb-0"></p><p class="pb-3 ms-5">Passes</p></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 text-center"><p id="playerDuels" class="h5 mt-3 ms-5 mb-0"></p><p class="pb-3 ms-5">Duels (won)</p></div>
                                <div class="col-md-4 text-center"><p id="playerCards" class="h5 mt-3 ms-5 mb-0"></p><p class="pb-3 ms-5">Yellow (red)</p></div>
                                <div class="col-md-4 text-center"><p id="playerFoules" class="h5 mt-3 ms-5 mb-0"></p><p class="pb-3 ms-5">Foules</p></div>
                            </div>
                        </div>
                        <div id="footballField" class="col-md-5 text-center">
                            <img src="../svg/football_field.svg" height="250px" width="250px">
                        </div>
                    </div>
                </div>
            </div>

            <!-- CLUB INFO -->
            <div id="clubInfoHeader" class="rounded-2 m-1" style="width:24%;float:left;background-color:#21201F;color:white"></div>
            
            <div id="clubForm">
                <svg style="float:left;width:25%;height:40px;background-color:#21201F" class="rounded-2"></svg>
            </div>

            <div id="clubGames">
                <div style="float:left" class="ms-5 mt-2">
                    <button class="btn btn-primary ms-5" onclick="updateGamesBarChart('total')">Total</button>
                    <button class="btn btn-primary" onclick="updateGamesBarChart('home')">Home</button>
                    <button class="btn btn-primary" onclick="updateGamesBarChart('away')">Away</button>
                </div>
                <svg class="mt-1 mb-1 rounded-2" style="float:left;width:25%;height:140px;background:#21201F;color:white"></svg>
            </div>

            <div id="playerClubList" class="rounded-2" style="background-color:#21201F;float:left;width:25%;color:white">
                <p class="text-center p-1 m-1 border-bottom h5">Players</p>
            </div>
            


        <div class="col-md-1"></div>
    </div>
</body>

</html>

