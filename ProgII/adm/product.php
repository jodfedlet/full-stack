
<?php
	include 'adm-head.php';
 ?>

				 <div class="row">
					<div class="col-sm-12 push-m3" >
						  <h2 style="font-family:'Kaushan Script', cursive; font-size:30px; text-transform: uppercase;text-decoration: underline;font-weight: bold;" class="text-center">All products</h2>
						 
						  <table class="table table-striped">
							    <thead>
							      <tr style="font-size: 17px;font-family: 'Shadows Into Light', cursive;text-transform: uppercase;" class="text-center">
							      	<th >Pictures</th>
							        <th >Name</th>
							        <th >Categorie</th>
							        <th>Brand</th>
							        <th >Price</th>
							        <th >Quantity</th>
							        <th >Action</th>
							      </tr>
							    </thead><br>
							    <?php
								include "../Includes/connect.php";
								include "../Includes/functions.php";
								
								 $sql = "select p.idp, p.namep, p.price, p.marcap, p.img,p.quant,p.disc, c.cName from product as p left join categorie as c on p.idCtg = c.idCtg";
								/*if(isset($_GET['campo']) & isset($_GET['ordem']))
									$sql .= " order by {$_GET['campo']} {$_GET['ordem']}";
								else
									$sql .= " order by nome asc";*/	
									$resultado = mysqli_query($connect, $sql);
								if (isset($_GET['searc'])) {
									$sql = "select p.idp, p.namep, p.price, p.marcap, p.img,p.quant,p.disc, c.cName from product as p left join categorie as c on p.idCtg = c.idCtg where namep like '%".$_POST['searc']."%'";
									$resultado = mysqli_query($connect, $sql);
									
								}
												
								if( mysqli_num_rows($resultado) == 0){
									?>
									<tr>
										<td colspan="4" class='alert alert-danger text-center'>Nenhum produto encontrado.</td>
									</tr>
									<?php	
								}
								else{
									while($prod = mysqli_fetch_array($resultado)){
											?>				
								<tbody><
							      <tr>
							      		<td ><img src="<?=showImg($prod['img']);?>" width="80" height="80"></td>
										<td ><?=$prod['namep']; ?></td>
										<td ><?=$prod['cName']; ?></td>
										<td ><?=$prod['marcap'];?></td>
										<td ><?=price($prod['price'], $prod['disc']) ?></td>
										<td ><?=$prod['quant'];?></td>
										<td ><a href="edit.php?id=<?=$prod['idp'] ?>" class="btn btn-default">Edit</a>
											  <a href="" data-toggle="modal" data-target="#confDelete" class="btn btn-danger">Delete</a>' </td>
									


										<!--Modal delete-->
										<div class="modal fade" tabindex="-1" role="dialog" id="confDelete">
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
							</table>	

					</div>	
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="js/jquery-3.1.1.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</body>

</html>