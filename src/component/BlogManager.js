import React, { useState, useEffect } from "react";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import axios from "axios";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs from the API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://dholera-nagri-content-management-backend.onrender.com/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Handle create or update blog
  const handleCreateOrUpdateBlog = async (blogData) => {
    try {
      if (selectedBlog) {
        // Update the selected blog
        await axios.put(`https://dholera-nagri-content-management-backend.onrender.com/blogs/${selectedBlog._id}`, blogData);
        console.log("Blog updated successfully");
      } else {
        // Create a new blog
        await axios.post("https://dholera-nagri-content-management-backend.onrender.com/blogs", blogData);
        console.log("Blog created successfully");
      }
      fetchBlogs(); // Refresh the blog list
      setSelectedBlog(null); // Clear selection
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  // Handle update from BlogList
  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      await axios.put(`https://dholera-nagri-content-management-backend.onrender.com/blogs/${id}`, updatedBlog);
      console.log("Blog updated successfully");
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Handle delete blog
  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`https://dholera-nagri-content-management-backend.onrender.com/blogs/${id}`);
      console.log("Blog deleted successfully");
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handle edit blog
  const handleEditBlog = (blog) => {
    setSelectedBlog(blog); // Set the selected blog for editing
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blog Manager</h1>
      {/* Blog Form Component */}
      <BlogForm
        onSubmit={handleCreateOrUpdateBlog}
        initialData={selectedBlog || {}}
        onCancel={() => setSelectedBlog(null)} // Clear selection when canceled
      />
      {/* Blog List Component */}
      <BlogList
        blogs={blogs}
        onDelete={handleDeleteBlog}
        onUpdate={handleUpdateBlog} // Correct prop for updating blogs
        onEdit={handleEditBlog}
      />
    </div>
  );
};

export default BlogManager;
