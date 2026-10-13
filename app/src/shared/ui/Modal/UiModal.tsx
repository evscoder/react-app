import {FC, ReactNode, useEffect, useState} from 'react';
import s from './UiModal.module.scss';
import cn from 'clsx';
import SimpleBar from 'simplebar-react';
import Icon from '../Icon/Icon.tsx';
import {createPortal} from 'react-dom';

interface Props {
    isShow: boolean;
    title?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
    headerLeft?: ReactNode;
    classNames?: string;
    classes?: string;
    fullscreen?: boolean;
    page?: boolean;
    dialog?: boolean;
    container?: boolean;
    transparent?: boolean;
    context?: boolean;
    setClose: () => void;
}

const UiModal: FC<Props> = ({
    isShow,
    content,
    title,
    footer,
    children,
    headerLeft,
    classNames,
    classes,
    fullscreen,
    page,
    dialog,
    container,
    transparent,
    context,
    setClose
}) => {
    const [active, setActive] = useState<boolean>(false);
    const [animate, setAnimate] = useState<boolean>(false);
    const body = children ?? content;

    useEffect(() => {
        if (isShow) {
            setActive(true);
            setAnimate(true);
        } else {
            setAnimate(false);
            setTimeout(() => {
                setActive(false);
            }, 310);
        }
    }, [isShow]);

    return (
        createPortal(
            <SimpleBar
                className={cn(
                    s['ui-modal'],
                    'scrollbar-thin',
                    active && s['is-active'],
                    animate && s['is-animate'],
                    fullscreen && s['ui-modal--fullscreen'],
                    page && s['ui-modal--page'],
                    dialog && s['ui-modal--dialog'],
                    container && s['ui-modal--container'],
                    transparent && s['ui-modal--transparent'],
                    context && s.context,
                    classNames,
                    classes
                )}
            >
                <div
                    className={s['ui-modal__overlay']}
                    onClick={setClose}
                    onKeyUp={setClose}
                    tabIndex={0}
                ></div>
                <div className={s['ui-modal__wrap']}>
                    <div className={s['ui-modal__window']}>
                        <div className={s['ui-modal__content']}>
                            {!page && !context && !dialog && (
                                <button className={s['ui-modal__close']} type="button" onClick={setClose}>
                                    <Icon name={'icon-cross'} width={40} />
                                </button>
                            )}

                            {title &&
                                <div className={s['ui-modal__header']}>
                                    <div className={s['ui-modal__container']}>
                                        <h2 className={s['ui-modal__title']}>
                                            {headerLeft && <div className="contents md:hidden">{headerLeft}</div>}

                                            {page && (
                                                <div>
                                                    <button className="flex gap-3 items-center" type="button" onClick={setClose}>
                                                        <Icon name={'icon-keyboard-down'} width={20} />
                                                        {title}
                                                    </button>
                                                </div>
                                            )}

                                            {!page && context && (
                                                <div className="contents md:hidden">
                                                    <div className={s['ui-modal__header-center']}>{title}</div>
                                                </div>
                                            )}

                                            {context && (
                                                <div className={s['ui-modal__header-right']}>
                                                    <div className="md:hidden">
                                                        <button type="button" onClick={setClose}>
                                                            <Icon name={'icon-cross'} width={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {!context && !page && (
                                                <div className="col-start-1 col-end-4 text-center">{title}</div>
                                            )}
                                        </h2>
                                    </div>
                                </div>
                            }

                            {body &&
                                <div className={s['ui-modal__body']}>
                                    <div className={s['ui-modal__container']}>
                                        {body}
                                    </div>
                                </div>
                            }
                            {footer &&
                                <div className={s['ui-modal__footer']}>
                                    <div className={s['ui-modal__container']}>
                                        { footer }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </SimpleBar>,
            document.getElementById('root') as HTMLDivElement
        )
    );
};

export default UiModal;
