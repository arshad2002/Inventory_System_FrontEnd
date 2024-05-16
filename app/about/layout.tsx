import NavBar from "../admin/components/navbar";

export default function AboutLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <div>
          <NavBar/>
        {children}
        </div>
    )};