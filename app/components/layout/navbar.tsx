"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack, Avatar, Tooltip } from "@mui/material";
import { MenuBook, Logout as LogoutIcon } from "@mui/icons-material";
import Link from "next/link";
import {  useSession } from "next-auth/react";
import {logOut} from '../../../lib/actions/auth'

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "transparent",
        backdropFilter: "blur(12px)",
        boxShadow: "none",
        zIndex: 2,
        px: 4,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <MenuBook sx={{ fontSize: 34, color: "#fcd34d" }} />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(90deg,#fcd34d,#a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ShelfIt
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {session ? (
            <>
             
              <Tooltip title={session.user?.name || "User"}>
                <Avatar
                  alt={session.user?.name || "User"}
                  src={session.user?.image || undefined}
                  sx={{
                    bgcolor: "#7c3aed",
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out, border 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                      border: "2px solid #fcd34d", // Subtle border glow on hover
                    },
                  }}
                >
                  {session.user?.name ? session.user.name[0] : "U"}
                </Avatar>
              </Tooltip>
              <Tooltip title="Sign Out">
                <Button
                  onClick={() => logOut()}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.3)",
                    "&:hover": {
                      color: "#fcd34d",
                      borderColor: "#fcd34d",
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                    minWidth: 0, // For icon button
                    px: 1.5, // For icon button
                    borderRadius: "8px", // More modern rounded corners
                  }}
                >
                  <LogoutIcon />
                  <Typography variant="button" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
                    Sign Out
                  </Typography>
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Button
                component={Link}
                href="/signin"
                sx={{ color: "white", "&:hover": { color: "#fcd34d" } }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                href="/signup"
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg,#7c3aed,#f59e0b)",
                  color: "white",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;