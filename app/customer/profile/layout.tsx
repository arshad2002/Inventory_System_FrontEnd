export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Profile</title>
      </head>
      <body>
        <section>{children}</section>
      </body>
    </html>
  );
}
