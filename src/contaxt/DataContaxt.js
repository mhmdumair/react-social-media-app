import { createContext,useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../hook/useWindowSize'
import useAxiosFetch from '../hook/useAxiosFetch'
import api from "../api/posts"
import { format } from 'date-fns'

const DataContext = createContext({})

export const DataProvider=({children})=>{

    const [search,setSearch]=useState('')
    const [posts,setPosts]=useState([])
    const [searchResults,setSearchResults] = useState([])
    const [postTitle,setPostTitle] =useState("")
    const [postBody,setPostBody] =useState("")
    const [editTitle,setEditTitle] =useState("")
    const [editBody,setEditBody] =useState("")
    const navigate = useNavigate()
    const {width} = useWindowSize();
    const {data,fetchError,isLoading} = useAxiosFetch("http://localhost:3500/posts")
    
     // useEffect(()=>{
    //     const fetchPosts = async ()=>{
    //         try{
    //             const response = await api.get('/posts')
    //             setPosts(response.data)
    //         }catch(err){
    //             if(err.response){
    //                 console.log(err.response.data)
    //                 console.log(err.response.status)
    //                 console.log(err.response.headers)
    //             }else{
    //                 console.log(`Error ${err.message}`)
    //             }
    //         }
    //     }
    //     fetchPosts()
    // },[])

    useEffect(()=>{
        setPosts(data)
    },[data])

    useEffect(()=>{
        const filteredResults=posts.filter(post => {
            return ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase())
        })
        setSearchResults(filteredResults.reverse())
    },[posts,search])

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const id = posts.length ? posts[posts.length-1].id+1:1
        const datetime = format(new Date(),"MMMM dd, yyyy, pp")
        const newPost = {id:id,title:postTitle,datetime:datetime,body:postBody}
        setPosts([...posts,newPost])
        try{
            await api.post('/posts',newPost)
            setPostBody('')
            setPostTitle('')
            navigate('/')
        }catch(err){
            console.log(`Error ${err.message}`)
        }
        
    }
    
    const handleEdit= async (id)=>{
        const datetime = format(new Date(),"MMMM dd, yyyy, pp")
        const updatedPost = {id:id,title:editTitle,datetime:datetime,body:editBody}
        try{
            const response = await api.put(`/posts/${id}`,updatedPost)
            setPosts(posts.map(post=>post.id===id ? {...response.data} : post))
            setEditBody('')
            setEditTitle('')
            navigate('/')

        }catch(err){
            console.log(`Error ${err.message}`)
        }
    }

    const handleDelete = async (id)=>{
        try{
            await api.delete(`posts/${id}`)
            const newPostList=posts.filter(post=>post.id !== id)
            setPosts(newPostList)
            navigate('/')
        }catch(err){
            console.log(err.message)
        }
    }

    return(
        <DataContext.Provider value={{
            width,
            search,
            setSearch,
            searchResults,
            isLoading,
            fetchError,
            handleSubmit,
            postTitle,
            setPostTitle,
            postBody,
            setPostBody,
            posts,
            handleDelete,
            handleEdit,
            editTitle,
            editBody,
            setEditTitle,
            setEditBody
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext