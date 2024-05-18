"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../style/showProduct.css';

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
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <div className="avatar">
                <div className="w-24 rounded">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <li key={index}>
              <p>Name: {item.FirstName} {item.LastName}</p>
              <p>Address: {item.HouseNumber} {item.street}, {item.city}, {item.divition}, {item.postalCode}</p>
              <p>Phone Number: {item.phoneNumber}</p>
              <button className="btn btn-secondary" >Edit</button>
              </li>
            </div>
        ))}
      </ul>
    </>
  );
}

export default ProfileInfo;