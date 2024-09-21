import { useState } from "react";
import productsJson from "../data.json";
import Cart from "./Cart";
import Products from "./Products";
import Button from "./Button";

const data = productsJson.map((product, index) => ({
	...product,
	id: index + 1,
	inCart: false,
	quantity: 0,
}));

export default function App() {
	const [products, setProducts] = useState([...data]);
	const [orderConfirmed, setOrderConfirmed] = useState(false);

	function handleRemoveItem(id) {
		setProducts((curCart) =>
			curCart.map((item) =>
				item.id === id ? { ...item, inCart: false, quantity: 0 } : { ...item }
			)
		);
	}

	function handleAddToCart(id) {
		setProducts((curCart) =>
			curCart.map((item) => {
				return item.id === id
					? { ...item, inCart: true, quantity: 1 }
					: { ...item };
			})
		);
	}

	function handleIncreaseProductQuantity(id) {
		setProducts((curCart) =>
			curCart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : { ...item }
			)
		);
	}

	function handleDecreaseProductQuantity(id) {
		setProducts((curCart) =>
			curCart.map((item) =>
				item.id === id
					? { ...item, quantity: item.quantity - 1, inCart: item.quantity > 1 }
					: { ...item }
			)
		);
	}

	function handleToggleOrderConfirm() {
		setOrderConfirmed((curState) => {
			if (curState === true) setProducts([...data]);
			return !curState;
		});
	}

	return (
		<div
			className="app"
			style={
				orderConfirmed
					? {
							height: "calc(100vh - 134px)",
							flexWrap: "no-wrap",
							overflowY: "hidden",
					  }
					: {}
			}
		>
			<Products
				products={products}
				onAddToCart={handleAddToCart}
				onIncreaseQuantity={handleIncreaseProductQuantity}
				onDecreaseQuantity={handleDecreaseProductQuantity}
			/>
			<Cart
				products={products}
				onRemoveItem={handleRemoveItem}
				onOrderConfirm={handleToggleOrderConfirm}
			/>
			{orderConfirmed && (
				<OrderConfirmation
					products={products}
					onOrderConfirm={handleToggleOrderConfirm}
				/>
			)}
		</div>
	);
}

function OrderConfirmation({ products, onOrderConfirm }) {
	return (
		<div className="order-confirmation-overlay">
			<div className="order-confirmation">
				<img
					width="30"
					height="30"
					src="assets/images/icon-order-confirmed.svg"
					alt="Order Confirmed"
				/>
				<div>
					<h2>Order Confirmed</h2>
					<p className="tagline">We hope you enjoy your food!</p>
					<ul className="order-list">
						{products
							.filter((item) => item.inCart)
							.map((item) => (
								<Order product={item} key={item.id} />
							))}
					</ul>
				</div>

				<Button onClick={onOrderConfirm}>Start New Order</Button>
			</div>
		</div>
	);
}

function Order({ product }) {
	return (
		<li className="order">
			<div className="order-info-image">
				<img src={product.image.thumbnail} alt={product.name} />
				<div className="order-info">
					<h5>{product.name}</h5>
					<p>
						<span>{product.quantity}x</span>{" "}
						<span>@ ${product.price.toFixed(2)}</span>{" "}
					</p>
				</div>
			</div>
			<p className="price">${(product.price * product.quantity).toFixed(2)}</p>
		</li>
	);
}
