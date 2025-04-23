import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const getOrSetMoviePrice = (movieId) => {
  const prices = JSON.parse(localStorage.getItem('moviePrices') || '{}');
  if (prices[movieId]) {
    return prices[movieId];
  }
  const newPrice = 200;
  prices[movieId] = newPrice;
  localStorage.setItem('moviePrices', JSON.stringify(prices));
  return newPrice;
};

const MovieCard = ({ movie }) => {
  const { addToCart } = useCart();
  const [price, setPrice] = useState(() => getOrSetMoviePrice(movie.id));

  useEffect(() => {
    const onStorage = () => {
      const prices = JSON.parse(localStorage.getItem('moviePrices') || '{}');
      if (prices[movie.id] && prices[movie.id] !== price) {
        setPrice(prices[movie.id]);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [movie.id, price]);

  return (
    <div className="movie-card">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-image.jpg'}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p style={{ fontSize: '13px', minHeight: '48px' }}>
        {movie.overview ? movie.overview.substring(0, 80) + '...' : '-'}
      </p>
      <p>ราคา: ฿{price}</p>
      <button onClick={() => addToCart(movie, price)}>เพิ่มในตะกร้า</button>
    </div>
  );
};

export default MovieCard;
