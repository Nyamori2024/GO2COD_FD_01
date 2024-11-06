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
      {posts.map((post) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }} // Initial state for animation
          animate={{ opacity: 1, y: 0 }} // Animate to visible
          exit={{ opacity: 0, y: 20 }} // Exit animation
          transition={{ duration: 0.3 }} // Duration of the transition
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
      ))}
    </Box>
  );
};

export default PostList;