export const addToWatchlist = (movie) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
      if (!users[userIndex].watchlist) {
        users[userIndex].watchlist = [];
      }
      // Add the 'watched' field to the movie object
      const movieWithWatched = { ...movie, watched: false };
      users[userIndex].watchlist.push(movieWithWatched);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
      return true;
    }
  }
  return false;
};

export const getWatchlist = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser && currentUser.watchlist ? currentUser.watchlist : [];
};

// New function to toggle the watched status of a movie
export const toggleWatchedStatus = (movieId) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
      const movieIndex = users[userIndex].watchlist.findIndex(m => m.id === movieId);
      if (movieIndex !== -1) {
        users[userIndex].watchlist[movieIndex].watched = !users[userIndex].watchlist[movieIndex].watched;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        return true;
      }
    }
  }
  return false;
};

const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
const setUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

export const login = (usernameOrEmail, password) => {
  const users = getUsers();
  const user = users.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

export const register = (username, email, password) => {
  const users = getUsers();
  if (users.some(u => u.username === username || u.email === email)) {
    return false; // Username or email already exists
  }
  const newUser = { username, email, password, watchlist: [] };
  users.push(newUser);
  setUsers(users);
  return true;
};

export const updatePassword = (userId, oldPassword, newPassword) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId && u.password === oldPassword);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    setUsers(users);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = () => {
  return localStorage.getItem('currentUser') !== null;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

// Now export getUsers and setUsers as well
export { getUsers, setUsers }; // <-- Add this export statement