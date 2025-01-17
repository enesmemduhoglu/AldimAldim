import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  onSnapshot, // Burada onSnapshot'ı ekleyin
} from "firebase/firestore";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  projectId: Constants.expoConfig?.extra?.projectId,
  storageBucket: Constants.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.appId,
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

const ilanRef = collection(db, "ilanlar");
const favoritesRef = collection(db, "favorites");

const useilanlarListener = () => {
  const [ilanlar, setilanlar] = useState([]);

  useEffect(() => {
    return onSnapshot(ilanRef, (snapshot) => {
      setilanlar(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt ? data.createdAt.toDate() : null;
          return {
            id: doc.id,
            ...data,
            createdAt: createdAt,
          };
        })
      );
    });
  }, []);
  return ilanlar;
};

const deleteIlan = async (id) => {
  await deleteDoc(doc(db, "ilanlar", id));
};

const addIlan = (bath, bed, city, img, price, state, userId) => {
  return addDoc(ilanRef, {
    bath,
    bed,
    city,
    img,
    price,
    state,
    userId,
    createdAt: new Date(),
  });
};

const getUserIlanlar = async (userId) => {
  const q = query(ilanRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Favori ilanları eklemek için fonksiyon
const addFavorite = async (ilan) => {
  const user = auth.currentUser;
  if (user) {
    await addDoc(favoritesRef, {
      ...ilan,
      userId: user.uid,
      createdAt: new Date(),
    });
  }
};

// Favori ilanları almak için fonksiyon
const getFavorites = async () => {
  const user = auth.currentUser;
  if (user) {
    const q = query(favoritesRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
  return [];
};

const deleteFavorite = async (id) => {
  const favoriteDoc = doc(db, "favorites", id);
  await deleteDoc(favoriteDoc);
};

export {
  auth,
  db,
  useilanlarListener,
  deleteIlan,
  addIlan,
  getUserIlanlar,
  addFavorite,
  getFavorites,
  deleteFavorite,
};
