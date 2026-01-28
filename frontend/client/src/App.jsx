import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import About from './components/about/About'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from './components/signin/SignIn'
import SignUp from './components/signup/SignUp'
import LogOut from './components/logout/LogOut'
import Todo from './components/todo/Todo'
import ProtectedRoute from './components/protected/ProtectedRoute' 

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo' element={<ProtectedRoute>
            <Todo/>
            </ProtectedRoute>
          }/>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App
