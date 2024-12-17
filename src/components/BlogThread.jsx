import { useState, useEffect } from 'react';
import ReplyPost from './ReplyPost';

function BlogThread({item, location, BASE_URL, token, setShowFeed, setShowAddPost, loadBlogPost, setShowThread, showThread, showReply, setShowReply}){

    const [likes, setLikes] = useState(item.likers);

    const likeBlogPost = async (postID) => {
        let storedUserID = localStorage.getItem('currentUserID');

        const response = await fetch(BASE_URL + `/like/${postID}`, {
            method: 'POST',
            headers: {'Authorization': token, 'Content-type': 'application/json'},
            body: JSON.stringify({user_id: storedUserID}),
            }
        );
        if (response.status === 201){
            setLikes(likes + 1);
        } else if (response.status === 202){
            setLikes(likes - 1);
        }
      }

    let date = formatDate(item.created_at);
    function formatDate(dateString) {
        // Parse the input date string into a Date object
        const date = new Date(dateString);
        
        // Get the day of the week (e.g., "Sun")
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = daysOfWeek[date.getUTCDay()];
        
        // Get the day, month, and year (in local timezone)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        
        // Get the time in user's local timezone
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        // Determine if it's AM or PM
        const period = hours >= 12 ? 'PM' : 'AM';
        
        // Convert hours to 12-hour format
        hours = hours % 12 || 12;  // Convert to 12-hour format, and handle 0 as 12 (midnight)
        
        // Format the final output
        const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;
        const formattedDate = `${dayOfWeek} ${month}/${day}/${year} ${formattedTime}`;
        
        return formattedDate;
    }
    
    if (item.reply_to == showThread){
        return (
            <>
                <div class="ml-16 py-2 items-center text-sm text-gray-500 bg-white border border-black rounded-lg mb-1">
                    <p class="ml-2 inline mr-4">@<span class="font-semibold text-gray-800">{item.user_name}</span></p>
                    <p class="inline">{date}</p>
                    <p class="ml-6 mb-4 mt-4 font-bold">{item.user_text}</p>
                    <div class="inline ml-2 space-x-1">
                        <button class="inline focus:outline-none"
                            onClick={(e) => {
                                e.preventDefault()
                                likeBlogPost(item.id)
                                }}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6 text-gray-800 hover:stroke-blue-500" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                                <path d="M19 14l-7-7-7 7"></path>
                            </svg>
                            <p class="inline-block">{likes}</p>
                        </button>
                        <button class="text-sm text-gray-600 hover:text-blue-500 focus:outline-none"
                            onClick={(e) => {
                                e.preventDefault();
                                if (item.id == showReply){
                                    setShowReply(null);
                                } else{
                                    setShowReply(item.id);
                                }
                                }}>
                            Reply
                        </button>
                    </div>
                </div>
                { showReply == item.id && (
                    <ReplyPost class='grid place-items-center bg-white py-3 px-5 rounded-lg shadow-lg w-full h-full' token={token} location={location} post={item} setShowFeed={setShowFeed} setShowAddPost={setShowAddPost} loadBlogPost={loadBlogPost} setShowReply={setShowReply} BASE_URL={BASE_URL}/>
                )}
            </>
        )
    }
    
}

export default BlogThread