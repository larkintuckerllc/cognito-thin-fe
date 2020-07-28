import { getTokens, refreshTokens } from './auth';

const urlBase = process.env.REACT_APP_API;

const getExampleFetch = async () => {
  const { idToken } = getTokens();
  const response = await fetch(`${urlBase}/example`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response;
};

export const getExample = async () => {
  const response = await getExampleFetch();
  if (!response.ok) {
    if (response.status !== 401) {
      throw new Error();
    }

    // REFRESH_TOKENS AND RETRY
    const { refreshToken } = getTokens();
    await refreshTokens(refreshToken);
    const retryResponse = await getExampleFetch();
    if (!retryResponse.ok) {
      throw new Error();
    }
  }
};
