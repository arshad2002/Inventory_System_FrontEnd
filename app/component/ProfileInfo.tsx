"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProfileInfo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers/profile`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <ul>
        {data.map((item: any, index: number) => (
          <li key={index}>
            <p>Name: {item.FirstName} {item.LastName}</p>
            <p>Address: {item.HouseNumber} {item.street}, {item.city}, {item.divition}, {item.postalCode}</p>
            <p>Phone Number: {item.phoneNumber}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProfileInfo;