"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import MessageAlert from "./message-alert";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
} from "@mui/material"
import { Visibility, VisibilityOff, ArrowForward, Google } from "@mui/icons-material" 
import Link from "next/link"
import { signIn } from "next-auth/react"
import { login } from '../../lib/actions/auth'
 
export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // Removed useSearchParams()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError("Please enter both email and password")
      return
    }
    setLoading(true)
    setError("")

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      })

      if (res?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard") // redirect after success
      }
    } catch (err) {
      setError("An unexpected error occurred.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    await login()
    setLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)",
        color: "white",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Background Blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "15%sass",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.25)",
          filter: "blur(90px)",
          animation: "pulseGlow 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.2)",
          filter: "blur(100px)",
          animation: "pulseGlow 8s ease-in-out infinite",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 10 }}>
        <Box
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            sx={{
              mb: 1,
              background: "linear-gradient(90deg,#7c3aed,#f59e0b,#ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ShelfIt
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ mb: 4, color: "rgba(255,255,255,0.75)" }}
          >
            Welcome back! Sign in to continue your reading journey
          </Typography>

          <Suspense fallback={null}>
            <MessageAlert />
          </Suspense>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                variant="outlined"
                InputProps={{
                  style: { color: "white", borderRadius: "12px" },
                }}
                InputLabelProps={{
                  style: { color: "rgba(255,255,255,0.7)" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#f59e0b" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7c3aed",
                      boxShadow: "0 0 8px rgba(124,58,237,0.5)",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                variant="outlined"
                InputProps={{
                  style: { color: "white", borderRadius: "12px" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { color: "rgba(255,255,255,0.7)" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#f59e0b" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7c3aed",
                      boxShadow: "0 0 8px rgba(124,58,237,0.5)",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                endIcon={<ArrowForward />}
                sx={{
                  mt: 1,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg,#7c3aed,#f59e0b,#ec4899)",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 8s ease infinite",
                  "&:hover": { opacity: 0.9 },
                  "&.Mui-disabled": {
                    background: "rgba(255, 255, 255, 0.12)",
                  },
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Stack>
          </form>

          {/* Divider */}
          <Divider
            sx={{
              my: 3,
              borderColor: "rgba(255,255,255,0.2)",
              "&::before,&::after": { borderColor: "rgba(255,255,255,0.2)" },
            }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>or</Typography>
          </Divider>

          {/* Google Login */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            startIcon={<Google />}
            disabled={loading}
            sx={{
              py: 1.4,
              borderRadius: "12px",
              fontWeight: "600",
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              "&:hover": {
                borderColor: "#f59e0b",
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            {loading ? "Signing In..." : "Sign in with Google"}
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mt: 3, color: "rgba(255,255,255,0.7)" }}
          >
            Don’t have an account?{" "}
            <Link href="/signup" style={{ color: "#f59e0b", fontWeight: "600" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}