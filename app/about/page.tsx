import axios from "axios"
export default async function About() {
  const response = await axios.get("http://localhost:4000/admin/alladmins");
  const jsonData = response.data;
  console.log(jsonData);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search..."
              className="mr-2 px-24 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <button className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none">
              Search
            </button>
          </div>
          <div className="flex flex-wrap -m-4">
            {/* Loop through jsonData and create a div for each user */}
            {jsonData.map((item: any, index: any) => (
              <div key={index} className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <br />
                  Name: {item.name}
                  <br />
                  ID: {item.id}
                  <br />
                  Email: {item.email}
                  <br />
                  Phone: {item.phone}
                  <br />
                  Image:
                  <br/>
                  {/* <img
                    src={"http://localhost:4000/admin/image/"+ item.id} width={100} height={100}
                    alt="err"
                  /> */}
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img
                        src={"http://localhost:4000/admin/image/" + item.id}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <button className="text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded">
                    Delete
                  </button>
                  <br />
                  <br />
                </div>
              </div>
            ))}
          </div>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
        </div>
      </section>
    </>
  );
  }