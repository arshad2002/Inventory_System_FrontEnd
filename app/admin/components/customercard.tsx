import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function CustomerCard({
  data,
  handleDeleteCustomer,
}: {
  data: any;
  handleDeleteCustomer: any;
}) {
  const [customerImage, setCustomerImage] = useState(""); // State to store customer image URL

  useEffect(() => {
    // Fetch customer image URL
    const fetchCustomerImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/admin/cimage/${data.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "arraybuffer",
          }
        );
        const imageData = Buffer.from(response.data, "binary").toString(
          "base64"
        ); // Convert binary data to base64 string
        setCustomerImage(`data:image/jpeg;base64,${imageData}`); // Set base64 encoded image data
      } catch (error) {
        console.error("Error fetching customer image:", error);
      }
    };

    fetchCustomerImage(); // Fetch image when component mounts
  }, [data.id]); // Fetch image when data.id changes

  return (
    <div className="card w-50 border border-black bg-base-100 shadow-xl">
      <div className="figure-container">
        {customerImage ? (
          <img
            src={data && customerImage}
            alt="Profile"
            width={200}
            height={200}
            className="image"
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="card-body">
        <h2 className="card-title">ID: {data.id}</h2>
        Name: {data.name}
        <br />
        Email: {data.email}
        <br />
        Phone: {data.phone}
        <br />
        <div className="card-actions justify-end">
          <Link href={`/admin/customer/${data.id}`}>
            <button className="btn btn-sm btn-warning rounded-full">
              Update
            </button>
          </Link>{" "}
          <button
            onClick={() => handleDeleteCustomer(data.id)}
            className="btn btn-sm btn-error rounded-full"
          >
            Delete
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}
