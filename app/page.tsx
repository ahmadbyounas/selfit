"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Stack,
  IconButton, // Added IconButton
  Menu,       // Added Menu
  MenuItem,   // Added MenuItem
  useMediaQuery, // Added useMediaQuery
  useTheme,   // Added useTheme
} from "@mui/material";
import { keyframes } from "@mui/system";
import { MenuBook, ArrowRight, Book, BarChart, Search, Menu as MenuIcon } from "@mui/icons-material"; // Added MenuIcon
import Link from "next/link";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Animations
const float = keyframes`
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const sparkleAnim = keyframes`
  0%,100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const textReveal = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

interface Sparkle {
  top: string;
  left: string;
  delay: string;
  duration: string;
}

export default function LandingPage() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for mobile menu
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screens

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const arr: Sparkle[] = Array.from({ length: 12 }).map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 0.5}s`,
      duration: `${3 + Math.random() * 3}s`,
    }));
    setSparkles(arr);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Elegant Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg,#1e1b4b,#312e81,#6d28d9)",
          backgroundSize: "200% 200%",
          animation: `${gradientShift} 15s ease infinite`,
          zIndex: 0,
        }}
      />

      {/* Floating glowing shapes */}
      <Box
        sx={{
          position: "absolute",
          top: 100,
          left: 80,
          width: 160,
          height: 160,
          borderRadius: "50%",
          bgcolor: "rgba(139,92,246,0.15)",
          filter: "blur(40px)",
          animation: `${float} 8s ease-in-out infinite`,
          transform: `translateY(${scrollPosition * 0.2}px)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 120,
          right: 100,
          width: 120,
          height: 120,
          borderRadius: "50%",
          bgcolor: "rgba(14,165,233,0.18)",
          filter: "blur(30px)",
          animation: `${float} 10s ease-in-out infinite`,
          animationDelay: "1s",
          transform: `translateY(${scrollPosition * -0.15}px)`,
        }}
      />

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            bgcolor: "white",
            opacity: 0.6,
            animation: `${sparkleAnim} ${s.duration} ease-in-out infinite`,
            animationDelay: s.delay,
            zIndex: 0,
          }}
        />
      ))}

      {/* HEADER */}
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

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                href="/signin"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  px: 3,
                  "&:hover": { borderColor: "#fcd34d", color: "#fcd34d" },
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                href="/signup"
                variant="contained"
                endIcon={<ArrowRight />}
                sx={{
                  px: 3,
                  background: "linear-gradient(90deg,#7c3aed,#f59e0b)",
                  backgroundSize: "200% 200%",
                  animation: `${gradientShift} 8s ease infinite`,
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
          <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleMenuClose} component={Link} href="/signin">Sign In</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} href="/signup">Sign Up</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* HERO */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <Typography
  variant="h2"
  fontWeight="bold"
  sx={{
    mb: 3,
    mt: { xs: 4, md: 0 }, // Added responsive top margin
    fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }, // Added responsive font size
    background: "linear-gradient(90deg,#fcd34d,#a78bfa,#60a5fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${textReveal} 1s ease-out forwards`,
  }}
>
  Your Books, Your Journey — Organized Like Never Before
</Typography>

<Typography
  variant="h6"
  sx={{ mb: 5, color: "rgba(255,255,255,0.85)", maxWidth: "700px", mx: "auto" }}
>
  ShelfIt is the modern reader’s digital library. Effortlessly organize your collection,
  track your progress, and discover new stories that inspire you — all in one beautiful app.
</Typography>

{/* Lottie Animation */}
<Box sx={{
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  mb: 4,
  transform: `translateY(${scrollPosition * 0.1}px)`,
}}>
  <DotLottieReact
    src="https://lottie.host/11fe6c73-c822-46b8-8083-5f753e27176b/WwmCMmIrzw.lottie"
    loop
    autoplay
    style={{ width: '100%', height: '100%' }}
  />
</Box>

<Button
  component={Link}
  href="/signup"
  variant="contained"
  size="large"
  endIcon={<ArrowRight />}
  sx={{
    px: 4,
    py: 1.5,
    background: "linear-gradient(90deg,#7c3aed,#f59e0b)",
    backgroundSize: "200% 200%",
    animation: `${gradientShift} 12s ease infinite`,
    color: "white",
    fontWeight: "bold",
    mb: 4,
    "&:hover": { opacity: 0.9 },
  }}
>
  Start Your Free Library
</Button>

{/* Feature Highlights */}
<Stack direction="row" spacing={6} justifyContent="center" sx={{ mt: 4 }}>
  <Stack alignItems="center" spacing={1} sx={{ maxWidth: 200 }}>
    <Book sx={{ fontSize: 32, color: "#fcd34d" }} />
    <Typography color="white" fontWeight="bold">Organize</Typography>
    <Typography color="rgba(255,255,255,0.7)" fontSize="0.9rem">
      Build custom shelves, tag your books, and keep every story where it belongs.
    </Typography>
  </Stack>
  <Stack alignItems="center" spacing={1} sx={{ maxWidth: 200 }}>
    <BarChart sx={{ fontSize: 32, color: "#60a5fa" }} />
    <Typography color="white" fontWeight="bold">Track</Typography>
    <Typography color="rgba(255,255,255,0.7)" fontSize="0.9rem">
      Visualize your reading journey with goals, streaks, and milestones.
    </Typography>
  </Stack>
  <Stack alignItems="center" spacing={1} sx={{ maxWidth: 200 }}>
    <Search sx={{ fontSize: 32, color: "#a78bfa" }} />
    <Typography color="white" fontWeight="bold">Discover</Typography>
    <Typography color="rgba(255,255,255,0.7)" fontSize="0.9rem">
      Get smart recommendations and uncover books you’ll love instantly.
    </Typography>
  </Stack>
</Stack>

      </Container>
    </Box>
  );
}
