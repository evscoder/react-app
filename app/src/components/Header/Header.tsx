import s from './Header.module.scss';
import {FC} from 'react';
import Icon from '../ui/Icon/Icon.tsx';
import imagePath from '../../utils/imagePath.ts';
import UiTooltip from '../ui/Tooltip/UiTooltip.tsx';
import { useGetAppDataQuery } from '../../modules/api/auth';

const Header: FC = () => {
    const { data } = useGetAppDataQuery();

    return (
        <div className={s.pageHeader}>
            <UiTooltip placement={'bottom'} content={'Documentation'}>
                <a href={'https://github.com/evscoder/react-app'} className={s.pageHeader__title} target={'_blank'}>
                    <img src={imagePath('Logo.svg')} alt={'React Starter'} width={120}></img>
                    <Icon name={'icon-keyboard-down'} />
                    {data?.title}
                </a>
            </UiTooltip>
        </div>
    );
};

export default Header;
