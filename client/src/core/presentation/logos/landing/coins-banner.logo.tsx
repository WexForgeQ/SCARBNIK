interface LogoTextProps {
	className?: string;
	imageClassName?: string;
}

export const CoinsBanner = ({ className, imageClassName }: LogoTextProps) => {
	return (
		<div className={className}>
			<img className={imageClassName} src={require('./coins-banner.png')} alt="CoinsBanner" />
		</div>
	);
};
