export const addToWatchlist = (movie) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return false;

  currentUser.watchlist = currentUser.watchlist || [];
  if (!currentUser.watchlist.some(m => m.id === movie.id)) {
    currentUser.watchlist.push(movie);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUsers = users.map(u => u.username === currentUser.username ? currentUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return true;
  }
  return false;
};

export const removeFromWatchlist = (movieId) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return false;

  currentUser.watchlist = currentUser.watchlist.filter(m => m.id !== movieId);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  const users = JSON.parse(localStorage.getItem('users'));
  const updatedUsers = users.map(u => u.username === currentUser.username ? currentUser : u);
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  return true;
};

export const getWatchlist = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser ? currentUser.watchlist || [] : [];
};