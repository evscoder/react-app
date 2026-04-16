import { Route, Routes } from 'react-router-dom';
import { PATHS_CONFIG } from './paths.ts';
import Auth from '../pages/Auth/Auth.tsx';

const {
    home
} = PATHS_CONFIG;

const Routing = () => {
    return (
        <Routes>
            <Route path={home.path} element={<Auth />} />
        </Routes>
    );
};

export default Routing;
