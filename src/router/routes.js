const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/TestDNS",
        props: true,
        component: () => import("pages/TestDNS.vue"),
      },
      {
        path: "/Articles/ArticleDNS",
        component: () => import("pages/Articles/ArticleDNS.vue"),
      },
      {
        path: "/Articles/LocalNetwork",
        component: () => import("pages/Articles/LocalNetwork.vue"),
      },
      {
        path: "/Articles/JavaScript",
        component: () => import("pages/Articles/JavaScript.vue"),
      },
      {
        path: "/Articles/Internet",
        component: () => import("pages/Articles/AboutInternet.vue"),
      },
      {
        path: "/Articles/Modem",
        component: () => import("pages/Articles/Modem.vue"),
      },
      {
        path: "/Articles/ConnectingCables",
        component: () => import("pages/Articles/ConnectingCables.vue"),
      },
      {
        path: "/Articles/Server",
        component: () => import("pages/Articles/Server.vue"),
      },
      {
        path: "/Articles/Protokol",
        component: () => import("pages/Articles/Protokol.vue"),
      },
      {
        path: "/Articles/NetworkAdapters",
        component: () => import("pages/Articles/NetworkAdapters.vue"),
      },
      {
        path: "/Articles/ProgramWorkInNetwork",
        component: () => import("pages/Articles/ProgramWorkInNetwork.vue"),
      },
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
        path: "/Admin/ListLogins",
        component: () => import("pages/Admin/ListLogins.vue"),
      },
      {
        path: "/Admin/AdminArticles",
        component: () => import("pages/Admin/AdminArticles.vue"),
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
