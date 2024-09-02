function BlogPost({item}){

    return (
        <div className="blog-post">
            <h3>Posted on &nbsp;
                {item.date}&nbsp;at&nbsp;{item.time}
            </h3>
            <h4>
                Posted by {item.user}
            </h4>
            <p>
                {item.text}
            </p>
        </div>
    )
}

export default BlogPost