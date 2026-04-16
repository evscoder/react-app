import React from 'react';
import cn from 'clsx';
import UiError from '../components/ui/Forms/UiError.tsx';

export interface WithFieldErrorProps {
    className?: string;
    classNameInput?: string;
    hasError?: string | undefined | React.ReactNode;
}

const withFieldError = <T extends WithFieldErrorProps>(Component: React.ComponentType<T>) => {
    const WrappedComponent = ({ className, classNameInput, hasError, ...props }: T) => (
        <div className={cn(hasError && 'has-error', className)}>
            <Component className={classNameInput} {...props as T} />
            {hasError && <UiError>{hasError}</UiError>}
        </div>
    );

    WrappedComponent.displayName = `withFieldError(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default withFieldError;
