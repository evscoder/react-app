import s from './Auth.module.scss';
import useTitle from '../../hooks/useTitle.tsx';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import cn from 'clsx';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store.tsx';
import { getAuthData } from '../../modules/api/auth';

const Auth = () => {
    const { loading } = useSelector((state: RootState) => state.slice);
    const dispatch = useDispatch<AppDispatch>();

    useTitle('Auth Page');

    useEffect(() => {
        dispatch(getAuthData());
    }, [dispatch]);

    return (
        !loading && <>
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
