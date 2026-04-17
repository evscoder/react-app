import { FormEvent, useEffect, useState } from 'react';
import s from './Auth.module.scss';
import useTitle from '../../hooks/useTitle.tsx';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import cn from 'clsx';
import {
    useDeleteAppTitleMutation,
    useGetAppDataQuery,
    useUpdateAppTitleMutation
} from '../../modules/api/auth';
import UiButton from '../../components/ui/Button/UiButton.tsx';
import UiLoader from '../../components/ui/Loader/UiLoader.tsx';

const SUBMIT_PREVIEW_DELAY = 1200;

const wait = (delay: number) => new Promise(resolve => {
    window.setTimeout(resolve, delay);
});

const Auth = () => {
    const [title, setTitle] = useState('');
    const [pendingAction, setPendingAction] = useState<'save' | 'delete' | null>(null);
    const {
        data,
        isError,
        isFetching,
        isLoading
    } = useGetAppDataQuery();
    const [
        updateAppTitle,
        { isLoading: isUpdating, isError: isUpdateError }
    ] = useUpdateAppTitleMutation();
    const [
        deleteAppTitle,
        { isLoading: isDeleting, isError: isDeleteError }
    ] = useDeleteAppTitleMutation();

    const isSubmitting = Boolean(pendingAction) || isUpdating || isDeleting;
    const loaderLabel = pendingAction === 'delete' ? 'Clearing title...' : 'Saving title...';

    useEffect(() => {
        if (data) {
            setTitle(data.title);
        }
    }, [data]);

    useTitle('Auth Page');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setPendingAction('save');

        try {
            await wait(SUBMIT_PREVIEW_DELAY);
            await updateAppTitle(title).unwrap();
        } catch {
            // RTK Query exposes the error through isUpdateError.
        } finally {
            setPendingAction(null);
        }
    };

    const handleDelete = async () => {
        setPendingAction('delete');

        try {
            await wait(SUBMIT_PREVIEW_DELAY);
            await deleteAppTitle().unwrap();
        } catch {
            // RTK Query exposes the error through isDeleteError.
        } finally {
            setPendingAction(null);
        }
    };

    return (
        !isLoading && <>
            <div className={s.auth}>
                <div className={cn(s.auth__container, 'container grid')}>
                    <Header />
                    <div className={s.auth__center}>
                        <form className={s.auth__form} onSubmit={handleSubmit}>
                            <div className={s.auth__eyebrow}>API test</div>
                            <h1 className={s.auth__title}>
                                {data?.title || 'Title is empty'}
                            </h1>
                            <label className={s.auth__field}>
                                <span>App title</span>
                                <input
                                    value={title}
                                    disabled={isSubmitting}
                                    placeholder="React App"
                                    onChange={event => setTitle(event.target.value)}
                                />
                            </label>
                            <div className={s.auth__actions}>
                                <UiButton
                                    color="primary"
                                    disabled={isSubmitting || title.trim().length === 0}
                                >
                                    Save title
                                </UiButton>
                                <UiButton
                                    color="secondary"
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={handleDelete}
                                >
                                    Clear title
                                </UiButton>
                            </div>
                            {isSubmitting && (
                                <UiLoader className={s.auth__loader} label={loaderLabel} />
                            )}
                            {isFetching && (
                                <p className={s.auth__status}>Syncing...</p>
                            )}
                            {(isError || isUpdateError || isDeleteError) && (
                                <p className={s.auth__error}>API request failed.</p>
                            )}
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Auth;
