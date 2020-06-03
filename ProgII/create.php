
<?php
  require_once'Includes/connect.php';
    
	$erros=array();
	
	if(isset($_POST['create'])){
		$name = addslashes($_POST['name']);
		$email = $_POST['email'];
		$pas1 = $_POST['pswd'];
		
   
    $confP2 = $_POST['confP'];

		$gender = isset($_POST['gender']) ? $_POST['gender'] : null;

		$nbhd =$_POST['nbh'];
		$numb = $_POST['numb'];
		$Street = addslashes($_POST['street']);
		$CEP = $_POST['cep'];

		
		

		// Validation
		if (empty($name) || !strstr($name," ")){
			$erros[] = "Enter your complete name";
		}
		if(empty($email) || !(filter_var($_POST["email"], FILTER_VALIDATE_EMAIL))){
           $erros[] = "Enter a valid email";
		}

    if($gender==null){
			$erros[] = "Choose your gender";	
    }

   	if(empty($nbhd)){
  		$erros[] = "Enter your Neighborhood address";  
   	}

   	if(empty($Street)){
   		$erros[] = "Enter your street address ";
   	}

   	if(empty($numb)){
   		$erros[] = "Enter your address number";
   	}

   	if(empty($pas1)){
   		$erros[] = "Enter a password";
   	}
   	else if(strlen($pas1) < 6){
	 $erros[] = "Digits missed";
   	}
  else{
	 if($pas1 != $confP2)
		$erros[] = "Different password";
    }
		if(empty($CEP)){
       		$erros[] = "Enter your CEP address";
       	}
		// insert
		if(count($erros) == 0){


      $sql = "SELECT * FROM user WHERE email = '$email' ";
      if($resultado_id = mysqli_query($connect, $sql)){

        $dados_usuario = mysqli_fetch_array($resultado_id);

        if(isset($dados_usuario['email'])){

            echo "Email already existed";

            header('location:login.php');

        }else{
            $pas = md5($pas1); 
      
            $sql="INSERT INTO user (idusr, name, email,password,gender,addNum,CEP,street,neighborhood) VALUES (NULL,'$name', '$email', '$pas','$gender',$numb,$CEP,'$Street','$nbhd')";
             mysqli_query($connect, $sql);

           /* $sql = "SELECT  distinct LAST_INSERT_ID() INTO @idusr from user";
            mysqli_query($connect, $sql);

            $sql = "INSERT INTO user_Gender (idusr,gender) VALUES (@idusr,'$gender')";
            mysqli_query($connect, $sql);
          
             $sql = "INSERT INTO user_Address (idusr,neighborhood, street,cep,us_numb) VALUES (@idusr,'$nbhd','$Street',$CEP,$numb)";
               mysqli_query($connect, $sql);*/

        }

     
	   }
   }
 }


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Michou Store</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    
    <link rel="stylesheet" href="./css/LogCreatestyle.css">
     <!-- Inclusão do jQuery-->
    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
    <!-- Inclusão do Plugin jQuery Validation-->
     <script src="http://jqueryvalidation.org/files/dist/jquery.validate.js"></script>
    <script type="text/javascript" src="create.js"></script>
    <style type="text/css">
      

    </style>

</head>
<body>
    <div class="Background-body-Create">
    <div id="form-container">
        <div class="panel" id="form-boxCreate">
        	
        	<?php 
		
			if(!(isset($_POST['create'])) || count($erros)!=0){
			?>
            <form action="" method="post" id="createform" enctype="multipart/form-data">
              
              <h3 class="text-center cre"><em> Create my account</em></h3>
              	<?php 
    
                      if(isset($erros) and count($erros) > 0){
                      
                        foreach ($erros as $erro) {
                            echo "<li style='color:red'> $erro </li>";
                        }
                       
                      }
                  ?>
      
              <div class="form-group">
                  <label class="sr-only" for="name">Complete Name:</label>
                  <input type="text" class="form-control" id="name" placeholder="Complete name..." name="name" value="<?=isset($name) ? $name : '';?>">
              </div>

              <div class="form-group">
                  <label  class="sr-only" for="email">Email:</label>
                  <input type="email" class="form-control" id="email" placeholder="Email..." name="email" value="<?=isset($email) ? $email : '';?>">
              </div>

              <div class="form-group">
                  <label class="sr-only" for="psw">Password:</label>
                  <input type="password" class="form-control" id="psw" placeholder="Password..." name="pswd" >
              </div>

              <div class="form-group">
                  <label  class="sr-only" for="Confpas">Confirm Password:</label>
                  <input type="password" class="form-control" id="Confpas" placeholder="Confirm password..." name="confP">
              </div><br>



                <div class="row">
                 <div class="col-sm-6">
                       <div class="form-group"> 
                          <input type="radio" class="custom-control-input" id="male" value="m" name="gender" <?= isset($gender)?($gender=="m"?'checked':''):'';?>>
                          <label class="custom-control-label" for="male"  >Male</label>
                     </div>
                  </div>

                  <div class="col-sm-6 ">
                        
                        <div class="form-group">
                           <input type="radio" class="custom-control-input" id="female" value="f" name="gender"  <?= isset($gender)?($gender=="f"?'checked':''):'';?>>
                          <label class="custom-control-label" for="female" >Female</label>
                        </div>

                  </div>

                 
                </div> <br>

            
            <div>
              <div class="row">
                <div class="col-sm-6 ">
                     <div class="form-group">
                         <label class="sr-only" for="nbh">Neighborhood: </label>
                         <input type="text" class="form-control" id="NHb" placeholder="Neighborhood" name="nbh" value="<?=isset($nbhd) ? $email : '';?>" >
                      </div>

                      <div class="form-group">
                         <label class="sr-only" for="numb">Address number:</label>
                         <input type="number" class="form-control" id="addNumb" min="1" placeholder="Address Number" name="numb" value="<?=isset($numb) ? $numb : '';?>">
                      </div>
                </div>

                <div class="col-sm-6">
                    <div class="form-group">
                         <label class="sr-only" for="nbh">Street: </label>
                         <input type="text" class="form-control mb-2 mr-" id="Street" placeholder="Street" name="street" value="<?=isset($Street) ? $Street : '';?>">
                    </div>

      
                    <div class="form-group">
                         <label class="sr-only" for="nbh">CEP: </label>
                          <input type="number" class="form-control mb-2 mr-" id="CEP" min="1" placeholder="CEP" name="cep" value="<?=isset($CEP) ? $CEP : '';?>">
                     </div>
                </div>
              </div>

            </div><br>

           
          <div class="form-group">
                    <input type="submit" value="Create" id="btn-submit" name="create" class="btn btn-primary form-control">
                </div>
            <div class="row">
                <div class="col-sm-12 text-center">

                      <p id="forgPsw">Already registered?<a href="login.php"><em> LogIn</em></a></p>

                </div>
                 <div class="form-group text-center">
                   <a href="index.php">Home?</a>.
                </div>

               
            </div>
         

        </div>
      </div>
   
    </form>
      
    </div>
    <script type="text/javascript" src="js/Logcreate.js"></script>
    <?php 
		}else{
			echo "<p class='text-center'> Account have been created with successfull. <a href='login.php'>next</a></p>";
		}
	?>
</div>
</body>
</html>