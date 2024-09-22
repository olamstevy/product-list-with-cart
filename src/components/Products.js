import { useState } from "react";
import Button from "./Button";

export default function Products({
	products,
	onAddToCart,
	onIncreaseQuantity,
	onDecreaseQuantity,
}) {
	return (
		<div className="products-tab">
			<h1>Desserts</h1>
			<ul>
				{products.map((product) => (
					<Product
						product={product}
						key={product.id}
						onAddToCart={onAddToCart}
						onIncreaseQuantity={onIncreaseQuantity}
						onDecreaseQuantity={onDecreaseQuantity}
					/>
				))}
			</ul>
		</div>
	);
}

function Product({
	product,
	onAddToCart,
	onIncreaseQuantity,
	onDecreaseQuantity,
}) {
	const [minusColor, setMinusColor] = useState("#fff");
	const [plusColor, setPlusColor] = useState("#fff");

	return (
		<li>
			<div className="product-image-and-button">
				<img
					style={product.inCart ? { border: "solid 2px var(--Red)" } : {}}
					className="product-image"
					src={
						window.innerWidth > 768
							? product.image.desktop
							: window.innerWidth > 500
							? product.image.tablet
							: product.image.mobile
					}
					alt={`${product.name}`}
				/>
				{product.inCart ? (
					<Button className="quantity-button">
						<QuantitySVG
							width="7"
							height="7"
							viewBox="0 0 10 2"
							onClick={() => onDecreaseQuantity(product.id)}
							setFillColor={setMinusColor}
						>
							<path fill={minusColor} d="M0 .375h10v1.25H0V.375Z" />
						</QuantitySVG>

						<span>{product.quantity}</span>

						<QuantitySVG
							width="7"
							height="7"
							viewBox="0 0 10 10"
							onClick={() => onIncreaseQuantity(product.id)}
							setFillColor={setPlusColor}
						>
							<path
								fill={plusColor}
								d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
							/>
						</QuantitySVG>
					</Button>
				) : (
					<Button onClick={() => onAddToCart(product.id)}>
						<img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
						Add to Cart
					</Button>
				)}
			</div>
			<p className="category">{product.category}</p>
			<p className="name">{product.name}</p>
			<p className="price">${product.price.toFixed(2)}</p>
		</li>
	);
}

function QuantitySVG({
	width,
	height,
	viewBox,
	onClick,
	setFillColor,
	children,
}) {
	return (
		<svg
			onMouseEnter={() => setFillColor("#c73a0f")}
			onMouseOut={() => setFillColor("#fff")}
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			viewBox={viewBox}
		>
			{children}
		</svg>
	);
}
