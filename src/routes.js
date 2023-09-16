// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import Index from "views/Index.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Blogs from "views/pages/Blog/Blogs";
import BlogDetails from "views/pages/Blog/BlogDetails";
import BlogCreateEdit from "views/pages/Blog/BlogCreateEdit";
import Categories from "views/pages/Category/Categories";
import CategoryCreateEdit from "views/pages/Category/CategoryCreateEdit";
import TagCreateEdit from "views/pages/Tag/TagCreateEdit";
import Tags from "views/pages/Tag/Tags";
import Users from "views/pages/User/Users";
import UserCreateEdit from "views/pages/User/UserCreateEdit";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  // Category
  {
    path: "/category",
    name: "Categories",
    icon: "ni ni-books text-pink",
    component: <Categories />,
    layout: "/admin",
  },
  {
    path: "/category/create",
    icon: "ni ni-books text-pink",
    component: <CategoryCreateEdit />,
    layout: "/admin",
  },
  {
    path: "/category/:id/edit",
    icon: "ni ni-books text-pink",
    component: <CategoryCreateEdit />,
    layout: "/admin",
  },

  // Tag
  {
    path: "/tag",
    name: "Tags",
    icon: "ni ni-tag text-pink",
    component: <Tags />,
    layout: "/admin",
  },
  {
    path: "/tag/create",
    icon: "ni ni-tag text-pink",
    component: <TagCreateEdit />,
    layout: "/admin",
  },
  {
    path: "/tag/:id/edit",
    icon: "ni ni-tag-08 text-pink",
    component: <TagCreateEdit />,
    layout: "/admin",
  },
  // Blog
  {
    path: "/blogs",
    name: "Blogs",
    icon: "ni ni-world-2 text-pink",
    component: <Blogs />,
    layout: "/admin",
  },
  {
    path: "/blogs/:id/details",
    component: <BlogDetails />,
    layout: "/admin",
  },

  {
    path: "/blogs/:id/edit",
    icon: "ni ni-world-2 text-pink",
    component: <BlogCreateEdit />,
    layout: "/admin",
  },
  {
    path: "/blogs/create",
    icon: "ni ni-world-2 text-pink",
    component: <BlogCreateEdit />,
    layout: "/admin",
  },
  // User
  {
    path: "/user",
    name: "Users",
    icon: "ni ni-circle-08 text-pink",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/user/create",
    icon: "ni ni-circle-08 text-pink",
    component: <UserCreateEdit />,
    layout: "/admin",
  },
  {
    path: "/user/:id/edit",
    icon: "ni ni-circle-08 text-pink",
    component: <UserCreateEdit />,
    layout: "/admin",
  },
];
export default routes;
