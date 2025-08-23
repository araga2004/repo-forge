"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <p>Welcome, {user.firstName}!</p>
      ) : (
        <p>Please sign in to access your dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
