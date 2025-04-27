import React from "react";
import Layout from "../layout/Layout";

// icons
import { LuBadgeCheck } from "react-icons/lu";

const Success = ({ content }) => {
  return (
    <Layout>
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-20">
        <div className="rounded-full bg-green-100 p-4">
          <LuBadgeCheck size={50} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          {content.title}
        </h1>
        <p className="mt-2 max-w-lg text-center text-gray-600">
          {content.description}
        </p>
      </main>
    </Layout>
  );
};

export default Success;
