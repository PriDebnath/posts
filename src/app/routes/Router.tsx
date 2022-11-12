import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Posts from '../container/Posts'
import AddPostForm from '../container/Posts/AddPostForm'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Posts/>}>
          
        </Route>
    </Routes>
  )
}

export default Router