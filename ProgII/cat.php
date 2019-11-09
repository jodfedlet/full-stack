<?php
include "Includes/connect.php";
?>
	<!-- area central com 3 colunas -->
	<div class="container">

	
		<section class="col-2">
			<?php
			include "Includes/functions.php";
			if(!isset($_SESSION['cart'])){
				echo "<h2>Seu carrinho está vazio.";
			}
			else {
				?>
					<h2>Meu carrinho</h2>
					<div class="itemCarrinho">
						<span class="produtoCarrinho"><strong>Produto</strong></span>
						<span class="qtdeCarrinho"><strong>Quantidade</strong></span>
						<span class="precoCarrinho"><strong>Valor</strong></span>
					</div>
				<?php
					$total = 0;
					foreach($_SESSION['cart'] as $id => $item){
						?>
						<div class="itemCarrinho">
							<span class="produtoCarrinho"><?=$item['nome'];?></span>
							<input type="number" min="1" value="<?=$item['quantidade'];?>" style="width: 5em;" onchange="atualizaQuantidade(<?=$id;?>, this.value, <?=$item['valorFinal'];?>)">
							<span class="precoCarrinho" id="price<?=$id;?>"><?=price($item['sum']);?></span>
							<span class="excluirCarrinho"><a href="excluiCarrinho.php?id=<?=$id;?>" title="excluir item">X</a></span>
						</div>
						<?php
						$total += ($item['quantity'] * $item['price']);
					}
					?>
					<div class="itemCarrinho total">
						<span>Total:</span>
						<span class="precoCarrinho"><strong id="precoTotal"><?php echo $total ?></strong></span>
					</div>
					<div class="botoes">
						<a href="index.php"><button>Continuar comprando</button></a>
						<a href="fecharPedido.php"><button>Finalizar pedido</button></a>
					</div>
					<?php
			}
			?>

		</section>

