import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { fetchMovies } from './api';
import MovieCard from './components/MovieCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import Cart from './components/Cart.jsx';
import AdminSetPrice from './components/AdminSetPrice.jsx';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('a');

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(searchQuery);
      setMovies(data.results);
    };
    getMovies();
  }, [searchQuery]);

  return (
    <BrowserRouter>
      <nav style={{
        padding: '16px',
        background: '#181818',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <Link to="/" reloadDocument style={{ color: '#fff', marginRight: 16, textDecoration: 'none' }}>
          🎬 Movie Store
        </Link>
        <Link
          to="/admin"
          style={{
            color: '#ffb74d',
            textDecoration: 'none',
            float: 'right'
          }}
        >
          Admin Panel
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="app-layout">
            <div className="main-content">
              <h1>TMDB Movie Store</h1>
              <SearchBar onSearch={setSearchQuery} />
              <div className="movie-list">
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
            <Cart />
          </div>
        } />

        <Route path="/admin" element={
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <AdminSetPrice movies={movies} />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
