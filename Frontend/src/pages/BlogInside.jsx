import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DOMPurify from 'dompurify';
import { getPublicBlogByTitle } from '../utils/api';
import { API_IMAGE_BASE_URL } from '../config';

const BlogInside = () => {
    const { title } = useParams(); // Get blog title from URL
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to construct full image URL
    const getFullImageUrl = (imageName) => {
        if (!imageName) return '';
        if (imageName.startsWith('http')) return imageName;
        return `${API_IMAGE_BASE_URL}/blog/${imageName}`;
    };

    // Helper function to decode URL-safe title
    const decodeBlogTitle = (encodedTitle) => {
        return decodeURIComponent(encodedTitle.replace(/-/g, ' '));
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const decodedTitle = decodeBlogTitle(title);
                const data = await getPublicBlogByTitle(decodedTitle);

                if (!data) {
                    throw new Error('Blog not found');
                }

                setBlog(data);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to fetch blog details.');
            } finally {
                setLoading(false);
            }
        };

        if (title) {
            fetchBlog();
        }
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

    return (
        <>
            <Header />
            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Blog Header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-600">
                        <time dateTime={blog.publish_date}>
                            {new Date(blog.publish_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        {blog.author && (
                            <span>by {blog.author}</span>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                {blog.image && (
                    <div className="mb-8">
                        <img
                            src={getFullImageUrl(blog.image)}
                            alt={blog.title}
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                )}

                {/* Blog Content */}
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog.content)
                    }}
                />

                {/* Tags Section */}
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
