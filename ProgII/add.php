<?php
session_start();
if(array_key_exists($_POST['id'], $_SESSION['cart'])){ // ja existe no carrinho
	$_SESSION['cart'][$_POST['id']]['quantity'] += $_POST['quantity'];
}
else{ // nao existe; insere
	$_SESSION['cart'][$_POST['id']] = array("namep" => $_POST['namep'],
												"quantity" => $_POST['quantity'],
												"sum" => $_POST['sum']);
}
header("Location: cart.php");											
?>