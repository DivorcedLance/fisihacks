import { db } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

export async function insert(collection_name, m_form) {
  try {
    const response = await addDoc(collection(db, collection_name), m_form);
    return response;
  } catch (error) {
    alert(error);
  }
}

export async function read(collection_name) {
  try {
    const response = await getDocs(collection(db, collection_name));
    return response;
  } catch (error) {
    alert(error);
  }
}
