import { Navigate } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';

const UserGuard = ({ children }) => {
    const { isAuthenticated } = UseAuth();
  
    if (isAuthenticated) {
      return <Navigate to="/backlog" />;
    }
    return <>{children}</>;
};
  
export default UserGuard;