export default function ({ $axios, app, req, redirect }) {
  $axios.defaults.baseURL = process.env.baseURL;

  const getIdToken = () => {
    if (process.server) {
      if (!req.headers.cookie) {
        return null;
      }
      return import('cookie').then((cookie) => {
        const parseCookies = cookie.parse(req.headers.cookie);
        console.log(parseCookies);
        if (!parseCookies) {
          return;
        }
        if (parseCookies.__session) {
          const session = JSON.parse(parseCookies.__session);
          return session.idToken;
        } else {
          return null;
        }
      });
    }
    if (process.client) {
      return new Promise((resolve, reject) => {
        const unsubscribe = app.$fireAuth.auth.onAuthStateChanged((user) => {
          unsubscribe();
          if (user) {
            user.getIdToken().then((idToken) => {
              resolve(idToken);
            }, () => {
              resolve(null);
            });
          } else {
            resolve(null);
          }
        });
      });
    }
    return null;
  };

  $axios.onRequest(async (config) => {
    // if (process.env.NODE_ENV !== "production") {
    config.withCredentials = true;
    // }
    const idToken = await getIdToken();
    if (config.headers !== null && config.headers['X-Requested-With'] === null) {
      config.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + idToken,
        ...config.headers
      };
    }
    return config;
  });

  $axios.onError((error) => {
    const code = parseInt(error, error.response.status);
    if (code === '304') {
      return redirect('/');
    }
  });
}
