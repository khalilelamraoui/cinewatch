// Adds a movie to the current user's watchlist
export const addToWatchlist = (movie) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return false; 

  // Initialize watchlist if it does not exist
  currentUser.watchlist = currentUser.watchlist || [];
  
  // Check if the movie is already in the watchlist
  if (!currentUser.watchlist.some(m => m.id === movie.id)) {
    currentUser.watchlist.push(movie);
    
    // Update the current user's data in local storage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update the users array in local storage with the modified user data
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUsers = users.map(u => u.username === currentUser.username ? currentUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return true;
  }
  return false;
};

// Removes a movie from the current user's watchlist by its ID
export const removeFromWatchlist = (movieId) => {
  // Retrieve the current user's data from local storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return false; // If no user is logged in, return false

  // Remove the movie from the watchlist by filtering it out
  currentUser.watchlist = currentUser.watchlist.filter(m => m.id !== movieId);
  
  // Update the current user's data in local storage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  // Update the users array in local storage with the modified user data
  const users = JSON.parse(localStorage.getItem('users'));
  const updatedUsers = users.map(u => u.username === currentUser.username ? currentUser : u);
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  return true;
};

// Retrieves the watchlist of the current user
export const getWatchlist = () => {
  // Retrieve the current user's data from local storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // Return the watchlist if it exists, or an empty array if not
  return currentUser ? currentUser.watchlist || [] : [];
};