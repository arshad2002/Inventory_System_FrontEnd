import ProfileInfo from "@/app/component/ProfileInfo";
import { useAuth } from "@/app/util/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

export default async function Profile() {
  // const isAuthenticated = useAuth();
  // const router = useRouter();
  // if (!isAuthenticated) {
  //   router.push('/signin');
  //   return null; // Return null to prevent rendering the component
  // }
  
  return(
    <>
    Profile
    <ProfileInfo />
    </>
  );
}
