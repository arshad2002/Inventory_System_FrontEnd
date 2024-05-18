import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <Link href="/signin">signin</Link>
      <Link href="/signup">signup</Link>
    </div>
  );
}
