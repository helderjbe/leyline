import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settlement Application</h1>
      <div className="flex space-x-4">
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          href="/party-a"
        >
          Party A Interface
        </Link>
        <Link
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          href="/party-b"
        >
          Party B Interface
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
