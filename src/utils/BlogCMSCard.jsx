
import { Link } from 'react-router-dom';

const BlogCMSCard = ({ blog }) => {
  return (
    <Link to={`/cms/blogs/${blog?._id}`} className="block">
      <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden">
        <img
          src={blog?.coverImage}
          alt={blog?.mainHeading}
          className="w-full h-48 object-contain object-center"
        />
        <div className="p-4 space-y-2">
          <h2 className="text-[#001330] font-semibold text-lg truncate">{blog?.mainHeading}</h2>
          <p className="text-[#47216b] text-sm">{blog?.author}</p>
          <p className="text-[#b4b4b4] text-sm line-clamp-2">{blog?.description}</p>
          <div className="flex justify-between items-center text-xs text-[#001330] pt-2">
            <span>{new Date(blog?.publishedAt).toLocaleDateString()}</span>
            <span>{blog?.readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCMSCard;
