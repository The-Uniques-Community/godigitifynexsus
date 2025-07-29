import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CMSLayout from "../layouts/CMSLayout";
import SimpleProtectedRoute from "../components/SimpleProtectedRoute";

// Public pages
import Home from "../pages/home";
import AboutPage from "../pages/about";
import Contact from "../pages/contact";
import Blog from "../pages/blog/Blog";
import BlogDetail from "../pages/blog/BlogDetail";
import DBA from "../pages/dba/index.jsx"
import CustomSolution from "../pages/custom-solutions/index"
import OurProduct from "../pages/our-products/index"
import DbaDetailPage from "../pages/dba/dbaDetail.jsx";

// Auth pages
import AdminLogin from "../pages/auth/AdminLogin";

// CMS pages (you can create these later)
import CMSBlogs from "../pages/cms/CMSBlogs";
import CMSAllBlogs from "../pages/cms/CMSAllBlogs";
import CMSContact from "../pages/cms/CMSContact";
import CMSQueryDetail from "../pages/cms/CMSQueryDetail";
import CMSQueryResponse from "../pages/cms/CMSQueryResponse";
import CMSServices from "../pages/cms/CMSServices";
import BlogEditPage from "../pages/cms/BlogEditPage";
import BlogDetailPage from "../pages/cms/BlogDetailPage";



const CMSDashboard = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
    <p className="text-center lg:text-7xl md:text-5xl text-4xl text-slate-300 font-bold py-16">Coming Soon</p>
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
        path: "/services/dba/:slug",
        element: <DbaDetailPage />,
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
    path: "/auth",
    element: <AdminLogin />
  },
  {
      path: "/cms",
      element: (
      <SimpleProtectedRoute>
        <CMSLayout />
      </SimpleProtectedRoute>
    ),
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
      path: "query/:id",
      element: <CMSQueryDetail />
    },
    {
      path: "query/:id/respond",
      element: <CMSQueryResponse />
    },
    {
        path: "blogs",
        element: <CMSBlogs />,
      },
      {
      path: "all-blogs",
      element: <CMSAllBlogs />
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
