"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function Signout() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT +'/customers/signout', { withCredentials: true });
      console.log(response.data);
      Cookies.remove('data');
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignout}>Signout</button>
  );
}

export default Signout;