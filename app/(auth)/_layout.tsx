import React, { useEffect, useState } from 'react'
import { Slot } from "expo-router"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/Firebase/firebaseSetup';

export default function _layout() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      // User is signed in, see docs for a list of available properties
        setUserLoggedIn(true);
      } else {
      // User is signed out
        setUserLoggedIn(false);
      }
    })
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {}, [userLoggedIn]);

  return (
    <Slot />
  )
}

