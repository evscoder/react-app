import s from './Auth.module.scss';
import useTitle from '../../shared/hooks/useTitle.tsx';
import cn from 'clsx';
import { EditAppTitle } from '../../features/';
import BaseLayout from '../components/BaseLayout';

const Auth = () => {
    useTitle('Auth Page');

    return (
        <BaseLayout>
            <div className={s.auth}>
                <div className={cn(s.auth__container, 'container grid')}>
                    <div className={s.auth__center}>
                        <EditAppTitle />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default Auth;
