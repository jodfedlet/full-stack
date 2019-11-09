
<?php
	include 'adm-head.php';
 ?>

				 <div class="row">
					<div class="col-sm-12 push-m3" >
						  <h2 style="font-family:'Kaushan Script', cursive; font-size:30px; text-transform: uppercase;text-decoration: underline;font-weight: bold;" class="text-center">Clients</h2>
						 
						  <table class="table table-striped">
							    <thead>
							      <tr style="font-size: 17px;font-family: 'Shadows Into Light', cursive;text-transform: uppercase;" class="text-center">
							      	<th >Name</th>
							        <th >Email</th>
							        <th >Gender</th>
							        <th>Neighborhood</th>
							        <th >Street</th>
							        <th >cep</th>
							        <th >number add.</th>
							      </tr>
							    </thead><br>
							    <?php
								include "../Includes/connect.php";
								include "../Includes/functions.php";
								 $sql = "select * from user ";
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
										<td colspan="4" class='alert alert-danger text-center'>Nenhum cliente encontrado.</td>
									</tr>
									<?php	
								}
								else{
									while($prod = mysqli_fetch_array($resultado)){
											?>				
								<tbody><
							      <tr>
							      		
										<td ><?=$prod['name']; ?></td>
										<td ><?=$prod['email']; ?></td>
										<td ><?=$prod['gender'];?></td>
										<td ><?=$prod['neighborhood']; ?></td>
										<td ><?=$prod['street']; ?></td>
										<td ><?=$prod['CEP'];?></td>
										<td ><?=$prod['addNum'];?></td>
										
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