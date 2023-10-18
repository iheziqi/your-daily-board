import { useRef, useEffect } from 'react';
import {
  ActionFunction,
  Form,
  Link,
  Outlet,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

import Footer from '../components/Footer';
import InfoModal from '../components/InfoModal';
import { submitEmailAddress } from '../utils/ajax';

const BACKEND_BASEURL = import.meta.env.VITE_BACKEND_API_BASE_URL;

/**
 * Action function of react router in landing page.
 */
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { email } = data;
  const status = await submitEmailAddress(email as string);
  return status;
};

/**
 * Landing page.
 */
export default function Landing() {
  // reference to the modal element
  const infoModal = useRef<HTMLDialogElement>(null);

  // current navigation of react router
  const navigation = useNavigation();

  // returned response from action function
  const actionResponse = useActionData();

  useEffect(() => {
    if (
      navigation.state === 'idle' &&
      actionResponse === 201 &&
      infoModal.current
    ) {
      infoModal.current.showModal();
    }
  }, [navigation.state, actionResponse]);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left lg:mr-10">
            <h1 className="md:text-5xl font-bold text-4xl h-20">
              Your Daily{' '}
              <span className="text-secondary">
                <Typewriter
                  words={['Board', 'Mensa Menu', 'Exchange Rate', 'More!']}
                  loop={false}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <p className="py-3 text-base md:text-lg font-bold text-neutral-500">
              Stay informed about{' '}
              <span className="text-secondary">what to eat</span> at Mensa of
              Studierendenwerk Erlangen-Nürnberg!
            </p>
            <Form method="POST">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className=" input input-bordered w-full max-w-xs mr-5 mb-2 focus:valid:border-primary-focus focus:invalid:border-secondary"
                required
              />
              <button className="btn btn-primary" type="submit">
                {navigation.state === 'submitting'
                  ? 'submitting'
                  : 'sign me up'}
              </button>
            </Form>
            <InfoModal
              title="You are so close!"
              content="An email has been sent to you to verify your email address, please check your email inbox. The link in the email will expire in 15 minutes."
              buttonContent="close"
              ref={infoModal}
            />
            <p className="py-2 text-sm md:text-base text-neutral-400">
              Sign up to get a{' '}
              <a
                href={`${BACKEND_BASEURL}/info/your_daily_board_email`}
                target="blank"
                className="link hover:text-neutral-600"
              >
                daily email newsletter
              </a>{' '}
              a daily email newsletter about all Mensa menus you want to know.
            </p>
            <p className="text-sm md:text-base text-neutral-400">
              Already signed up? Change your subscriptions{' '}
              <Link to="login" className="link hover:text-neutral-600">
                here.
              </Link>
            </p>
          </div>

          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
