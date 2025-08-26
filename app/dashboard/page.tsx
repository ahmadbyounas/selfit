

"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material"
import { Book, Add, Delete, Search } from "@mui/icons-material"
import Navbar from "../components/layout/navbar";
import withAuth from "../hocs/withAuth";
import Link from "next/link";
import EmptyState from "../components/empty-state/empty-state";
import DeleteDialog from "../components/delete-dialog/delete-dialog";
import TotalBooksCard from "../components/dashboard/total-books-card"; // New import
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status?: "Reading" | "Completed" | "Want to Read"; // Explicitly define status types
  pagesRead?: number; // For Total Pages Read
  totalPages?: number; // For Total Pages Read
}

export default withAuth(function DashboardPage() {
  const { data } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState<string | null>(null);

  const fetchBooks = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = query ? `/api/books?query=${encodeURIComponent(query)}` : "/api/books";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchBooks(searchQuery);
    }, 500); // Debounce search input

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleDeleteClick = (bookId: string) => {
    setBookToDeleteId(bookId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setBookToDeleteId(null);
  };

  const confirmDelete = async () => {
    if (!bookToDeleteId) return;

    setOpenDeleteDialog(false); // Close dialog immediately
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/books/${bookToDeleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      fetchBooks(searchQuery);
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Failed to delete book. Please try again.");
    } finally {
      setLoading(false);
      setBookToDeleteId(null);
    }
  };

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
      {/* Header */}
      <Navbar />

      {/* Welcome Banner */}
      <Box
        sx={{
          py: 6,
          textAlign: "center",
          background: "linear-gradient(135deg,#7c3aed,#06b6d4,#f59e0b)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 8s ease infinite",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Welcome back, {data?.user?.name || "Reader"} 📚
        </Typography>
        <Typography sx={{ opacity: 0.9, mt: 1 }}>
          Your personal space to track and manage books.
        </Typography>
      </Box>

      {/* New Stats Section */}
      <Box sx={{ mt:1,mb: 4 }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <TotalBooksCard count={books.length} />
        </Box>
        {/* Placeholder for Daily Activity Chart */}
      </Box>

      {/* Books Section */}
      <Container sx={{ flex: 1, pb: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Your Books
          </Typography>
          <Button
            component={Link}
            href="/add"
            variant="contained"
            startIcon={<Add />}
            sx={{
              bgcolor: "#7c3aed",
              "&:hover": { bgcolor: "#6d28d9" },
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Add Book
          </Button>
        </Box>

        <TextField
          fullWidth
          label="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <Search sx={{ color: "rgba(255,255,255,0.7)", mr: 1 }} />
            ),
            style: { color: "white", borderRadius: "12px" },
          }}
          InputLabelProps={{
            style: { color: "rgba(255,255,255,0.7)" },
          }}
          sx={{
            mb: 3,
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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center" sx={{ mt: 4 }}>
            {error}
          </Typography>
        ) : books.length === 0 ? (
          <EmptyState
            message={searchQuery ? "No books found matching your search." : "You haven't added any books yet."}
          />
        ) : (
          <AnimatePresence>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {books.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: 3,
                      bgcolor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      transition: "0.3s",
                      "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                    border: "1px solid #7c3aed", // Add a subtle border glow
                  },
                    }}
                  >
                    <Box>
                      <Typography fontWeight="600" sx={{ color: "white" }}>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.75, color: "#e5e7eb" }}>
                        {book.author}
                      </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {/* Assuming status might be added later or derived */}
                      {book.status && (
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            color:
                              book.status === "Completed"
                                ? "#fbbf24"
                                : book.status === "Reading"
                                ? "#22d3ee"
                                : "#c084fc",
                          }}
                        >
                          {book.status}
                        </Typography>
                      )}
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(book.id)}
                        size="small"
                        sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "#ef4444" } }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </AnimatePresence>
        )}
      </Container>

      {/* Animations keyframes */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={confirmDelete}
        itemName="book"
      />
    </Box>
  )
})