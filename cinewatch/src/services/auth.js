export const login = (username, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

export const register = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.username === username || u.email === email)) {
    return false; // Username or email already exists
  }
  
  const newUser = { username, email, password, watchlist: [] };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return true;
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