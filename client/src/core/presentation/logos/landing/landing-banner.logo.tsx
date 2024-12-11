interface LogoTextProps {
	className?: string;
	imageClassName?: string;
}

export const LandingBanner = ({ className, imageClassName }: LogoTextProps) => {
	return (
		<div className={className}>
			<img
				className={imageClassName}
				src={require('./landing-page-banner.png')}
				alt="Landing Page Banner"
			/>
		</div>
	);
};
