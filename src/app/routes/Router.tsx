import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Posts from '../container/Posts'
import AddPostForm from '../container/Posts/AddPostForm'

const Router = () => {
  return (
    <Routes>
        <Route path='/posts' element={<Posts/>}>
          
        </Route>
        <Route path='/add-post' element={<AddPostForm/>}/>
    </Routes>
  )
}

export default Router