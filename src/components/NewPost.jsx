import { useState } from "react";

function NewPost({ location, setShowFeed, setShowAddPost, loadBlogPost, BASE_URL }){
    const [user, setUser] = useState('');
    const [text, setText] = useState('');

    const addPost = async () => {
        let curr_date = new Date();
        const newPost = 
            {
             location_id: location._id, 
             user: user, 
             date: `${curr_date.getMonth() + 1}-${curr_date.getDate()}-${curr_date.getFullYear()}`, 
             time: `${curr_date.getHours()}:${curr_date.getMinutes().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
                })}`, 
             text: text,
            }
        console.log(newPost)
        const response = await fetch(
            BASE_URL + '/blog', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
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
            <h3 className="new-post-title">New Post:</h3>
            <div className="input-container">
                <label>User Name:<br></br>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={user}
                        onChange={e => setUser(e.target.value)}/>
                </label>
                <label>Post text:<br></br>
                    <textarea
                        className="post-text"
                        placeholder="Enter your message"
                        value={text}
                        onChange={e => setText(e.target.value)}/>
                </label>
                <button className="new-post-btn" onClick={addPost}>Post</button>
            </div>
        </>
    )
}

export default NewPost;