<?php

// automatically will throw to login if user is not in database
function checkIfUserIsLoggedIn($conn){

    if(isset($_SESSION['userId'])){
        
        $id = $_SESSION['userId'];
        $query = "SELECT * FROM users WHERE userId = '$id' LIMIT 1";

        $result = mysqli_query($conn,$query);
        if($result && mysqli_num_rows($result) > 0){
            $userData = mysqli_fetch_assoc($result);
            return $userData;
        }
    }

    header("Location: login.php");
    die;
}

function getUserInformation($userId,$conn){
    $query =  "SELECT * FROM users WHERE userId = '$userId' LIMIT 1";
    
    $result = mysqli_query($conn,$query);
    if($result && mysqli_num_rows($result) > 0){
        $userInfo = mysqli_fetch_assoc($result);
        return $userInfo;
    }

    echo "could not catch user info";
    die;
}

function checkUserInput($userInfo){
    if($userInfo['phone'] == NULL){
        $userInfo['phone'] = "Not set";
    }
    if($userInfo['town'] == NULL){
        $userInfo['town'] = "";
    }else{
        $userInfo['town'] = $userInfo['town'] . ',';
    }
    if($userInfo['sex'] == NULL){
        $userInfo['sex'] = "Not set";
    }
    if($userInfo['favouriteLeague'] == NULL){
        $userInfo['favouriteLeague'] = "Not set";
    }
    if($userInfo['favouriteClub'] == NULL){
        $userInfo['favouriteClub'] = "Not set";
    }
    if($userInfo['favouriteClub'] == NULL){
        $userInfo['favouriteClub'] = "Not set";
    }
    if($userInfo['favouritePlayer'] == NULL){
        $userInfo['favouritePlayer'] = "Not set";
    }
    return $userInfo;
}

?>