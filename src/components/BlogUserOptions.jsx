function BlogUserOptions({setShowFeed, setShowAddPost}){
    return (
        <div class="flex justify-center items-center m-1 space-x-5">
            <button 
            class="w-15 h-8 px-3 py-1 mb-2 bg-gray-400 text-white font-semibold rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            onClick={(e) => {
                e.preventDefault()
                setShowFeed(true)
                setShowAddPost(false)
                }}>
                Show Feed
            </button>
            <button 
            class="w-15 h-8 px-3 py-1 mb-2 bg-gray-400 text-white font-semibold rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            onClick={(e) => {
                e.preventDefault()
                setShowFeed(false)
                setShowAddPost(true)
                }}>New Post</button>
        </div>
    )
}

export default BlogUserOptions