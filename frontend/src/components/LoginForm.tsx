/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState, useRef } from 'react';
import {
  ActionFunction,
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import {
  getLoginCode,
  getUserMensaMenuSubscriptions,
  login,
} from '../utils/ajax';
import LoadingModal from './LoadingModal';
import InfoModal from './InfoModal';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Get the name of the button
  // submitted as a pair with the button's value as part of the form data,
  const intent = formData.get('intent');

  if (intent === 'get_login_code') {
    const { email } = data;
    const status = await getLoginCode(email as string);
    return { email, get_login_code: status };
  }

  if (intent === 'login') {
    const { email, loginCode } = data;
    const status = await login(email as string, loginCode as string);
    return { email, login: status };
  }

  return null;
};

function LoginForm() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const codeIsSentModal = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();
  const navigation = useNavigation();

  const status = useActionData() as {
    email: string;
    get_login_code?: number;
    login?: number;
  };

  useEffect(() => {
    // handle submitting request of getting login code
    if (
      navigation.state === 'idle' &&
      status &&
      status.get_login_code === 200
    ) {
      setIsCodeSent(true);
      codeIsSentModal.current?.showModal();
    }

    // handle submitting request of login
    // after successful login users will be redirected to subscriptions page
    if (navigation.state === 'idle' && status && status.login === 200) {
      navigate('/subscriptions', { state: { email: status.email } });
    }
  }, [status, navigation.state, navigate]);

  // redirect to setting page if login cookies has already been set.
  useEffect(() => {
    getUserMensaMenuSubscriptions()
      .then(() => {
        navigate('/subscriptions');
      })
      .catch();
  }, [navigate]);

  return (
    <>
      {navigation.state === 'submitting' && <LoadingModal />}
      <InfoModal
        title="Please Check Your Email for the login Code"
        content={null}
        buttonContent="close"
        ref={codeIsSentModal}
      />
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="alert max-w-sm lg:max-w-lg bg-secondary -mb-px">
          <span className="text-center text-sky-50">
            Get login code via Email. After login you can update your
            subscriptions.
          </span>
        </div>
        <div className="w-full p-6 border-t-4 border-secondary rounded-md shadow-md border-top lg:max-w-lg max-w-sm min-w-min">
          <div className="flex items-center justify-center">
            <h1 className="lg:text-3xl text-xl font-semibold text-center text-gray-700 capitalize">
              update subscriptions
            </h1>
          </div>
          <Form className="space-y-4" method="POST">
            <div>
              <label className="label" htmlFor="email">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full input input-bordered"
                required
              />
            </div>
            {isCodeSent && (
              <div>
                <label className="label" htmlFor="loginCode">
                  <span className="text-base label-text">Login code</span>
                </label>
                <input
                  id="loginCode"
                  name="loginCode"
                  placeholder="Enter login code"
                  className="w-full input input-bordered"
                />
              </div>
            )}
            <div>
              {isCodeSent ? (
                <button
                  className="btn btn-block"
                  type="submit"
                  name="intent"
                  value="login"
                >
                  Login
                </button>
              ) : (
                <div>
                  <button
                    className="btn btn-block"
                    type="submit"
                    name="intent"
                    value="get_login_code"
                  >
                    get login code via email
                  </button>
                  <button
                    type="button"
                    className="btn btn-block mt-4"
                    onClick={() => {
                      setIsCodeSent(true);
                    }}
                  >
                    I already have the code
                  </button>
                </div>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
