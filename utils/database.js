import { ref, child, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '~/plugins/firebase';

export const dbRef = (path) => {
  return ref(database, path);
};

export const childRef = (parent, path) => {
  return child(ref(database, parent), path);
};

export const queryRef = (path, child, value) => {
	return query(ref(database, path), orderByChild(child) & equalTo(value));
};
