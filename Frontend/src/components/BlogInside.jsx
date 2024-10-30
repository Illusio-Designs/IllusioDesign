import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet';
import { getPublicBlogByTitle } from '../utils/api';
import { API_IMAGE_BASE_URL } from '../config';

const BlogInside = () => {
    const { title } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFullImageUrl = (imageName) => {
        if (!imageName) return '';
        if (imageName.startsWith('http')) return imageName;
        return `${API_IMAGE_BASE_URL}/blog/${imageName}`;
    };

    const decodeBlogTitle = (encodedTitle) => decodeURIComponent(encodedTitle.replace(/-/g, ' '));

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const decodedTitle = decodeBlogTitle(title);
                const data = await getPublicBlogByTitle(decodedTitle);
                if (!data) throw new Error('Blog not found');
                
                console.log("Fetched blog data:", data); // Log the data to check if publish_date is present
                setBlog(data);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to fetch blog details.');
            } finally {
                setLoading(false);
            }
        };
    
        if (title) fetchBlog();
    }, [title]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
                    <div className="text-red-500 text-center p-8">
                        <h2 className="text-2xl font-bold mb-2">Error</h2>
                        <p>{error}</p>
                        <button
                            onClick={() => navigate('/blog')}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Return to Blog List
                        </button>
                    </div>
                </div>
            </>
        );
    }

    if (!blog) {
        return (
            <>
                <Header />
                <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
                    <div className="text-center p-8">
                        <h2 className="text-2xl font-bold mb-2">Blog Not Found</h2>
                        <p>The blog you're looking for doesn't exist.</p>
                        <button
                            onClick={() => navigate('/blog')}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Return to Blog List
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const formattedDate = blog.publish_date && !isNaN(Date.parse(blog.publish_date))
    ? new Date(blog.publish_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      })
    : 'Date unavailable';
    return (
        <>
            <Helmet>
                <title>{blog.title} | My Blog</title>
                <meta name="description" content={blog.meta_description} />
                <meta name="keywords" content={blog.keywords} />
                <link rel="canonical" href={blog.canonical_url || window.location.href} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.meta_description} />
                <meta property="og:image" content={getFullImageUrl(blog.image)} />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={blog.meta_description} />
                <meta name="twitter:image" content={getFullImageUrl(blog.image)} />
            </Helmet>

            <Header />
            <article className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-600">
                        <time dateTime={blog.publish_date}>{formattedDate}</time>
                        {blog.author && <span>by {blog.author}</span>}
                        {blog.category && <span>in {blog.category}</span>}
                    </div>
                </header>

                {blog.image && (
                    <div className="mb-8">
                        <img
                            src={getFullImageUrl(blog.image)}
                            alt={blog.image_alt_text || blog.title}
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                )}

                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog.content)
                    }}
                />

                {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                    <div className="mt-8 pt-4 border-t">
                        <h2 className="text-xl font-semibold mb-2">Tags:</h2>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </>
    );
};

export default BlogInside;
