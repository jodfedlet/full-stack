<?php
include "../Includes/connect.php";
?>

<div class="container">
	<main>
		<h2>Exclusão de Produto</h2>
		<?php
	
			if(is_numeric($_GET['id'])){
				include "../Includes/connect.php";
				echo$sql = "delete from product where idp = {$_GET['id']}";
				$resultado = mysqli_query($connect, $sql);
				$dados = mysqli_fetch_array($resultado);
				var_dump($dados);
				if($resultado){
					echo "<p>Produto excluído com sucesso</p>";
				}
				else{
					echo "<p>O produto não pode ser excluído</p>";
					echo mysqli_error($connect);
				}
			}
			else{
				echo "<p>O código do produto informado é inválido</p>";
			}
	
		
?>
	</main>	
	
</div>
