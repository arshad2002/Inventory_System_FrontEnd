import axios from "axios";

export default async function Profile() {
  const response = await axios.get(process.env.API_ENDPOINT+'/customers/profile', {
    withCredentials: true
  });
  const jsondata = response.data;
  console.log(jsondata); 

  return (
    <>
      <ul>
        {jsondata.map((item: any, index: number) => (
          <li key={index}>
            <p>Name: {item.FirstName} {item.LastName}</p>
            <p>Address: {item.HouseNumber}, {item.street}, {item.city}, {item.divition}, {item.postalCode}</p> 
            <p>Phone: {item.phoneNumber}</p>
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}
