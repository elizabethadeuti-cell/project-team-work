import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import SideBar from './components/SideBar';
import Layout from './components/Layout';
import Fashion from './pages/Fashion';
import Entertainment from './pages/Entertainment';
import Sport from './pages/Sport';
import Business from './pages/Business';
import Movies from './pages/Movies';
import Education from './pages/Education';
import BlogDetails from './pages/BlogDetails';
import NotFoundPage from './pages/NotFoundPage';
import useAuth from './hooks/useAuth';
import Share from './pages/Share';
import ProtectedRoute from './components/Auth/ProtectedRouter';

function App() {
const {user, authloading} = useAuth();

  if (authloading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    
    <Layout user={user}>
  
      <Routes>
        <Route path="/" element={user ? <Navigate to="/entertainment" /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/entertainment" /> : <Login /> } />
        <Route
        path="/entertainment"
        element={<ProtectedRoute><Entertainment  /></ProtectedRoute>} />
        <Route path="/blog" element={<BlogDetails />} />
       <Route path="/fashion" element={<Fashion /> }/>
       <Route path="/Sport" element={<Sport /> }/>
       <Route path="/business" element={<Business /> }/>
       <Route path="/movies" element={<Movies /> }/>
       <Route path="/education" element={<Education /> }/>
       <Route path="/share" element={<Share /> } />
       <Route path="*" element={<NotFoundPage /> } />
      </Routes>
      </Layout>
    
  );
}

export default App;


