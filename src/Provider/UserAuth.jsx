import  { useContext } from 'react';
import { AuthContext } from './Authprovider';

const UserAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default UserAuth;