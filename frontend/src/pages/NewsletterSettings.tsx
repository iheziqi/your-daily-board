import { LoaderFunction, useRouteLoaderData } from 'react-router-dom';

import CheckBox from '../components/CheckBox';
import { getMensaInfo, getExchangeRateInfo } from '../utils/ajax';

export const loader: LoaderFunction<SubscriptionsLoaderData> = async () => {
  const [mensaInfo, exchangeRateInfo] = await Promise.all([
    getMensaInfo(),
    getExchangeRateInfo(),
  ]);
  return { mensaInfo, exchangeRateInfo };
};

function NewsletterSettings() {
  const { mensaInfo, exchangeRateInfo } = useRouteLoaderData(
    'subscriptions'
  ) as SubscriptionsLoaderData;
  const mensaIds = Object.keys(mensaInfo) as MensaID[];

  return (
    <div className="min-h-screen max-w-full bg-base-200 flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">Choose your subscriptions</h1>
      <div className="max-w-lg text-center">
        <div className="my-4">
          <h3 className="text-2xl my-2 capitalize font-bold">
            exchange rate 💰
          </h3>
          {exchangeRateInfo.map((fromTo) => (
            <CheckBox key={fromTo} id={fromTo} labelText={fromTo}>
              {undefined}
            </CheckBox>
          ))}
        </div>
        <div className="my-4">
          <h3 className="text-2xl my-2 capitalize font-bold">mensa menu 🥔</h3>
          {mensaIds.map((id) => (
            <CheckBox key={id} id={id} labelText={`${mensaInfo[id].name}`}>
              <a
                href={mensaInfo[id].url}
                target="_blank"
                rel="noreferrer"
                className="link  link-hover link-info"
              >
                (website)
              </a>
            </CheckBox>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsletterSettings;
