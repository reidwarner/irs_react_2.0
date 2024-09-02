function BlogUserOptions({setShowFeed, setShowAddPost}){
    return (
        <div className="options-btn">
            <button onClick={(e) => {
                e.preventDefault()
                setShowFeed(true)
                setShowAddPost(false)
                }}>
                Show Feed
            </button>
            <button onClick={(e) => {
                e.preventDefault()
                setShowFeed(false)
                setShowAddPost(true)
                }}>New Post</button>
        </div>
    )
}

export default BlogUserOptions