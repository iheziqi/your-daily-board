import { FormEvent, useEffect, useRef, useState } from 'react';
import { LoaderFunction, useRouteLoaderData, Link } from 'react-router-dom';

import CheckBox from '../components/CheckBox';
import {
  getMensaInfo,
  getExchangeRateInfo,
  getUserMensaMenuSubscriptions,
  getUserExchangeRateSubscriptions,
  setUserExchangeRateSubscriptions,
  setUserMensaMenuSubscriptions,
} from '../utils/ajax';
import { classifyMensas } from '../utils/helpers';
import InfoModal from '../components/InfoModal';
import ErrorModal from '../components/errors/ErrorModal';
import Error from './Error';
import LoadingModal from '../components/LoadingModal';

/**
 * Loader function for newsletter setting page.
 * It loads all mensa and exchange info.
 * @returns
 */
export const loader: LoaderFunction = async () => {
  const [mensaInfo, exchangeRateInfo] = await Promise.all([
    getMensaInfo(),
    getExchangeRateInfo(),
  ]);
  return { mensaInfo, exchangeRateInfo };
};

/**
 * Settings page, where users can update their subscriptions preference.
 */
function NewsletterSettings() {
  const { mensaInfo, exchangeRateInfo } = useRouteLoaderData(
    'subscriptions'
  ) as SubscriptionsLoaderData;
  // classifies mensa info data according to city
  const classifiedMensaInfo = classifyMensas(mensaInfo);

  // state represents user subscription
  const [userSubscriptions, setUserSubscriptions] = useState<
    UserSubscriptions | undefined
  >();
  // state represents error
  const [hasError, setHasError] = useState(false);
  // state of submitting
  const [isLoading, setLoading] = useState(false);
  const successfulSubmitModal = useRef<HTMLDialogElement>(null);
  const unauthorizedErrorModal = useRef<HTMLDialogElement>(null);

  /**
   * Gets all user subscription from api endpoint and set the state.
   */
  const getUserSubscriptions = () => {
    setLoading(true);
    Promise.all([
      getUserMensaMenuSubscriptions(),
      getUserExchangeRateSubscriptions(),
    ])
      .then(([userMensaMenuSubReturned, userExchangeRateSubReturned]) => {
        // const { email } = userMensaMenuSubReturned;
        const { mensaMenuSubscriptions } = userMensaMenuSubReturned;
        const { exchangeRateSubscriptions } = userExchangeRateSubReturned;
        setUserSubscriptions({
          mensaMenuSubscriptions,
          exchangeRateSubscriptions,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof Response && !err.ok && err.status === 401) {
          unauthorizedErrorModal.current?.showModal();
          setLoading(false);
        } else {
          setLoading(false);
          setHasError(true);
        }
      });
  };

  /**
   * Checkbox change handler for all exchange rates checkboxes.
   * @param e event
   */
  const exchangeRateCheckHandler = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as FromTo;
    const userExchangeRateSubscriptions =
      userSubscriptions?.exchangeRateSubscriptions;

    if (!userExchangeRateSubscriptions) return;

    if (userExchangeRateSubscriptions.includes(value)) {
      // remove this subscription
      const newUserExchangeRateSub = userExchangeRateSubscriptions.filter(
        (fromTo) => value !== fromTo
      );
      setUserSubscriptions({
        ...userSubscriptions,
        exchangeRateSubscriptions: newUserExchangeRateSub,
      });
    } else {
      // add this subscription
      const newUserExchangeRateSub = [...userExchangeRateSubscriptions, value];
      setUserSubscriptions({
        ...userSubscriptions,
        exchangeRateSubscriptions: newUserExchangeRateSub,
      });
    }
  };

  /**
   * Checkbox change handler for all mensa menu checkboxes.
   * @param e event
   */
  const mensaMenuCheckHandler = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as MensaID;
    const userMensaMenuSubscriptions =
      userSubscriptions?.mensaMenuSubscriptions;

    if (!userMensaMenuSubscriptions) return;

    if (userMensaMenuSubscriptions.includes(value)) {
      // remove this subscription
      const newUserMensaMenuSub = userMensaMenuSubscriptions.filter(
        (id) => value !== id
      );
      setUserSubscriptions({
        ...userSubscriptions,
        mensaMenuSubscriptions: newUserMensaMenuSub,
      });
    } else {
      // add this subscription
      const newUserMensaMenuSub = [...userMensaMenuSubscriptions, value];
      setUserSubscriptions({
        ...userSubscriptions,
        mensaMenuSubscriptions: newUserMensaMenuSub,
      });
    }
  };

  /**
   * Submitting handler. Sends all data to api endpoint.
   */
  const handleSubmit = () => {
    if (!userSubscriptions) return;

    const userExchangeRateSub = userSubscriptions.exchangeRateSubscriptions;
    const userMensaMenuSub = userSubscriptions.mensaMenuSubscriptions;

    setLoading(true);
    Promise.all([
      setUserExchangeRateSubscriptions(userExchangeRateSub),
      setUserMensaMenuSubscriptions(userMensaMenuSub),
    ])
      .then(() => {
        successfulSubmitModal.current?.showModal();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setHasError(true);
      });
  };

  useEffect(() => {
    getUserSubscriptions();
  }, []);

  return (
    <>
      {hasError && (
        <div className="fixed z-50 w-full">
          <Error />
        </div>
      )}
      {isLoading && <LoadingModal />}
      <ErrorModal
        ref={unauthorizedErrorModal}
        title="Oops.."
        content="Your session is expired, please login."
        button={
          <Link to="/login" className="btn btn-primary mb-2">
            login
          </Link>
        }
      />
      <InfoModal
        ref={successfulSubmitModal}
        title="Update subscriptions successfully!"
        content="You will receive the content you choose in the next newsletter."
        buttonContent="close"
      />
      <div className="min-h-screen max-w-full bg-base-200 flex flex-col items-center">
        <h1 className="text-xl font-bold my-4 sm:text-3xl capitalize">
          Choose your subscriptions
        </h1>
        <div className="max-w-lg text-center">
          <div className="my-4">
            <h3 className="text-xl my-2 capitalize font-bold">
              exchange rate 💰
            </h3>
            {exchangeRateInfo.map((fromTo) => {
              return (
                <CheckBox
                  key={fromTo}
                  id={fromTo}
                  labelText={fromTo}
                  isChecked={Boolean(
                    userSubscriptions?.exchangeRateSubscriptions.includes(
                      fromTo
                    )
                  )}
                  onChange={exchangeRateCheckHandler}
                >
                  {undefined}
                </CheckBox>
              );
            })}
          </div>
          <div className="my-4">
            <h3 className="text-xl my-2 capitalize font-bold">mensa menu 🥔</h3>
            {Object.keys(classifiedMensaInfo).map((place) => {
              // first get all mensa ids of this place
              const mensaIds = Object.keys(
                classifiedMensaInfo[place]
              ) as MensaID[];

              // for each id, get the name and url, render the checkbox
              const checkBoxes = mensaIds.map((id) => {
                const mensaName = classifiedMensaInfo[place][id].name;
                const mensaUrl = classifiedMensaInfo[place][id].url;

                return (
                  <CheckBox
                    key={id}
                    id={id}
                    labelText={mensaName}
                    isChecked={Boolean(
                      userSubscriptions?.mensaMenuSubscriptions.includes(id)
                    )}
                    onChange={mensaMenuCheckHandler}
                  >
                    <a
                      href={mensaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link  link-hover link-secondary"
                    >
                      (website)
                    </a>
                  </CheckBox>
                );
              });

              return (
                <div key={place}>
                  <p className="font-bold text-primary-focus">{place}</p>
                  {checkBoxes}
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-primary mb-4"
            type="button"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
}

export default NewsletterSettings;
