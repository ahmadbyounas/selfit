"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const { data: session, status } = useSession();

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (!session) {
      redirect("/signin");
    }

    return <Component {...props} />;
  };
}
