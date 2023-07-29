import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTag = () => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>Mr. Singh's Pizza</title>
            <link rel="canonical" href="http://mrsinghspizza.com" />
            <link rel="apple-touch-icon" sizes="57x57" href="/images/logo/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/images/logo/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/images/logo/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/images/logo/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/images/logo/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/images/logo/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/images/logo/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/images/logo/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/images/logo/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/images/logo/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png" />
        </Helmet>
    )
}

export default MetaTag