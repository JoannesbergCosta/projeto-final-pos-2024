import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ToDosPage from './pages/ToDosPage';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import CommentsPage from './pages/CommentsPage';
import AlbumsPage from './pages/AlbumsPage';
import PhotosPage from './pages/PhotosPage';
import api from './api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [dataCounts, setDataCounts] = useState({
    users: 0,
    posts: 0,
    todos: 0,
    albums: 0,
    photos: 0,
    comments: 0,
  });

  useEffect(() => {
    api.get('/users/').then((response) => setDataCounts((prev) => ({ ...prev, users: response.data.length })));
    api.get('/posts/').then((response) => setDataCounts((prev) => ({ ...prev, posts: response.data.length })));
    api.get('/todos/').then((response) => setDataCounts((prev) => ({ ...prev, todos: response.data.length })));
    api.get('/albums/').then((response) => setDataCounts((prev) => ({ ...prev, albums: response.data.length })));
    api.get('/photos/').then((response) => setDataCounts((prev) => ({ ...prev, photos: response.data.length })));
    api.get('/comments/').then((response) => setDataCounts((prev) => ({ ...prev, comments: response.data.length })));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Home</h1>
      <p>Quantidades de dados disponíveis:</p>

      {}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Entidade</th>
            <th scope="col">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(dataCounts).map(([key, count]) => (
            <tr key={key}>
              <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/todos" element={<ToDosPage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/comments" element={<CommentsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
