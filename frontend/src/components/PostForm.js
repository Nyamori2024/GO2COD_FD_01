import React, { useState, useEffect, forwardRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';

const PostForm = forwardRef(({ refreshPosts, post, setPost }, ref) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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

    // Check if title or body is empty
    if (!title.trim() || !body.trim()) {
      alert("Both title and body fields are required."); // Alert user
      return; // Exit the function if validation fails
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

  // Determine button text based on whether we are editing and if the form is empty
  const buttonText = post && (title || body) ? 'Update' : 'Submit';

  return (
    <Box ref={ref} component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" variant="outlined" />
      <TextField label="Body" value={body} onChange={(e) => setBody(e.target.value)} fullWidth margin="normal" multiline rows={4} variant="outlined" />
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        {buttonText}
      </Button>
    </Box>
  );
});

export default PostForm;