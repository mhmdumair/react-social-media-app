import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
    return (
        <article className='post'>
            <Link to={`post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className='post-body'>
                  {post.body.length<=25? post.body : `${post.body.slice(0,25)}...`}
                </p>
                <p className='post-date'>{post.datetime}</p>
            </Link>
        
        </article>
  )
}

export default Post