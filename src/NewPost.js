import React from 'react'
import { useContext } from 'react'
import DataContext from './contaxt/DataContaxt'

const NewPost = () => {
  const {handleSubmit,postTitle,setPostTitle,postBody,setPostBody} =useContext(DataContext)
  return (
    <main className='NewPost'>
        <form className='newPostForm' onSubmit={handleSubmit}>
            <h2>New Post</h2>
            <label htmlFor='postTitle'>Title: </label>
            <input id='postTitle'
                required
                value={postTitle}
                onChange={e=>setPostTitle(e.target.value)}
                placeholder='Post title'>
            </input>
            <label htmlFor='postBody'>Post: </label>
            <textarea  id='postBody'
                required
                value={postBody}
                onChange={e=>setPostBody(e.target.value)}
                placeholder='Type your post here '>
            </textarea>
            <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost