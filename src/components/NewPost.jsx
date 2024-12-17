import { useState } from "react";

function NewPost({ token, location, setShowFeed, setShowAddPost, loadBlogPost, BASE_URL, showReply}){
    const [text, setText] = useState('');

    const addPost = async () => {
        let storedUserID = localStorage.getItem('currentUserID');
        let storedUserName = localStorage.getItem('currentUserName');
        const newPost = 
            {
             location_id: location._id, 
             posted_by: storedUserID,
             user_text: text,
             is_reply: false,
             reply_to: null,
             likes: 0,
            };

        const response = await fetch(
            BASE_URL + '/blog', {
                method: 'POST',
                headers: {'Content-type': 'application/json',
                          'Authorization': token,
                },
                body: JSON.stringify(newPost)
            }
        );
        if(response.status === 201){
            alert("Succesfully added post");
        }else {
            alert("Failed to add post, status code = " + response.status);
        }
        await loadBlogPost();
        await setShowFeed(true);
        await setShowAddPost(false);
    }

    return (
        <>
            <h3 class="font-semibold text-center text-xl">New Post</h3>
            <textarea
                className="post-text"
                class="w-full h-36 px-4 py-2 text-gray-700 font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter text here"
                value={text}
                onChange={e => setText(e.target.value)}/>
            <button className="new-post-btn" class="w-15 h-8 px-3 py-1 mb-2 bg-gray-400 text-white font-semibold rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300" onClick={addPost}>Post</button>
    </>
    )
}

export default NewPost;