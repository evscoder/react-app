import cn from 'clsx';
import s from './UiLoader.module.scss';

type UiLoaderProps = {
    label?: string,
    className?: string,
};

const UiLoader = ({ label = 'Loading', className }: UiLoaderProps) => (
    <div className={cn(s.loader, className)} role="status" aria-live="polite">
        <div className={s.loader__mark} aria-hidden="true">
            <span className={s.loader__ring} />
            <span className={s.loader__ring} />
            <span className={s.loader__ring} />
            <span className={s.loader__core} />
            <span className={s.loader__dot} />
        </div>
        <span className={s.loader__label}>{label}</span>
    </div>
);

export default UiLoader;
