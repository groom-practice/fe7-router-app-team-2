import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import EditPost from "../pages/EditPost";
import Layout from "../layout/Layout";
import Bookmark from "../pages/Bookmark";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts", element: <PostList /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "bookmark", element: <Bookmark /> },
    ],
  },
]);

export default router;
