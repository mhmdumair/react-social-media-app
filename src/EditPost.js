import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './contaxt/DataContaxt'

const EditPost = () => {

    const {posts,handleEdit,editTitle,editBody,setEditTitle,setEditBody} = useContext(DataContext)

    const {id} = useParams()
    const post = posts.find(post=> (post.id.toString()===id))

    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditBody,setEditTitle])

    return (
        <main className='NewPost'>
            {editTitle && 
                <>
                    <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                        <h2>Edit Post</h2>
                        <label htmlFor='postTitle'>Title: </label>
                        <input id='postTitle'
                            type='text'
                            required
                            value={editTitle}
                            onChange={(e)=>{setEditTitle(e.target.value)}}>   
                        </input>

                        <label htmlFor='postBody'>Post: </label>
                        <textarea id='postBody'
                            required
                            value={editBody}
                            onChange={(e)=>{setEditBody(e.target.value)}}>   
                        </textarea>
                        <button type='submit'
                            onClick={()=>{handleEdit(post.id)}}>
                            Submit
                        </button>


                    </form>
                </>}
            {!editTitle && 
                <>
                    <h2>Post not Found</h2>
                    <p>Well, Thats disapointing</p>
                    <p>
                        <Link to="/">Visit our Homepage</Link>
                    </p>
                </>
            }
                    
                
        </main>
    )
}

export default EditPost