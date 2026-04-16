import s from './Auth.module.scss';
import useTitle from '../../hooks/useTitle.tsx';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import cn from 'clsx';
import { useGetAppDataQuery } from '../../modules/api/auth';

const Auth = () => {
    const { isLoading } = useGetAppDataQuery();

    useTitle('Auth Page');

    return (
        !isLoading && <>
            <div className={s.auth}>
                <div className={cn(s.auth__container, 'container grid')}>
                    <Header />
                    <div className={cn(s.auth__center, 'text-[48px] font-bold text-center')}>
                        React are ready.
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Auth;
