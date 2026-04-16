import React from 'react';
import s from './UiError.module.scss';

interface Props {
    children: React.ReactNode
}

const UiError: React.FC<Props> = ({ children }) => {
    return <div className={s.error}>{children}</div>;
};

export default UiError;
