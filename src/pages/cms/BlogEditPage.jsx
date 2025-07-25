// pages/cms/BlogEditPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/get-blog/${id}`)
      .then(res => setBlog(res.data.blog))
      .catch(err => console.error(err));
  }, [id]);

  const handleInputChange = (field, value) => {
    setBlog(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...blog.sections];
    updatedSections[index][field] = value;
    setBlog(prev => ({ ...prev, sections: updatedSections }));
  };

  const handleBlockChange = (sectionIdx, blockIdx, field, value) => {
    const updated = [...blog.sections];
    updated[sectionIdx].contentBlocks[blockIdx][field] = value;
    setBlog(prev => ({ ...prev, sections: updated }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/blogs/update/${id}`, blog);
      setLoading(false);
      alert("Blog updated successfully!");
      navigate("/cms/blogs");
    } catch (err) {
      console.error(err);
      alert("Update failed!");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/delete-blog/${id}`);
      alert("Blog deleted successfully!");
      navigate("/cms/blogs");
    } catch (err) {
      console.error(err);
      alert("Deletion failed!");
    }
  };

  if (!blog) return <div className="text-center text-[#001330] mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-[#001330] rounded-lg">
      <h1 className="text-3xl font-bold text-[#47216b] mb-4">Edit Blog</h1>

      {/* Main Fields */}
      <input value={blog.mainHeading} onChange={(e) => handleInputChange("mainHeading", e.target.value)} placeholder="Main Heading" className="w-full border mb-4 p-2" />
      <input value={blog.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Short Description" className="w-full border mb-4 p-2" />
      <input value={blog.author} onChange={(e) => handleInputChange("author", e.target.value)} placeholder="Author" className="w-full border mb-4 p-2" />
      <input value={blog.coverImage} onChange={(e) => handleInputChange("coverImage", e.target.value)} placeholder="Cover Image URL" className="w-full border mb-4 p-2" />

      {/* Sections */}
      {blog.sections.map((section, i) => (
        <div key={i} className="bg-[#f9f9f9] p-4 rounded mb-6">
          <input value={section.subheading} onChange={(e) => handleSectionChange(i, "subheading", e.target.value)} placeholder="Subheading" className="w-full border mb-2 p-2 font-semibold" />

          {section.contentBlocks.map((block, j) => (
            <div key={j} className="mb-4">
              <select
                value={block.type}
                onChange={(e) => handleBlockChange(i, j, "type", e.target.value)}
                className="mb-2 p-2 border"
              >
                <option value="paragraph">Paragraph</option>
                <option value="bullet">Bullet</option>
                <option value="image">Image</option>
              </select>

              {block.type === "paragraph" && (
                <textarea
                  value={block.content}
                  onChange={(e) => handleBlockChange(i, j, "content", e.target.value)}
                  className="w-full border p-2"
                  placeholder="Paragraph content"
                />
              )}

              {block.type === "bullet" && (
                <textarea
                  value={block.bullets?.join("\n")}
                  onChange={(e) =>
                    handleBlockChange(i, j, "bullets", e.target.value.split("\n"))
                  }
                  className="w-full border p-2"
                  placeholder="One bullet per line"
                />
              )}

              {block.type === "image" && (
                <input
                  value={block.imageUrl}
                  onChange={(e) =>
                    handleBlockChange(i, j, "imageUrl", e.target.value)
                  }
                  className="w-full border p-2"
                  placeholder="Image URL"
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Conclusion */}
      <textarea value={blog.conclusion} onChange={(e) => handleInputChange("conclusion", e.target.value)} placeholder="Conclusion" className="w-full border mb-4 p-2" />

      {/* Buttons */}
      <div className="flex gap-4">
        <button onClick={handleUpdate} className="bg-[#47216b] text-white px-4 py-2 rounded hover:bg-[#34104d]">
          {loading ? "Updating..." : "Update Blog"}
        </button>
        <button onClick={() => setShowConfirm(true)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Delete Blog
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4 text-[#47216b]">Confirm Deletion</h2>
            <p className="mb-4 text-[#001330]">Are you sure you want to delete this blog?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditPage;
