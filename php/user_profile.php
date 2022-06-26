<?php 
session_start();

    include("connection.php");
    include("functions.php");

    $userId = $_SESSION['userId'];
    $userInfo = getUserInformation($userId,$conn);
    $userInfo = checkUserInput($userInfo);

    if($userInfo['favouriteClub'] == "Not set"){
        $clubImg = " ";
    }else{
        $clubImg = "https://media.api-sports.io/football/teams/33.png";
    }

    if($userInfo['favouriteLeague'] == "Not set"){
        $leagueImg = " ";
    }else{
        $leagueImg = "https://media.api-sports.io/football/leagues/39.png";
    }

    if($userInfo['favouritePlayer'] == "Not set"){
        $playerImg = "../svg/user_profile.svg";
    }else{
        $playerImg = "../svg/user_profile.svg";
    }

    if($userInfo['sex'] == "M"){
        $userImg = "../svg/male.svg";
    }else if($userInfo['sex'] == "F"){
        $userImg = "../svg/female.svg";
    }else{
        $userImg = "../svg/user_profile.svg";
    }

    if($_SERVER['REQUEST_METHOD'] == "POST"){

        //something was posted
        if(($sex = $_POST['sex']) != ""){
            $query = "UPDATE users SET sex='$sex' WHERE userId = '$userId'";
            mysqli_query($conn,$query);
        }
        if(($phone = $_POST['phone']) != ""){
            $query = "UPDATE users SET phone='$phone' WHERE userId = '$userId'";
            mysqli_query($conn,$query);
        }
        if(($town = $_POST['town']) != ""){
            $query = "UPDATE users SET town='$town' WHERE userId = '$userId'";
            mysqli_query($conn,$query);
        }
        if(($favClub = $_POST['favclub']) != ""){
            $query = "UPDATE users SET favouriteClub='$favClub' WHERE userId = '$userId'";
            mysqli_query($conn,$query);
        }
        if(($favLeague = $_POST['favleague']) != ""){
            $query = "UPDATE users SET favouriteLeague='$favLeague' WHERE userId = '$userId'";
            mysqli_query($conn,$query);
        }
        if(($favPlayer = $_POST['favplayer']) != ""){
            $query = "UPDATE users SET favouritePlayer='$favPlayer' WHERE userId = '$userId'";
            mysqli_query($conn,$query);
        }

        header("Refresh:0");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../bootstrap-5.2.0-beta1-dist/bootstrap-5.2.0-beta1-dist/css/bootstrap.css">
    <title>Document</title>
</head>

<script>
    function initializeModal(){
        var modal = document.getElementById("userInfoModal");
        modal.addEventListener('shown.bs.modal',function(){
            console.log(modal);
        });
    }

</script>

<body onload="initializeModal()">

<div class="container vh-100 p-0">
    <nav class="navbar" style="background-color:#03fca9">
        <div class="container-fluid">  
            <a class="navbar-brand" href="#">
                <img  class="me-2" src="../svg/soccer-ball.svg" alt="Soccer ball" height="30px" loading="lazy">
                <small class="text-dark fw-bold">Football API</small>
            </a>

            <div class="dropdown">
                <button id="dropdownUserProfileSvg" data-bs-toggle="dropdown" class="btn btn-default dropdown-toggle"  type="button">
                    <img src="../svg/user_profile.svg" height="25px" alt="User profile">
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUserProfileSvg">
                    <li><a class="dropdown-item" href="index.php">Main Page</a></li>
                    <li><a class="dropdown-item" href="logout.php">Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="row h-100 justify-content-center mt-5">
        <div class="col col-lg-12 mb-4 mb-lg-0">
            <div class="card mb-3" style="border-radius: .5rem;">
                <div class="row g-0">
                    <div class="col-md-4 text-center text-grey ps-1" style="background-color:#03fca9">
                        <img src=<?php echo $userImg?> alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
                        <h5><?php echo $userInfo['userName']; ?></h5>
                        <p><?php echo $userInfo['town'] . $userInfo['country']?></p>
                        <img src="../svg/edit.svg" alt="edit" 
                                                   class="img-fluid my-5" 
                                                   width="30px" 
                                                   height="30px" 
                                                   style="cursor:pointer"
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#userInfoModal">
                    </div>
                    <div class="col-md-8">

                        <div class="card-body p-4">

                            <h5>User Information</h5>
                            <hr class="mt-0 mb-4">

                            <div class="row pt-1 text-center">
                                <div class="col-4 mb-3">
                                    <h6>Email</h6>
                                    <p class="text-muted m-0"><?php echo $userInfo['userEmail'];?></p>
                                </div>
                                <div class="col-4 mb-3">
                                    <h6>Phone</h6>
                                    <p class="text-muted m-0"><?php echo $userInfo['phone'];?></p>
                                </div>
                                <div class="col-4 mb-3">
                                    <h6>Sex</h6>
                                    <p class="text-muted m-0"><?php echo $userInfo['sex'];?></p>
                                </div>
                            </div>

                            <h5>Preferences</h5>
                            <hr class="mt-0 mb-4">

                            <div class="row pt-1 text-center">
                                <div class="col-4 mb-3">
                                    <h6>Favourite Club</h6>
                                    <p class="text-muted"><?php echo $userInfo['favouriteClub'];?></p>
                                    <img src=<?php echo $clubImg;?>>
                                </div>
                                <div class="col-4 mb-3">
                                    <h6>Favourite League</h6>
                                    <p class="text-muted"><?php echo $userInfo['favouriteLeague'];?></p>
                                    <img src=<?php echo $leagueImg;?>>
                                </div>
                                <div class="col-4 mb-3">
                                    <h6>Favourite player</h6>
                                    <p class="text-muted"><?php echo $userInfo['favouritePlayer'];?></p>
                                    <img src=<?php echo $playerImg;?> width="150px" height="150px">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        <div>
    </div>

    <div id="userInfoModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn btn-dark" data-bs-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Enter data you want to change</h4>
                </div>
                <div class="modal-body text-center">
                    <form method="POST">
                        <input id="text" type="text" name="phone" class="form-control form-control-lg mb-4" placeholder="Phone"/>
                        <input id="text" type="text" name="sex" class="form-control form-control-lg mb-4" placeholder="Sex"/>
                        <input id="text" type="text" name="town" class="form-control form-control-lg mb-4" placeholder="Town"/>
                        <input id="text" type="text" name="favclub" class="form-control form-control-lg mb-4" placeholder="Favourite club"/>
                        <input id="text" type="text" name="favleague" class="form-control form-control-lg mb-4" placeholder="Favourite league"/>
                        <input id="text" type="text" name="favplayer" class="form-control form-control-lg mb-4" placeholder="Favourite player"/>
                        <input id="button" type="submit" value="Update" class="btn btn-primary">
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
    
</body>
</html>