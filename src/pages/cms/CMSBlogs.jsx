import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCMSCard from '../../utils/BlogCMSCard';
import axios from 'axios';


const defaultBlock = { type: 'paragraph', content: '', bullets: [''], imageUrl: '' };

const defaultSection = {
  subheading: '',
  contentBlocks: [structuredClone(defaultBlock)],
};

const DynamicBlogForm = () => {
  const [form, setForm] = useState({
    mainHeading: '',
    description: '',
    author: '',
    coverImage: '',
    tags: [''],
    sections: [structuredClone(defaultSection)],
    conclusion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (i, value) => {
    const tags = [...form.tags];
    tags[i] = value;
    setForm(prev => ({ ...prev, tags }));
  };

  const addTag = () => setForm(prev => ({ ...prev, tags: [...prev.tags, ''] }));

  const addSection = () => {
    setForm(prev => ({
      ...prev,
      sections: [...prev.sections, structuredClone(defaultSection)]
    }));
  };

  const updateSection = (index, field, value) => {
    const updated = [...form.sections];
    updated[index][field] = value;
    setForm(prev => ({ ...prev, sections: updated }));
  };

  const addBlock = (sectionIndex) => {
    const sections = [...form.sections];
    sections[sectionIndex].contentBlocks.push(structuredClone(defaultBlock));
    setForm(prev => ({ ...prev, sections }));
  };

  const updateBlock = (sectionIndex, blockIndex, field, value) => {
    const sections = [...form.sections];
    sections[sectionIndex].contentBlocks[blockIndex][field] = value;
    setForm(prev => ({ ...prev, sections }));
  };

  const handleBulletChange = (sectionIdx, blockIdx, bulletIdx, value) => {
    const sections = [...form.sections];
    const bullets = sections[sectionIdx].contentBlocks[blockIdx].bullets;

    bullets[bulletIdx] = value;

    // Add new bullet on enter
    if (value && bulletIdx === bullets.length - 1) {
      bullets.push('');
    }

    // Remove empty bullet on backspace
    if (!value && bullets.length > 1 && bulletIdx !== bullets.length - 1) {
      bullets.splice(bulletIdx, 1);
    }

    setForm(prev => ({ ...prev, sections }));
  };

  return (
    <div className="p-10 bg-white text-[#001330] min-h-screen">
      <h1 className="text-3xl font-bold text-[#47216b] mb-6">Create Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" name="mainHeading" placeholder="Main Heading" value={form.mainHeading} onChange={handleChange} />
        <input className="input" name="author" placeholder="Author" value={form.author} onChange={handleChange} />
      </div>
      <textarea className="input" name="description" placeholder="Blog Description" value={form.description} onChange={handleChange} />
      <input className="input" name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} />

      {/* Tags */}
      <div className="mb-6">
        <label className="block font-medium text-[#001330]">Tags</label>
        <div className="flex flex-wrap gap-2">
          {form.tags.map((tag, i) => (
            <input key={i} className="input w-40" placeholder={`Tag ${i + 1}`} value={tag} onChange={(e) => handleTagChange(i, e.target.value)} />
          ))}
        </div>
        <button className="btn-secondary mt-2" onClick={addTag}>+ Add Tag</button>
      </div>

      {/* Sections */}
      <div>
        <h2 className="text-2xl text-[#47216b] font-semibold mb-2">Sections</h2>
        {form.sections.map((section, sIdx) => (
          <div key={sIdx} className="border border-[#b4b4b4] p-4 mb-6 rounded">
            <input
              className="input"
              placeholder="Subheading"
              value={section.subheading}
              onChange={(e) => updateSection(sIdx, 'subheading', e.target.value)}
            />

            {section.contentBlocks.map((block, bIdx) => (
              <div key={bIdx} className="bg-[#f8f8f8] p-3 rounded my-3">
                <select
                  className="input"
                  value={block.type}
                  onChange={(e) => updateBlock(sIdx, bIdx, 'type', e.target.value)}
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="bullet">Bullets</option>
                  <option value="image">Image</option>
                </select>

                {block.type === 'paragraph' && (
                  <textarea
                    className="input"
                    placeholder="Paragraph Content"
                    value={block.content}
                    onChange={(e) => updateBlock(sIdx, bIdx, 'content', e.target.value)}
                  />
                )}

                {block.type === 'bullet' && block.bullets.map((point, pIdx) => (
                  <input
                    key={pIdx}
                    className="input ml-2"
                    placeholder={`Bullet ${pIdx + 1}`}
                    value={point}
                    onChange={(e) => handleBulletChange(sIdx, bIdx, pIdx, e.target.value)}
                  />
                ))}

                {block.type === 'image' && (
                  <input
                    className="input"
                    placeholder="Image URL"
                    value={block.imageUrl}
                    onChange={(e) => updateBlock(sIdx, bIdx, 'imageUrl', e.target.value)}
                  />
                )}
              </div>
            ))}
            <button className="btn-secondary mt-2" onClick={() => addBlock(sIdx)}>+ Add Content Block</button>
          </div>
        ))}
        <button className="btn-primary mt-2" onClick={addSection}>+ Add Section</button>
      </div>

      {/* Conclusion */}
      <textarea className="input mt-6" name="conclusion" placeholder="Conclusion" value={form.conclusion} onChange={handleChange} />

      <button className="btn-primary mt-6">📝 Submit</button>
    </div>
  );
};



const CMSBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://godigitify-backend.vercel.app/api/blogs/get-all-blogs?page=1&limit=3')
      .then(res => setBlogs(res.data.blogs))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Blogs</h2>
        <Link 
          to="/cms/all-blogs"
          className='bg-purple-700 hover:bg-purple-800 transition-colors duration-200 rounded-md text-white px-4 py-2 flex items-center'
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Show All
        </Link>
      </div>
      <div className='grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1 mb-7 mt-5 py-5'>
        {blogs.map(blog => (
          <BlogCMSCard key={blog._id} blog={blog} />
        ))}
      </div>
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <DynamicBlogForm/>
        </div>
      </div>
    </div>
  );
};

export default CMSBlogs;
