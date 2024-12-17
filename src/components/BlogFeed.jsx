import { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import BlogUserOptions from './BlogUserOptions';
import NewPost from './NewPost';
import BlogThread from './BlogThread';

function BlogFeed({token, location, setSelectedLocation, setMapSize, BASE_URL}){

    const [showFeed, setShowFeed] = useState(true);
    const [showAddPost, setShowAddPost] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [showThread, setShowThread] = useState(null);
    const [showReply, setShowReply] = useState(null);

    let location_lat = location.lat;
    let location_long = location.long;
    let no_posts = blogPosts.length === 0;

    const loadBlogPost = async () => {
        const response = await fetch(BASE_URL + `/blog/${location._id}`, {
            headers: {'Authorization': token}
            }
        );
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
                class="w-15 h-8 px-3 py-1 mb-2 bg-gray-400 text-white font-semibold rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                onClick={(e) => {
                e.preventDefault()
                //setMapSize(["95vw", "75vh"])
                setSelectedLocation(null);
                setShowThread(null);
                setShowReply(null);
                }}>
                Close
            </button>
            <div className="blog-header" class="bg-gray-50 p-4 shadow-lg rounded space-x-7 text-center">
                <h2 class="inline text-2xl font-bold text-blue-250 mb-4 mt-14">Latitude: {location_lat}</h2>
                <h2 class="inline text-2xl font-bold text-blue-250 mb-4 mt-14">Longitude: {location_long}</h2>
            </div>
            <BlogUserOptions setShowFeed={setShowFeed} setShowAddPost={setShowAddPost}/>
            <div class="h-2/3 overflow-scroll p-4 feed-container custom-scrollbar">
                { showFeed && 
                    <div>
                        { no_posts ? (
                            <div className='no-post'>No posts yet.</div> 
                        ) : (
                            blogPosts.map((item, index) => (
                                <div key={index}>
                                    <BlogPost item={item} key={index} location={location} BASE_URL={BASE_URL} token={token} setShowFeed={setShowFeed} setShowAddPost={setShowAddPost} loadBlogPost={loadBlogPost} setShowThread={setShowThread} showThread={showThread} setShowReply={setShowReply} showReply={showReply}/>
                                    { showThread == item.id && (
                                        <div>
                                            { blogPosts.map((item, index) => 
                                            <BlogThread item={item} key={index} location={location} BASE_URL={BASE_URL} token={token} setShowFeed={setShowFeed} setShowAddPost={setShowAddPost} loadBlogPost={loadBlogPost} setShowThread={setShowThread} showThread={showThread} showReply={showReply} setShowReply={setShowReply}/>)}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>}
                { showAddPost &&
                    <div class='grid place-items-center bg-white py-3 px-5 rounded-lg shadow-lg w-full h-full'>
                        <NewPost token={token} location={location} setShowFeed={setShowFeed} setShowAddPost={setShowAddPost} loadBlogPost={loadBlogPost} BASE_URL={BASE_URL} showReply={setShowReply} setShowReply={setShowReply}/>
                    </div>
                }
            </div>
        </>
    )
}

export default BlogFeed