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
    <script type="text/javascript" src="../json/allCountries.json"></script>
    <script type="text/javascript" src="../js/addCountriesToNavbar.js"></script>
    <script type="text/javascript" src="../js/addLeaguesToNavbar.js"></script>
    <script type="text/javascript" src="../js/createLeagueTable.js"></script>
    <title>Document</title>
</head>

<script>
    /*const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://api-football-v1.p.rapidapi.com/v3/standings?season=2021&league=39",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "",
		"X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
	}
};
    
    $.ajax(settings).done(function (response) {
        console.log(JSON.stringify(response));
    });*/
    window.onload = function(){
        populateSidebar();
        createLeagueTable();
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

                    <!--<div class="navbar-collapse justify-content-center">
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li class="nav-item me-4 pe-4">
                                <button class="btn btn-primary" href="#">Leagues</button>
                            </li>
                            <li class="nav-item me-4 pe-4 ms-4 ps-4">
                                <button class="btn btn-primary" href="#">Players</button>
                            </li>
                            <li class="nav-item ms-4 ps-4">
                                <button class="btn btn-primary" href="#">Clubs</button>
                            </li>
                        </ul>
                    </div>-->

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
            <div class="sidebar-fixed p-3 bg-dark vh-100" style="width: 17%;float:left">
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
            <div id="leagueTableHeader" style="width:55%;float:left"></div>
            
            <table id="leagueTable" class="table table-hover table-striped table-dark" style="width:55%">
                <!--<thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Team</th>
                        <th scope="col">P</th>
                        <th scope="col">W</th>
                        <th scope="col">D</th>
                        <th scope="col">L</th>
                        <th scope="col">Goals</th>
                        <th scope="col">Pts</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Manchester city</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Arsenal</td>
                            <td>90</td>
                        </tr>
                            <th scope="row">3</th>
                            <td>Liverpool</td>
                            <td>80</td>
                        </tr>
                </tbody>-->
            </table>

        </div>
        <div class="col-md-1"></div>
    </div>
</body>

</html>

