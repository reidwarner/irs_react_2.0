import { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import BlogUserOptions from './BlogUserOptions';
import NewPost from './NewPost';

function BlogFeed({location, setSelectedLocation, setMapSize}){

    const [showFeed, setShowFeed] = useState(true);
    const [showAddPost, setShowAddPost] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);

    let location_lat = location.lat;
    let location_long = location.long;
    let no_posts = blogPosts.length === 0;

    const loadBlogPost = async () => {
        const response = await fetch(`/blog/${location._id}`);
        if (response.status === 200){
            const blog_post_data = await response.json();
            setBlogPosts(blog_post_data);
        } else {
            setBlogPosts([]);
        }
      }

      useEffect( () => {
        loadBlogPost();
       }, [location]);

    return (
        <>
            <button className='blog-feed-btn'
                onClick={(e) => {
                e.preventDefault()
                setMapSize(["95vw", "75vh"])
                setSelectedLocation(null)
                }}>
                Close
            </button>
            <div className="blog-header">
                <h2>Location Feed for:</h2>
                <h3>Latitude: {location_lat}</h3>
                <h3>Longitude: {location_long}</h3>
            </div>
            <BlogUserOptions setShowFeed={setShowFeed} setShowAddPost={setShowAddPost}/>
            <div className='feed-container'>
                { showFeed && 
                    <div>
                        { no_posts ? <div className='no-post'>No posts yet.</div> : blogPosts.map((item, index) => <BlogPost item={item} key={index}/>)}
                    </div>}
                { showAddPost &&
                    <div>
                        <NewPost location={location} setShowFeed={setShowFeed} setShowAddPost={setShowAddPost} loadBlogPost={loadBlogPost}/>
                    </div>
                }
            </div>
        </>
    )
}

export default BlogFeed