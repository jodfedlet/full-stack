<?php
include "Includes/header.php";
include "Includes/functions.php"
?>
	<!-- area central com 3 colunas -->
	<div class="container">
		
		<section class="col-2">	
			<?php
			if (isset($_POST['id'])){

				$id = $_POST['id'];
				$nome = $_POST['name'];
				$preco = $_POST['price'];
				$quantidade = $_POST['quantity'];
				$meucarrinho [] = array ('id' => $id, 'name' => $nome, 'price' => $preco, 'quantity' => $quantidade);
				}

				$_SESSION['cart'] = $meucarrinho;
			if(!isset($_SESSION['name'])){
				echo "<h2>Please, you have to <a href='login.php'>log in.</a>";
			}
			else {
				$id = $_POST['id'];
				$quantity = $_POST['quantity'];	
				?>

				<div class="cartTable">	
				<div>
				<table class="table table-striped">
							    <thead>
							      <tr style="font-size: 17px;font-family: 'Shadows Into Light', cursive;text-transform: uppercase;" class="text-center">
							      	<th>ID</th>
							      	<th>Product Name</th>
							        <th >Price</th>
							        <th >Quantity</th>
							        <th >Total</th>
							        <th >Action</th>
							      </tr>
							    </thead><br>
							    <?php
								include "Includes/connect.php";
								
								 $sql = "select p.idp, p.namep, p.price, ct.quantity, p.img,p.disc from prod_cart as c left join product as p  on c.idp = p.idp left join cart as ct on c.idc = ct.idc";
								/*if(isset($_GET['campo']) & isset($_GET['ordem']))
									$sql .= " order by {$_GET['campo']} {$_GET['ordem']}";
								else
									$sql .= " order by nome asc";*/	
									$resultado = mysqli_query($connect, $sql);
								/*if (isset($_GET['searc'])) {
									$sql = "select p.idp, p.namep, p.price, p.marcap, p.img,p.quant,p.disc, c.cName from product as p left join categorie as c on p.idCtg = c.idCtg where namep like '%".$_POST['searc']."%'";
									$resultado = mysqli_query($connect, $sql);
									
								}*/
												
								if( mysqli_num_rows($resultado) == 0){
									?>
									<tr>
										<td colspan="4" class='alert alert-danger text-center'>Nenhum produto encontrado.</td>
									</tr>
									<?php	
								}
								else{
									while($prod = mysqli_fetch_array($resultado) ){

											
											
											?>	
										
								<tbody><
							      <tr>
							      		<td ><?=$prod['idp']; ?></td>
										<td ><?=$prod['namep']; ?></td>
										<td ><?=price($prod['price']) ?></td>
									
										<td><?php echo $quantity ?></td>
										<td>$ <?php echo $quantity * $prod['price']?></td>
										<td >
											  <a href="" data-toggle="modal" data-target="#conDelete" class="btn btn-danger">Delete</a>' </td>
									


										<!--Modal delete-->
										<div class="modal fade" tabindex="-1" role="dialog" id="conDelete">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
										        <h4 class="modal-title text-center">Confirmation</h4>
										      </div>
										      <div class="modal-body">
										        <p class="text-center">Are you sure you want to delete this product?&hellip;</p>
										      </div>
										      <div class="modal-footer">
										        <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
										        <a href="remove.php?id=<?=$prod['idp'] ?>" class="btn btn-success">Yes</a>
										      </div>
										    </div><!-- /.modal-content -->
										  </div><!-- /.modal-dialog -->
										</div><!-- /.modal -->	
										</tr>
										
				
								</tbody>
								<?php

											
									} 
								}// while
								?>
								<tr class="pull-right">
											<td>
												<div>
												
												</div>

											</td>
										</tr>

                                
                                         
							</table></div></div>


					<?php
			}
			?>
			<?php
			
			if(isset($_SESSION['name'])){
			?>
			<button class="btn btn-success pull-right" type="submit" name="submit">Buy Now</button>
					<?php
			}
			?>								
		</section>
	
	            


