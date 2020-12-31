import React from 'react';
import DocumentMeta from 'react-document-meta';

const NotFound = () => {
    const meta = {
        meta: {
            property: {
                'og:title': "oxypomme's not found",
                'og:url': "https://oxypomme.github.io/",
            }
        },
    }

    return (
        <DocumentMeta {...meta}>
            <h1>404</h1>
            <p>Page not found</p>
        </DocumentMeta>
    );
}

export default NotFound;