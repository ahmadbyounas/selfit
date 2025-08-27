

"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
   IconButton,
  Stack,
  TextField,
  Skeleton, // Added Skeleton import
} from "@mui/material"
import { Book, Add, Delete, Search, Edit } from "@mui/icons-material"
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
    const previousBooks = books; // Save current state for rollback

    try {
      // Optimistically remove the book from the UI
      setBooks(books.filter((book) => book.id !== bookToDeleteId));

      const response = await fetch(`/api/books/${bookToDeleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // If API call fails, revert the UI change
        setBooks(previousBooks);
        throw new Error("Failed to delete book");
      }
      // If successful, no need to re-fetch, UI is already updated
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Failed to delete book. Please try again.");
    } finally {
      setLoading(false);
      setBookToDeleteId(null); // Clear the ID after deletion attempt
    }
  };

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        height:"100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "linear-gradient(135deg, #312e81, #1e1b4b)",
        color: "white",
        overflow: "hidden", // Add this to prevent main page scroll
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
      <Container sx={{ flex: 1, pb: 6, display: "flex", flexDirection: "column", minHeight: 0, maxHeight: "calc(100vh - 362px)", overflowY: "auto" }}>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
            {[...Array(3)].map((_, index) => (
              <Card
                key={index}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
                  <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
                  <Box>
                    <Skeleton variant="text" width={150} height={24} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
                    <Skeleton variant="text" width={200} height={18} sx={{ bgcolor: "rgba(255,255,255,0.15)" }} />
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
                  <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
                </Stack>
              </Card>
            ))}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                // flex: 1, // Removed flex:1
                overflowY: "auto",
                minHeight: 0, // Allow it to shrink and scroll
                p: 2, // Add some padding-bottom for the last item
              }}
            >
              {books.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ boxShadow: "0 0 25px rgba(255,255,255,0.3)" }} // Subtle white glow
                  whileTap={{ scale: 0.95, y: 2 }} // Click/tap animation
                  style={{ borderRadius: 24 }} // borderRadius 3 = 24px in MUI theme
                >
                  <Card
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center", // Align items vertically in the center
                      borderRadius: 3,
                      bgcolor: "rgba(255,255,255,0.08)", // Slightly less opaque for glassmorphism
                      border: "1px solid rgba(255,255,255,0.1)", // Thinner, less opaque border
                      backdropFilter: "blur(10px)", // Glassmorphism blur effect
                      transition: "0.3s", // Keep existing transition for smooth changes
                      // Removed old hover styles as framer-motion handles them
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
                      <Book sx={{ fontSize: 32, color: "#fcd34d" }} /> {/* Book Icon */}
                      <Box>
                        <Typography fontWeight="600" sx={{ color: "white" }}>
                          {book.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.75, color: "#e5e7eb" }}>
                          {book.author} - {book.genre} {/* Display genre here */}
                        </Typography>
                      </Box>
                    </Stack>
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
                        aria-label="edit"
                        component={Link}
                        href={`/edit/${book.id}`}
                        size="small"
                        sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "#f59e0b" } }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
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