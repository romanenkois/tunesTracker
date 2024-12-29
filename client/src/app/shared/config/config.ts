const production = false;

export const config = {
  BASE_CLIENT_URL: production ? 'https://tunes-tracker-client.vercel.app' : 'http://localhost:4200',
  BASE_API_URL: production ? 'https://tunes-tracker-api.vercel.app/tunes-tracker-api' : 'http://localhost:3000/tunes-tracker-api',
  SPOTIFY_REDIRECT_URI: production ? 'https://tunes-tracker-client.vercel.app/login' : 'http://localhost:4200/login',

  SPOTIFY_CLIENT_ID: '6f95aa1688124e4abd0e5c45862a7b10',
  SPOTIFY_STATE: '37',
  SPOTIFY_SHOW_DIALOG_ON_AUTHORIZATION: production ? true : false, // idfc that it can be simpler

  ITEMS_LIMIT_PER_REQUEST: 25,

  OFFLINE_MODE: false,
};
