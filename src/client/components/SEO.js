import React from "react";
import Helmet from "react-helmet/lib/Helmet";

const SEO = ({ title, url, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <link rel="canonical" href={url} />
            <meta name="description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta
                property="og:image"
                content="//suntown-ukraine.com/product/favicon.ico"
            />
            <meta
                property="og:image:secure_url"
                content="https://suntown-ukraine.com/product/favicon.ico"
            />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:site_name" content="Suntown-Ukraine" />
        </Helmet>
    );
};

export default SEO;
