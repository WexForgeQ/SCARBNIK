interface LogoTextProps {
	className?: string;
}

export const CheckIcon = ({ className }: LogoTextProps) => {
	return (
		<svg
			width="194"
			height="195"
			viewBox="0 0 194 195"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M0 97.235C0 43.6634 43.4284 0.234985 97 0.234985V0.234985C150.572 0.234985 194 43.6634 194 97.235V97.235C194 150.807 150.572 194.235 97 194.235V194.235C43.4284 194.235 0 150.807 0 97.235V97.235Z"
				fill="#EBECD0"
			/>
			<path d="M52 111.5L96.5 136L107.75 117.25L142 58" stroke="#779556" strokeWidth="30" />
		</svg>
	);
};
