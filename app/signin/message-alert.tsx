"use client";

import { useSearchParams } from "next/navigation";
import { Alert } from "@mui/material";
import React from "react";

const MessageAlert: React.FC = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  if (!message) {
    return null;
  }

  return (
    <Alert severity="success" sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
};

export default MessageAlert;
