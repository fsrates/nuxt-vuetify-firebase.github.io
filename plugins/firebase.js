import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB2WDp0suSTCLXGlVoI8Mreo3YSZYVrWmg',
  authDomain: 'fs-exchange.firebaseapp.com',
  databaseURL: 'https://fs-exchange-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'fs-exchange',
  storageBucket: 'fs-exchange.appspot.com',
  messagingSenderId: '632523912329',
  appId: '1:632523912329:web:32012615c76e1996328258',
  measurementId: 'G-PBZ617DDY4'
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
