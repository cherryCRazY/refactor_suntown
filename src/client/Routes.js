import Loadable from "react-loadable";
import React from "react";

//Styles
import "./Styles/reset.css";
import "./Styles/App.css";
import "./Styles/style.css";

//loadData
import { loadDataMain } from "./components/Main";
import { loadDataAboutUs } from "./pages/AboutUsPage";
import { loadDataPortfolio } from "./pages/PortfolioPage";
import { loadDataProducts } from "./pages/ProductsPage";
import { loadDataContacts } from "./pages/ContactsPage";

import NewsPage from "./pages/News/NewsPage";
import { loadDataNewsView } from "./pages/News/OneNewsPage";

const loading = () => <div>Loading...</div>;

export default [
    {
        loadData: loadDataMain,
        component: Loadable({
            loader: () => import("./pages/HomePage"),
            loading
        }),
        exact: true,
        path: "/"
    },
    {
        loadData: loadDataMain,
        component: Loadable({
            loader: () => import("./pages/HomePage"),
            loading
        }),
        exact: true,
        path: "/ua"
    },
    {
        loadData: loadDataAboutUs,
        component: Loadable({
            loader: () => import("./pages/AboutUsPage"),
            loading
        }),
        exact: true,
        path: "/about-us"
    },
    {
        loadData: loadDataAboutUs,
        component: Loadable({
            loader: () => import("./pages/AboutUsPage"),
            loading
        }),
        exact: true,
        path: "/ua/about-us"
    },
    {
        loadData: loadDataPortfolio,
        component: Loadable({
            loader: () => import("./pages/PortfolioPage"),
            loading
        }),
        exact: true,
        path: "/portfolio"
    },
    {
        loadData: loadDataPortfolio,
        component: Loadable({
            loader: () => import("./pages/PortfolioPage"),
            loading
        }),
        exact: true,
        path: "/ua/portfolio"
    },
    {
        loadData: loadDataProducts,
        component: Loadable({
            loader: () => import("./pages/ProductsPage"),
            loading
        }),
        exact: true,
        path: "/products"
    },
    {
        loadData: loadDataProducts,
        component: Loadable({
            loader: () => import("./pages/ProductsPage"),
            loading
        }),
        exact: true,
        path: "/ua/products"
    },
    {
        ...NewsPage,
        exact: true,
        path: "/news"
    },
    {
        ...NewsPage,
        exact: true,
        path: "/ua/news"
    },
    {
        loadData: loadDataNewsView,
        component: Loadable({
            loader: () => import("./pages/News/OneNewsPage"),
            loading
        }),
        exact: true,
        path: "/post/:url"
    },
    {
        loadData: loadDataNewsView,
        component: Loadable({
            loader: () => import("./pages/News/OneNewsPage"),
            loading
        }),
        exact: true,
        path: "/ua/post/:url"
    },
    {
        loadData: loadDataNewsView,
        component: Loadable({
            loader: () => import("./pages/News/OneNewsPage"),
            loading
        }),
        exact: true,
        path: "/news-view"
    },
    {
        loadData: loadDataNewsView,
        component: Loadable({
            loader: () => import("./pages/News/OneNewsPage"),
            loading
        }),
        exact: true,
        path: "/ua/news-view"
    },
    {
        loadData: loadDataContacts,
        component: Loadable({
            loader: () => import("./pages/ContactsPage"),
            loading
        }),
        exact: true,
        path: "/contacts"
    },
    {
        loadData: loadDataContacts,
        component: Loadable({
            loader: () => import("./pages/ContactsPage"),
            loading
        }),
        exact: true,
        path: "/ua/contacts"
    },
    {
        component: Loadable({
            loader: () => import("./pages/FormPage"),
            loading
        }),
        exact: true,
        path: "/form"
    },
    {
        component: Loadable({
            loader: () => import("./pages/FormPage"),
            loading
        }),
        exact: true,
        path: "/ua/form"
    },
    {
        component: Loadable({
            loader: () => import("./pages/CancelSubscriptionPage"),
            loading
        }),
        exact: true,
        path: "/cancel-subscription"
    },
    {
        component: Loadable({
            loader: () => import("./pages/CancelSubscriptionPage"),
            loading
        }),
        exact: true,
        path: "/newsletter/unsubscribe"
    },
    {
        component: Loadable({
            loader: () => import("./pages/SubscribeSuccessPage"),
            loading
        }),
        exact: true,
        path: "/newsletter/verify"
    },
    {
        component: Loadable({
            loader: () => import("./pages/Admin/LoginPage"),
            loading
        }),
        exact: true,
        path: "/login"
    },
    {
        component: Loadable({
            loader: () => import("./pages/Admin/AdminContainer"),
            loading
        }),
        exact: true,
        path: "/admin"
    },
    {
        component: Loadable({
            loader: () => import("./pages/NotFoundPage"),
            loading
        }),
        path: "*"
    }
];
