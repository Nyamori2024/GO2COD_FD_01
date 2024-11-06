import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import LoadingSpinner from './components/LoadingSpinner'; // Import the LoadingSpinner
import { Button, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useTheme } from './ThemeContext'; // Import the useTheme hook
import { motion } from 'framer-motion'; // Import motion from framer-motion

const App = () => {
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State for the post being edited
  const [loading, setLoading] = useState(true); // Loading state
  const formRef = useRef(null); // Create a ref for the PostForm

  const fetchPosts = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch('/api/posts'); // Use Fetch API to fetch posts
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json(); // Parse JSON response
      console.log('Fetched Posts:', data); // Log the fetched posts
      setPosts(data); // Set the posts state
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize styles */}
      <motion.div
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ duration: 0.5 }} // Duration of the transition
        style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}
      >
        <h1 style={{ textAlign: 'center' }}>Blog Platform</h1>
        <Button variant="contained" onClick={toggleTheme} style={{ marginBottom: '20px' }}>
          Toggle to {theme.palette.mode === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
        
        <PostForm ref={formRef} refreshPosts={fetchPosts} post={selectedPost} setPost={setSelectedPost} />

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <LoadingSpinner /> {/* Show loading spinner while fetching */}
            <p>Loading posts...</p>
          </div>
        ) : (
          <PostList
            posts={posts}
            setPost={setSelectedPost}
            refreshPosts={fetchPosts}
            formRef={formRef}
          />
        )}
        
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
      </motion.div>
    </MuiThemeProvider>
  );
};

export default App;