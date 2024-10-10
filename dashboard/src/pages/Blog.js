import React from 'react';

const Blog = () => {
    return (
        <div>
            <h2>Blog</h2>
            <p>Welcome to our blog! Here you will find the latest updates and articles.</p>
            <ul>
                <li>
                    <h3>Blog Post Title 1</h3>
                    <p>Summary of blog post 1. <a href="#">Read more...</a></p>
                </li>
                <li>
                    <h3>Blog Post Title 2</h3>
                    <p>Summary of blog post 2. <a href="#">Read more...</a></p>
                </li>
                <li>
                    <h3>Blog Post Title 3</h3>
                    <p>Summary of blog post 3. <a href="#">Read more...</a></p>
                </li>
            </ul>
        </div>
    );
};

export default Blog;
