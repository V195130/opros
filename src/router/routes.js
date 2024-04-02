const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/UniqArticle/:id_test",
        props: true,
        component: () => import("pages/UniqArticle.vue"),
      },
      {
        path: "/UniqTesting/:id_test",
        props: true,
        component: () => import("pages/UniqTesting.vue"),
      },
      {
        path: "/TestingControl/:id_test",
        props: true,
        component: () => import("pages/TestingControl.vue"),
      },
      {
        path: "/ListArticles",
        component: () => import("pages/ListArticles.vue"),
      },
      {
        path: "/Admin/ListLogins/:id_user",
        props: true,
        component: () => import("pages/Admin/ListLogins.vue"),
      },
      {
        path: "/Admin/ListQuestions/:id_test",
        props: true,
        component: () => import("pages/Admin/ListQuestions.vue"),
      },
      {
        path: "/Admin/ListSections",
        props: true,
        component: () => import("pages/Admin/ListSections.vue"),
      },
      {
        path: "/Admin/AdminUsers",
        component: () => import("pages/Admin/AdminUsers.vue"),
      },
      {
        path: "/Admin/ListResults/:id_user",
        props: true,
        component: () => import("pages/Admin/ListResults.vue"),
      },
      {
        path: "/ListURL",
        component: () => import("pages/ListURL.vue"),
      },
      {
        path: "/Admin/AdminArticles",
        component: () => import("pages/Admin/AdminArticles.vue"),
      },
      {
        path: "/SignUp",
        component: () => import("pages/SignUp.vue"),
      },
      { path: "/LoginUser", component: () => import("pages/LoginUser.vue") },
      { path: "/AboutMe", component: () => import("pages/AboutMe.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
