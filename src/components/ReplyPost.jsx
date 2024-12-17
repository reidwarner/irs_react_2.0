import { useState } from "react";

function ReplyPost({ token, location, post, setShowFeed, setShowAddPost, loadBlogPost, BASE_URL, setShowReply}){
    const [text, setText] = useState('');

    const addReply = async () => {
        let storedUserID = localStorage.getItem('currentUserID');
        let storedUserName = localStorage.getItem('currentUserName');
        
        let original_post;
        if (post.is_reply == true){
            original_post = post.reply_to;
        } else{
            original_post = post.id;
        }

        const newReply = 
            {
             location_id: location._id, 
             posted_by: storedUserID,
             user_text: `@${post.user_name} ${text}`,
             is_reply: true,
             reply_to: original_post,
             likes: 0,
            };

        const response = await fetch(
            BASE_URL + '/blog', {
                method: 'POST',
                headers: {'Content-type': 'application/json',
                          'Authorization': token,
                },
                body: JSON.stringify(newReply)
            }
        );
        if(response.status === 201){
            alert("Succesfully added post");
        }else {
            alert("Failed to add post, status code = " + response.status);
        }
        setText('');
        await loadBlogPost();
        await setShowReply(null);
        await setShowFeed(true);
        await setShowAddPost(false);
    }

    return (
        <div class="grid place-items-center ml-16 py-2 text-sm text-gray-500 bg-white border border-black rounded-lg mb-1">
            <h3 class="justify-self-start ml-2 font-semibold text-left text-sm">Replying to @{post.user_name}</h3>
            <textarea
                className="post-text"
                class="w-96 h-full px-4 py-2 mt-4 text-gray-700 font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter text here"
                value={text}
                onChange={e => setText(e.target.value)}/>
            <button className="new-post-btn" class="w-15 h-8 px-3 py-1 mt-4 bg-gray-400 text-white font-semibold rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300" onClick={addReply}>Reply</button>
        </div>
    )
}

export default ReplyPost;