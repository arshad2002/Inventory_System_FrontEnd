"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

interface Admin {
  name: string;
  email: string;
  phone: string;
  id: number;
}

export default function NavBar() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [adminImage, setAdminImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (token && email) {
          const response = await axios.get(
            `http://localhost:4000/admin/getadmin/` + email,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAdmin(response.data);
        } else {
          router.push("../../login");
        }
      } catch (error) {
        console.error("Error Fetching Admin Data: ", error);
        router.push("../../login");
      }
    };
    fetchAdminData();
  }, [router]);

  useEffect(() => {
    const fetchAdminImage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (admin) {
          const response = await axios.get(
            `http://localhost:4000/admin/image/${admin.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          );
          const imageData = Buffer.from(response.data, "binary").toString(
            "base64"
          );
          setAdminImage(`data:image/jpeg;base64,${imageData}`);
        }
      } catch (error) {
        console.error("Error Fetching Admin Image: ", error);
      }
    };

    fetchAdminImage();
  }, [admin]);

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    router.push("../../login");
  };

  return (
    <nav className="text-gray-600 p-5 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">IMS</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a
            href="../../admin"
            className="mr-5 btn btn-outline btn-info btn-sm hover:text-gray-900"
          >
            Home
          </a>
          <a
            href="../../admin/customer"
            className="mr-5 btn btn-outline btn-secondary btn-sm hover:text-gray-900"
          >
            Customer
          </a>
          <a
            href="../../admin/category"
            className="mr-5 btn btn-outline btn-succsess btn-sm hover:text-white-900"
          >
            Category
          </a>
          <a
            href="../../admin/product"
            className="mr-5 btn btn-outline btn-warning btn-sm hover:text-gray-900"
          >
            Product
          </a>
          <a
            href="../../admin/orders"
            className="mr-5 btn btn-outline btn-error btn-sm hover:text-gray-900"
          >
            Orders
          </a>
          <div className="dropdown dropdown-bottom dropdown-end  ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 mask mask-hexagon mask-primary mask-offset-blue-100 mask-offset-2 border border-blue-500">
                {adminImage ? (
                  <img src={admin && adminImage} alt={admin.name} />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <a className="btn btn-ghost text-blue-500 text-x2">
                Hi, <h1>{admin && admin.name}</h1>
              </a>
              <li>
                <a href={`/admin/${admin.id}`} className="justify-between">
                  Profile
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-gray-300 btn btn-outline btn-error text-center btn-sm hover:bg-gray-100 font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </nav>
  );
}

