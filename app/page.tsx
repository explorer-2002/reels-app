"use client"

import { SessionProvider } from "next-auth/react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
export default function Home() {

  return (
    <>
      <Dashboard />
    </>
  );
}
