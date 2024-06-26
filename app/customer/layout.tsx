import Signout from "../component/Signout";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4 justify-between">
        <div className="flex items-baseline space-x-4">
          <a href="/customer" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</a>
          <a href="/customer/cart" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Cart</a>

        </div>
        <div className="flex items-baseline space-x-2">
          <a href="/customer/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Profile</a>
          <a href="/customer/settings" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Setting</a>
          <Signout />
        </div>
      </div>
    </div>
    {children}
  </>

  );
}
