import React, { useState } from "react";
import './bloglist.css';

const BlogList = ({ blogs, onDelete, onUpdate }) => {
  const [activeBlogId, setActiveBlogId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedBlog, setEditedBlog] = useState({
    title: '',
    author: '',
    content: [],
  });

  const handleToggleContent = (blogId) => {
    if (activeBlogId === blogId && editMode) {
      return; // Prevent toggling when in edit mode
    }
    setActiveBlogId((prevId) => (prevId === blogId ? null : blogId));
    setEditMode(false); // Exit edit mode when toggling
  };

  const handleEditClick = (e, blog) => {
    e.stopPropagation(); // Prevent triggering the parent container's click
    setEditMode(true);
    setEditedBlog({
      title: blog.title,
      author: blog.author,
      content: blog.content || [],
    });
    setActiveBlogId(blog._id);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...editedBlog.content];
    updatedContent[index] = { ...updatedContent[index], [field]: value };
    setEditedBlog((prev) => ({ ...prev, content: updatedContent }));
  };

  const handleAddContentSection = () => {
    setEditedBlog((prev) => ({
      ...prev,
      content: [...prev.content, { heading: '', paragraph: '', imageUrl: '' }],
    }));
  };

  const handleRemoveContentSection = (index) => {
    const updatedContent = editedBlog.content.filter((_, i) => i !== index);
    setEditedBlog((prev) => ({ ...prev, content: updatedContent }));
  };

  const handleUpdateBlog = (e, blogId) => {
    e.stopPropagation(); // Prevent triggering the parent container's click
    onUpdate(blogId, editedBlog);
    setEditMode(false);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation(); // Prevent triggering the parent container's click
    setEditMode(false);
  };

  return (
    <div className="blog-list-container">
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="blog-item"
          onClick={() => handleToggleContent(blog._id)}
        >
          <div className="thumbnail">
            <h3>{blog.title}</h3>
            <p>Author: {blog.author}</p>
            <p className="date">
              Published on:{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {!editMode && (
              <button
                onClick={(e) => handleEditClick(e, blog)}
              >
                Edit
              </button>
            )}
          </div>
          {editMode && activeBlogId === blog._id ? (
            <div className="edit-form" onClick={(e) => e.stopPropagation()}>
              <h4>Edit Blog</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editedBlog.title}
                  onChange={handleEditChange}
                />
                <label>Author:</label>
                <input
                  type="text"
                  name="author"
                  value={editedBlog.author}
                  onChange={handleEditChange}
                />
                <label>Content:</label>
                {editedBlog.content.map((section, index) => (
                  <div key={index} className="content-section">
                    <input
                      type="text"
                      placeholder="Heading"
                      value={section.heading}
                      onChange={(e) =>
                        handleContentChange(index, "heading", e.target.value)
                      }
                    />
                    <textarea
                      placeholder="Paragraph"
                      value={section.paragraph}
                      onChange={(e) =>
                        handleContentChange(index, "paragraph", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={section.imageUrl}
                      onChange={(e) =>
                        handleContentChange(index, "imageUrl", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveContentSection(index)}
                    >
                      Remove Section
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddContentSection}>
                  Add Section
                </button>
                <button
                  type="button"
                  onClick={(e) => handleUpdateBlog(e, blog._id)}
                >
                  Save Changes
                </button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div className={`content ${activeBlogId === blog._id ? "active" : ""}`}>
              {blog.content.map((section, index) => (
                <div key={index}>
                  <h4>{section.heading}</h4>
                  <p>{section.paragraph}</p>
                  {section.imageUrl && (
                    <img src={section.imageUrl} alt="Section" className="blog-image" />
                  )}
                </div>
              ))}
              <button onClick={() => onDelete(blog._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
