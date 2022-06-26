<?php
session_start();

    include("connection.php");
    include("functions.php");
    	
    if($_SERVER['REQUEST_METHOD'] == "POST"){

        //something was posted
		$userName = $_POST['userName'];
        $country = $_POST['country'];
        $age = $_POST['age'];
        $email = $_POST['email'];
		$password = $_POST['password'];
    
        if(!empty($userName) && !empty($password) && !is_numeric($userName) && !empty($email))
		{
			//save to database
			$query = "INSERT INTO users (userName,userEmail,userPassword,country,age) VALUES ('$userName','$email','$password','$country','$age')";
			$result = mysqli_query($conn, $query);
            if(!$result){
                die("Failed to register user");
            }

			header("Location: login.php");
			die;
		}else
		{
			echo "Please enter some valid information!";
		}
    }
?>


<!DOCTYPE html>
<html lang="en" style="height:100%; margin:0px">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap-5.2.0-beta1-dist/bootstrap-5.2.0-beta1-dist/css/bootstrap.css">
    <title>Register</title>
</head>

<!-- ADD COUNTRY AND AGE TO FORM -->

<body style="height:100%; margin:0px">

    <div class="row" style="height:100%;margin:0px">
    <div class="col-md-5 text-center" style="background-color:rgba(38,164,59)">
            <div class="row" height="40%">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div>
                        <img src="../svg/soccer-ball.svg" class="mt-4" width="200px" height="200px" alt="fire ball">
                    </div>
                </div>
            </div>
            <div class="row" height="30%">
                <div class="row d-flex justify-content-center align-items-center h-100 mt-5 p-5">
                    <h2 class="fw-bold" style="color:white">Welcome to Football API</h2>
                    <p class="text-white mb-5 h5">Registration is free</p>
                </div>
            </div>
            <div class="row" height="30%"></div>
        </div>
        <div class="col-md-7" style="background-color:rgba(255,255,255)">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-light shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <div class="mb-md-5 mt-md-4">

                                <h2 class="fw-bold mb-2 text-uppercase">REGISTER</h2>
                                <p class="text-grey-50 mb-5">Please enter your information</p>
                                
                                <form method="POST">
                                    <input id="userName" type="text" name="userName" class="form-control form-control-lg mb-4" placeholder="Username" />
                                    
                                    <input id="country" type="text" name="country" class="form-control form-control-lg mb-4" placeholder="Country" />
                                    
                                    <input id="age" type="number" name="age" min="10" class="form-control form-control-lg mb-4" placeholder="Age" />

                                    <input id="email" type="email" name="email" class="form-control form-control-lg mb-4" placeholder="Email" />

                                    <input id="text" type="password" name="password" class="form-control form-control-lg mb-4" placeholder="Password"/>

                                    <input id="button" type="submit" value="Register" class="btn btn-primary btn-lg px-5 mb-4">
                                </form>

                                <p class="medium mb-5 pb-2">Already have account?<a class="p-3" href="login.php">Log in</a></p>

                            <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>


</html>