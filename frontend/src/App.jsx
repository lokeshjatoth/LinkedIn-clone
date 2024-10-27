
import Layout from "./components/layout/Layout"
import { Routes, Route, Navigate } from "react-router-dom"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import SignUpPage from "./pages/auth/SignUpPage"
import toast, { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"

import { axiosInstance } from "./lib/axios.js"
import NotificationsPage from "./pages/NotificationsPage.jsx"
import NetworkPage from "./pages/NetworkPage.jsx"
import PostPage from "./pages/PostPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

function App() {

  const {data: authUser, isLoading} = useQuery({
    queryKey: ["authUser"],
    queryFn: async() => {
      try{
        const res = await axiosInstance.get("/auth/me")
        return res.data
      } catch(error){
        if(error.response && error.response.status === 401){
          return null
        }
        toast.error(error.response.data.message || "Something went wrong")
      }
    },
  });

  if(isLoading) return null;

  return <Layout> 

    <Routes>

      <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login"/>} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/> } />
      <Route path="/login" element={!authUser ?<LoginPage /> : <Navigate to="/"/>} />
      <Route path="/notifications" element={authUser ? <NotificationsPage/> : <Navigate to={"/login"}/>}/>
      <Route path="/network" element={authUser? <NetworkPage/> : <Navigate to={"/login"}/> }/>
      <Route path="/post/:postId" element={authUser ? <PostPage /> : <Navigate to="/login"/>}/>
      <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
    </Routes>
    <Toaster/>
  </Layout>
}

export default App