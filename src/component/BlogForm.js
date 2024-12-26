import React, { useState } from "react";
import "./blogform.css"; // Ensure CSS is imported

const BlogForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [content, setContent] = useState(initialData.content || []);

  const handleAddContent = () => {
    setContent([...content, { heading: "", paragraph: "", imageUrl: "" }]);
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...content];
    updatedContent[index][field] = value;
    setContent(updatedContent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, content });

    // Reset the form state to clear the content after submission
    setTitle("");
    setAuthor("");
    setContent([]);
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form-container">
      <h2>{initialData._id ? "Update Blog" : "Create Blog"}</h2>
      <label>
        Title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <br />
      <label>
        Author:
        <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </label>
      <br />
      <h3>Content:</h3>
      {content.map((section, index) => (
        <div key={index} className="content-section">
          <label>
            Heading:
            <input
              value={section.heading}
              onChange={(e) => handleContentChange(index, "heading", e.target.value)}
            />
          </label>
          <br />
          <label>
            Paragraph:
            <textarea
              value={section.paragraph}
              onChange={(e) => handleContentChange(index, "paragraph", e.target.value)}
              required
            ></textarea>
          </label>
          <br />
          <label>
            Image URL:
            <input
              value={section.imageUrl}
              onChange={(e) => handleContentChange(index, "imageUrl", e.target.value)}
            />
          </label>
          <hr />
        </div>
      ))}
      <button type="button" onClick={handleAddContent}>
        Add Section
      </button>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;
