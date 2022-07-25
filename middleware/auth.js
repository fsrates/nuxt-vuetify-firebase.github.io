export default function ({ app, store, redirect }) {
  if (!store.getters.authenticated || !app.$fire.auth) {
    return redirect('/login-email');
  }
};
