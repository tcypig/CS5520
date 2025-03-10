import React, { useEffect, useState } from 'react'
import { router, Slot, useSegments } from "expo-router"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/Firebase/firebaseSetup';

export default function _layout() {
  const segments = useSegments();
  console.log("segments", segments);

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
  
  useEffect(() => {
    if (userLoggedIn && segments[0] === '(auth)') {
      console.log('User is logged in');
      router.replace("(protected")
    } else if (!userLoggedIn && segments[0] === '(protected)') {
      console.log('User is not logged in');
      router.replace("(auth)/login")
    }
  }, [userLoggedIn]);

  return (
    <Slot />
  )
}

