interface LogoTextProps {
	className?: string;
	imageClassName?: string;
}

export const MarksBanner = ({ className, imageClassName }: LogoTextProps) => {
	return (
		<div className={className}>
			<img className={imageClassName} src={require('./marks-banner.png')} alt="MarksBanner" />
		</div>
	);
};
