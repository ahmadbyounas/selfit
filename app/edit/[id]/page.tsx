
"use client"

import { useEffect, useState } from "react"

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
import { Save, ArrowBack } from "@mui/icons-material"
import Link from "next/link"
import Navbar from "../../components/layout/navbar";
import withAuth from "../../hocs/withAuth";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
}

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default withAuth(function EditBookPage({ params }: EditBookPageProps) {
  const { id } = params;
  const [form, setForm] = useState<Book>({
    id: "",
    title: "",
    author: "",
    genre: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details.");
        }
        const data: Book = await response.json();
        setForm(data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.genre) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSuccess("Book updated successfully!");
        // Optionally redirect after a short delay
        // setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to update book.");
      }
    } catch (err) {
      console.error("Error updating book:", err);
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #312e81, #1e1b4b)', color: 'white' }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (error && !form.id) { // Only show full error if book couldn't be loaded at all
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #312e81, #1e1b4b)', color: 'white' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button component={Link} href="/dashboard" startIcon={<ArrowBack />} variant="outlined" sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
          Back to Dashboard
        </Button>
      </Box>
    );
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
            Edit Book
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
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Save />}
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
              {submitting ? "Saving Changes..." : "Save Changes"}
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
})
