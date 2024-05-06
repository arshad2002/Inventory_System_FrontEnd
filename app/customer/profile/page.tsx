import axios from "axios";

export default async function Profile() {
  const response = await axios.get('http://127.0.0.1:3001/customers/profile');
  const jsondata = response.data;
  
  jsondata.forEach((item:any) => {console.log(item.FirstName);})

  return (
    <>
      <head>
        <title>Profile</title>
      </head>
      <body>
      <div></div> 
      </body>
    </>
  );
}
// async function getStaticProps() {
//   const response = await axios.get('http://127.0.0.1:3001/customers/profile');
//   const profiles = response.data;
//   return profiles
// }