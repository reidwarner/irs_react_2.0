function BlogPost({item}){

    return (
        <div className="blog-post">
            <h3>Posted on
                {item.created_at}
            </h3>
            <h4>
                Posted by {item.posted_by}
            </h4>
            <p>
                {item.user_text}
            </p>
        </div>
    )
}

export default BlogPost