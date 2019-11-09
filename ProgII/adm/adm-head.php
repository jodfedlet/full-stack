
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>::Michou Store - Adm</title>
	
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="css/style.css">
</head>

<body>
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle pull-left">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Administrator</a>
			</div>
			<form class="navbar-form navbar-right search" method="post" action="<?php echo $_SERVER['PHP_SELF']?>" method="post" enctype="multipart/form-data">
                  <div class="input-group ">
                  <input type="text" class="form-control " placeholder="Search">
                  <div class="input-group-btn">
                    <button class="btn btn-success" type="submit" name="searc">
                    <i class="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#">Log Out</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="main">
		<div class="menu">
			<ul>
				<li class="visible-xs"><a href="#">Log Out</a></li>
				<li class="active"><a href="#">Panel</a></li>
				<li><a href="index.php">Add prodcut</a></li>
				<li><a href="product.php">View Product</a></li>
				<li><a href="clients.php">Clients</a></li>
				<li><a href="#">Order</a></li>
				<li><a href="../index.php">Go to site</a></li>
			</ul>
		</div>
		<div class="content">
			<div class="container-fluid">