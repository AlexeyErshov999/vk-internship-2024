import { ButtonHTMLAttributes } from "react";
import React from "react";

type ButtonColor = "primary" | "danger" | "success" | "warning" | "info" | "light" | "dark";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: ButtonColor;
	outline?: boolean;
}

const Button = ({ children = "Click", type = "submit", color = "primary", outline = false, className, ...rest }: Props) => {
	const classes = `btn btn${outline ? "-outline" : ""}-${color} ${className ?? ""}`.trim();

	return (
		<button className={classes} type={type} {...rest}>
			{children}
		</button>
	);
};

export default Button;
