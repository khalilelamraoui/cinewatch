import { useContext } from 'react';
import { AuthContext } from '../../hooks/AuthProvider'; // Adjust path if needed

export const useAuth = () => {
    return useContext(AuthContext);
};
