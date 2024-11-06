import React, { useState, useEffect, forwardRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const PostForm = forwardRef(({ refreshPosts, post, setPost }, ref) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({ title: '', body: '' }); // State for error messages

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = { title: '', body: '' }; // Reset errors

    // Validate fields
    if (!title.trim()) {
      formErrors.title = 'Title is required'; // Set error message for title
    }
    if (!body.trim()) {
      formErrors.body = 'Details are required'; // Set error message for body
    }

    // If there are errors, update state and return
    if (formErrors.title || formErrors.body) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch(`/api/posts/${post ? post._id : ''}`, {
        method: post ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setTitle('');
      setBody('');
      setPost(null);
      refreshPosts();
      toast.success(post ? 'Post updated successfully!' : 'Post created successfully!'); // Success toast
    } catch (error) {
      toast.error('Failed to save the post.'); // Error toast
      console.error('Error saving post:', error.message);
    }
  };

  // Handle blur event to clear error messages
  const handleBlur = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  // Determine button text based on whether we are editing and if the form is empty
  const buttonText = post && (title || body) ? 'Update' : 'Submit';

  return (
    <motion.div
      ref={ref} 
      initial={{ opacity: 0, y: -20 }} // Initial state for animation
      animate={{ opacity: 1, y: 0 }} // Animate to visible
      exit={{ opacity: 0, y: -20 }} // Exit animation
      transition={{ duration: 0.5 }} // Duration of the transition
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            // Clear error on change
            if (errors.title) {
              setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
            }
          }}
          onBlur={() => handleBlur('title')} // Clear error on blur
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.title} // Show error state
          helperText={errors.title} // Display error message
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            // Clear error on change
            if (errors.body) {
              setErrors((prevErrors) => ({ ...prevErrors, body: '' }));
            }
          }}
          onBlur={() => handleBlur('body')} // Clear error on blur
          fullWidth
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          error={!!errors.body} // Show error state
          helperText={errors.body} // Display error message
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          {buttonText}
        </Button>
      </Box>
    </motion.div>
  );
});

export default PostForm;