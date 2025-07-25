import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CMSLayout from "../layouts/CMSLayout";

// Public pages
import Home from "../pages/home";
import AboutPage from "../pages/about";
import Contact from "../pages/contact";
import Blog from "../pages/blog/Blog";
import BlogDetail from "../pages/blog/BlogDetail";
import DBA from "../pages/dba/index"
import CustomSolution from "../pages/custom-solutions/index"
import OurProduct from "../pages/our-products/index"


// CMS pages (you can create these later)
import CMSBlogs from "../pages/cms/CMSBlogs";
import CMSContact from "../pages/cms/CMSContact";
import CMSServices from "../pages/cms/CMSServices";
import BlogEditPage from "../pages/cms/BlogEditPage";
import BlogDetailPage from "../pages/cms/BlogDetailPage";


const CMSDashboard = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Total Posts</h3>
        <p className="text-3xl font-bold text-blue-600">124</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
        <p className="text-3xl font-bold text-green-600">1,234</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Page Views</h3>
        <p className="text-3xl font-bold text-purple-600">12,456</p>
      </div>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/services/dba",
        element: <DBA />,
      },
      {
        path: "/solutions/our-products",
        element: <OurProduct />,
      },
      {
        path: "/solutions/custom-solutions",
        element: <CustomSolution />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: "/cms",
    element: <CMSLayout />,
    children: [
      {
        path: "",
        element: <CMSDashboard />,
      },
      {
        path: "dashboard",
        element: <CMSDashboard />,
      },
      {
        path: "manage-queries",
        element: <CMSContact />,
      },
      {
        path: "blogs",
        element: <CMSBlogs />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetailPage />,
      },
      {
        path: "blogs/:id/edit",
        element: <BlogEditPage />,
      },
      {
        path: "manage-services",
        element: <CMSServices />,
      },
    ],
  },
]);

export default router;
