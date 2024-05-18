'use client'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';

function settings() {
    useEffect(() => {
        const userData = Cookies.get('data');
        console.log('User data:', userData);
    }, []); // Run this effect only once on component mount

    return (
        <div>Settings</div>
    );
  return (
    <div>settings</div>
  )
}

export default settings