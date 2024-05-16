import NavBar from "./components/navbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <NavBar />
        {children}
        
      </body>
    </html>
  );
}
