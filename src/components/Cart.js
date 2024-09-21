import Button from "./Button";

export default function Cart({ products, onRemoveItem, onOrderConfirm }) {
	const cartItems = products.filter((item) => item.inCart);
	const noItemInCart = cartItems.length;
	return (
		<div className={`cart-tab ${noItemInCart === 0 ? "empty-cart-tab" : ""}`}>
			<h2>Your Cart ({noItemInCart})</h2>
			{noItemInCart === 0 ? (
				<>
					<img src="assets/images/illustration-empty-cart.svg" alt="Empty " />
					<p>Your added items will appear here</p>
				</>
			) : (
				<>
					<ul>
						{cartItems.map((cartProduct) => (
							<CartProduct
								product={cartProduct}
								onRemoveItem={onRemoveItem}
								key={cartProduct.id}
							/>
						))}
					</ul>
					<div className="total-amount">
						<p>Order Total</p>
						<h2>
							$
							{cartItems
								.map((item) => item.quantity * item.price)
								.reduce((a, b) => a + b, 0)
								.toFixed(2)}
						</h2>
					</div>
					<div className="carbon-neutral">
						<img
							src="assets/images/icon-carbon-neutral.svg"
							alt="Carbon Neutral delivery"
						/>
						<p>
							This is a<span> carbon-neutral </span>delivery
						</p>
					</div>
					<Button onClick={onOrderConfirm}>Confirm Order</Button>
				</>
			)}
		</div>
	);
}

function CartProduct({ product, onRemoveItem }) {
	return (
		<li className="cart-product">
			<div>
				<h5>{product.name}</h5>
				<p>
					<span>{product.quantity}x</span>{" "}
					<span>@ ${product.price.toFixed(2)}</span>{" "}
					<span>${(product.price * product.quantity).toFixed(2)}</span>
				</p>
			</div>
			<img
				onClick={() => onRemoveItem(product.id)}
				src="assets/images/icon-remove-item.svg"
				alt={`Remove ${product.name} from cart `}
			/>
		</li>
	);
}
