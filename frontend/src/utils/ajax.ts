/* eslint-disable import/prefer-default-export */

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

  return response;
}
