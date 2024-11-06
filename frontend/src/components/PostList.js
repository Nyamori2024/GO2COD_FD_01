import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { toast } from 'react-toastify';

const PostList = ({ posts, setPost, refreshPosts, formRef }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return; // If the user cancels, exit the function

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      refreshPosts();
      toast.success('Post deleted successfully!'); // Success toast
    } catch (error) {
      toast.error('Error deleting post.'); // Error toast
      console.error('Error deleting post:', error.message);
    }
  };

  const handleEdit = (post) => {
    setPost(post);
    formRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form
  };

  return (
    <Box>
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }} // Initial state for animation
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible when in view
          exit={{ opacity: 0, y: 20 }} // Exit animation
          transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered entrance
          viewport={{ once: false }} // Allow multiple triggers
        >
          <motion.div
            whileHover={{
              scale: 1.05, // Scale up on hover
              boxShadow: "0px 10px 20px rgba(0, 123, 255, 0.3)", // Add shadow
              backgroundColor: "rgba(0, 123, 255, 0.1)", // Change background color
              transition: { duration: 0.3 }, // Smooth transition
            }}
            whileTap={{ scale: 0.98 }} // Scale down on tap
          >
            <Card sx={{ marginBottom: 2, borderRadius: '8px', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>{post.body}</Typography>
                <Typography variant="caption" display="block" gutterBottom>{new Date(post.createdAt).toLocaleString()}</Typography>
                <Button variant="outlined" color="primary" onClick={() => handleEdit(post)} sx={{ marginRight: 1 }}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(post._id)}>Delete</Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </Box>
  );
};

export default PostList;