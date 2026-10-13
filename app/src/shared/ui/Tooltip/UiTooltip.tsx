import React from 'react';
import cn from 'clsx';
import s from './UiTooltip.module.scss';

export interface TooltipProps {
    placement: 'bottom' | 'top',
    content: React.ReactElement | string,
    children?: React.ReactElement
}

const UiTooltip: React.FC<TooltipProps> = ({ children, content, placement  }) => {
    return (
        <div className={cn(s.tooltip, s[`tooltip--${placement}`])}>
            <div className={s.tooltip__element}>{content}</div>
            {children}
        </div>
    );
};

export default UiTooltip;
