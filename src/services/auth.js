// Adds a movie to the current user's watchlist
export const addToWatchlist = (movie) => {
  // Retrieve the list of users and the current user from local storage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    // Find the index of the current user in the users array
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
      // Initialize watchlist if it does not exist
      if (!users[userIndex].watchlist) {
        users[userIndex].watchlist = [];
      }
      // Add the 'watched' field to the movie object and push it to the watchlist
      const movieWithWatched = { ...movie, watched: false };
      users[userIndex].watchlist.push(movieWithWatched);
      // Update local storage with the modified users and current user data
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
      return true;
    }
  }
  return false;
};

// Retrieves the watchlist of the current user
export const getWatchlist = () => {
  // Get the current user from local storage and return their watchlist if it exists
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser && currentUser.watchlist ? currentUser.watchlist : [];
};

// Toggles the watched status of a movie in the current user's watchlist
export const toggleWatchedStatus = (movieId) => {
  // Retrieve the list of users and the current user from local storage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    // Find the index of the current user in the users array
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
      // Find the index of the movie in the current user's watchlist
      const movieIndex = users[userIndex].watchlist.findIndex(m => m.id === movieId);
      if (movieIndex !== -1) {
        // Toggle the 'watched' status of the movie
        users[userIndex].watchlist[movieIndex].watched = !users[userIndex].watchlist[movieIndex].watched;
        // Update local storage with the modified users and current user data
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        return true;
      }
    }
  }
  return false;
};

// Helper function to retrieve users from local storage
const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');

// Helper function to save users to local storage
const setUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

// Logs in a user by verifying their username/email and password
export const login = (usernameOrEmail, password) => {
  const users = getUsers();
  // Find a user with matching username/email and password
  const user = users.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);
  if (user) {
    // Store the current user's information in local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

// Registers a new user with a username, email, and password
export const register = (username, email, password) => {
  const users = getUsers();
  // Check if the username or email already exists
  if (users.some(u => u.username === username || u.email === email)) {
    return false; // Username or email already exists
  }
  // Create a new user and add them to the users array
  const newUser = { username, email, password, watchlist: [] };
  users.push(newUser);
  setUsers(users);
  return true;
};

// Updates the password of a user if the old password is correct
export const updatePassword = (userId, oldPassword, newPassword) => {
  const users = getUsers();
  // Find the index of the user with the given ID and old password
  const userIndex = users.findIndex(u => u.id === userId && u.password === oldPassword);
  if (userIndex !== -1) {
    // Update the user's password and save the changes
    users[userIndex].password = newPassword;
    setUsers(users);
    return true;
  }
  return false;
};

// Logs out the current user by removing their information from local storage
export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Checks if there is a currently authenticated user
export const isAuthenticated = () => {
  return localStorage.getItem('currentUser') !== null;
};

// Retrieves the current user's information from local storage
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

// Export helper functions for managing users
export { getUsers, setUsers };