import React, {ChangeEvent, forwardRef, MouseEventHandler} from 'react';
import s from './UiButton.module.scss';
import cn from 'clsx';
import {Colors} from '../../../types/types.ts';
import {Link} from 'react-router-dom';

export interface ButtonProps {
    link?: boolean,
    href?: string,
    id?: string,
    title?: string,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement> | ChangeEvent<HTMLButtonElement> | undefined | any,
    children?: React.ReactNode,
    color: Colors,
    classNames?: string,
}

const UiButton = forwardRef<HTMLButtonElement, ButtonProps>(({link, id, children, color, classNames, ...props }, ref) => {
    const buttonClasses = cn(s.button, color && s[`button--${color}`], classNames);

    return (
        link ?
        <Link {...props} data-testid={id} to={props.href as string} className={buttonClasses}>
            { children }
        </Link> :
        <button {...props} ref={ref} id={id} data-testid={id} className={buttonClasses}>
            { children }
        </button>
    );
});

export default UiButton;
