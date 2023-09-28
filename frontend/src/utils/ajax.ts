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
