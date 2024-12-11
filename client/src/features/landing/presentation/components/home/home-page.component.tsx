import { CoinsBanner, LandingBanner, MarksBanner } from '@core';

export const HomePageComponent = () => {
	return (
		<div className="flex w-full justify-between gap-4">
			<MarksBanner className="flex-1 basis-1/3" imageClassName="rounded-3xl" />
			<LandingBanner className="flex-1 basis-1/3 rounded-3xl" imageClassName="rounded-3xl" />
			<CoinsBanner className="flex-1 basis-1/3 rounded-3xl" imageClassName="rounded-3xl" />
		</div>
	);
};
