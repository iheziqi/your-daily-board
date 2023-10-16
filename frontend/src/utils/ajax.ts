/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable import/prefer-default-export */

import { json } from 'react-router-dom';

const BASEURL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export async function submitEmailAddress(email: string) {
  const url = `${BASEURL}/users/register`;
  const option: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  };

  const response = await fetch(url, option);

  if (!response.ok) {
    const data = await response.json();
    throw json({ message: data.message }, { status: response.status });
  }

  return response.status;
}

/**
 * Gets all mensa information (mensa id, name, url).
 * @returns
 */
export async function getMensaInfo() {
  const url = `${BASEURL}/info/mensa`;
  const response = await fetch(url);
  const data = (await response.json()) as MensaInfo;

  return data;
}

/**
 * Gets all exchange rate information (from_to).
 * @returns
 */
export async function getExchangeRateInfo() {
  const url = `${BASEURL}/info/exchange_rate`;
  const response = await fetch(url);
  const data = (await response.json()) as FromTo[];

  return data;
}

/**
 * Gets login code for the user.
 * After hitting the endpoint, an email with login code will be sent to user.
 * @param email
 */
export async function getLoginCode(email: string) {
  const url = `${BASEURL}/users/issue_auth_code`;
  const option: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  };

  const response = await fetch(url, option);
  const data = await response.json();

  if (!response.ok) {
    throw json({ message: data.message }, { status: response.status });
  }

  return response.status;
}

/**
 * Login in with login code.
 * After hitting the endpoint, a cookie made by jwt token will be set.
 * So after that user can visit protected routes like setting subscription.
 * @param email
 */
export async function login(email: string, loginCode: string) {
  const url = `${BASEURL}/users/login`;
  const option: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ email, authentication_code: loginCode }),
  };

  const response = await fetch(url, option);

  if (!response.ok) {
    const data = await response.json();
    throw json({ message: data.message }, { status: response.status });
  }

  return response.status;
}

/**
 * Gets user mensa menu subscriptions.
 * @returns
 */
export async function getUserMensaMenuSubscriptions() {
  const url = `${BASEURL}/settings/mensa_menu_subscription`;
  const option: RequestInit = {
    method: 'GET',
    credentials: 'include',
  };
  const response = await fetch(url, option);

  if (!response.ok) {
    const data = await response.json();
    throw json({ message: data.message }, { status: response.status });
  }

  const data = (await response.json()) as UserMensaMenuSubscriptions;

  return data;
}

/**
 * Gets user exchange rate subscriptions.
 * @returns
 */
export async function getUserExchangeRateSubscriptions() {
  const url = `${BASEURL}/settings/exchange_rate_subscription`;
  const option: RequestInit = {
    method: 'GET',
    credentials: 'include',
  };
  const response = await fetch(url, option);

  if (!response.ok) {
    const data = await response.json();
    throw json({ message: data.message }, { status: response.status });
  }

  const data = (await response.json()) as UserExchangeRateSubscriptions;

  return data;
}

export async function setUserMensaMenuSubscriptions(
  mensaMenuSubscriptions: MensaID[]
) {
  const url = `${BASEURL}/settings/mensa_menu_subscription`;
  const option: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mensaIds: mensaMenuSubscriptions }),
  };
  const response = await fetch(url, option);

  return response;
}

export async function setUserExchangeRateSubscriptions(
  exchangeRateSubscriptions: FromTo[]
) {
  const url = `${BASEURL}/settings/exchange_rate_subscription`;
  const option: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fromTos: exchangeRateSubscriptions }),
  };
  const response = await fetch(url, option);

  return response;
}

export async function getYourDailyBoardPreview() {
  const url = `${BASEURL}/info/your_daily_board_email`;

  const response = await fetch(url);

  if (!response.ok) {
    return '<div>Something went wrong :(</div>';
  }

  const preview = await response.text();

  return preview;
}
