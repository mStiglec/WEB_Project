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
    <script src="../js/fetchAndStoreApis.js"></script>
    <title>Document</title>
</head>

<body onload="fetchWantedApi()">
    <div class="container vh-100 p-0" style="background-color: #f4f5f7">
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
</body>

</html>

