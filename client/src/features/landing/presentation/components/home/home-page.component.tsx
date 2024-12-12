import { Button, CoinsBanner, LandingBanner, MarksBanner } from '@core';

export const HomePageComponent = () => {
	return (
		<div className="flex flex-col gap-10 pb-10">
			<div className="flex flex-col items-center gap-5">
				<p className="w-[500px] text-center text-[30px] font-[1000] text-primary-sand">
					Управляйте своими коллекциями в одном месте
				</p>
				<p className="w-[500px] text-center text-[20px] font-[500] text-primary-sand">
					Создавайте, управляйте, находите, меняйте и организуйте свои коллекции с
					легкостью
				</p>
				<Button
					variant="primary"
					type="submit"
					className="flex h-[50px] items-center bg-primary-green"
				>
					<div className="flex w-full items-center justify-center">
						<p className="text-center text-[20px] text-black">
							Начать коллекционировать
						</p>
					</div>
				</Button>
			</div>
			<div className="flex w-full justify-between gap-4">
				<MarksBanner className="flex-1 basis-1/3" imageClassName="rounded-3xl" />
				<LandingBanner
					className="flex-1 basis-1/3 rounded-3xl"
					imageClassName="rounded-3xl"
				/>
				<CoinsBanner
					className="flex-1 basis-1/3 rounded-3xl"
					imageClassName="rounded-3xl"
				/>
			</div>
			<div className="flex flex-col">
				<p className="w-fit text-center text-[30px] font-[1000] text-primary-green">
					О нас
				</p>
				<p className="w-fit text-center text-[25px] font-[1000] text-primary-sand">
					Scarbnik коллекционирует довольных пользователей
				</p>
				<p className="w-fit text-left text-[20px] font-[500] text-primary-sand">
					Наше приложение для коллекционирования предоставляет все необходимые инструменты
					для удобного управления вашими коллекциями. С его помощью вы можете: Создавать и
					организовывать свои коллекции по категориям. Быстро находить и добавлять новые
					элементы. Управлять своими коллекциями на ходу. Делиться своими коллекциями с
					другими пользователями. Наше приложение гарантирует высокое качество и
					надежность, подтвержденные аккредитованными организациями. Независимо от того,
					что вы коллекционируете — монеты, марки, книги или другие ценные предметы, наше
					приложение поможет вам эффективно управлять вашими коллекциями и наслаждаться
					процессом.
				</p>
			</div>
		</div>
	);
};
