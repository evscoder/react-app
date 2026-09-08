import s from './Auth.module.scss';
import useTitle from '../../shared/hooks/useTitle.tsx';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import cn from 'clsx';
import { EditAppTitle } from '../../features/edit-app-title';

const Auth = () => {
    useTitle('Auth Page');

    return (
        <div className={s.auth}>
            <div className={cn(s.auth__container, 'container grid')}>
                <Header />
                <div className={s.auth__center}>
                    <EditAppTitle />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Auth;
