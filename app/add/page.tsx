
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Add, ArrowBack } from "@mui/icons-material"
import Link from "next/link"
import Navbar from "../components/layout/navbar";
import withAuth from "../hocs/withAuth";

export default withAuth(function AddBookPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.author || !form.genre) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        const errorMessage = await response.text()
        setError(errorMessage || "Failed to add book.")
      }
    } catch (err) {
      console.error("Error adding book:", err)
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "linear-gradient(135deg, #312e81, #1e1b4b)",
        color: "white",
      }}
    >
      <Navbar />

      <Container maxWidth="sm" sx={{ py: 4, flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            Add New Book
          </Typography>
          <Button
            component={Link}
            href="/dashboard"
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
          >
            Back to Dashboard
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={form.title}
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
              label="Author"
              name="author"
              value={form.author}
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
              label="Genre"
              name="genre"
              value={form.genre}
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

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Add />}
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
              {loading ? "Adding Book..." : "Add Book"}
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  )
})
