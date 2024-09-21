export default function Button({ className, style, children, onClick }) {
	return (
		<button
			className={`${className ? className : ""}`}
			onClick={onClick}
			style={style}
		>
			{children}
		</button>
	);
}
