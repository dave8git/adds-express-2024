import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import MainPage from './components/MainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FullPost from './components/FullPost/FullPost';
import PostForm from './components/PostForm/PostForm';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post/:id" element={<FullPost />} />
          <Route path="/add-post" element={<PostForm />} />
          <Route path="/edit-post/:id" element={<PostForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;