import { FormEvent, useEffect, useState } from 'react';
import s from './EditAppTitle.module.scss';
import {
    useDeleteAppTitleMutation,
    useGetAppDataQuery,
    useUpdateAppTitleMutation
} from '../../modules/api/auth';
import UiButton from '../../shared/ui/Button/UiButton.tsx';
import UiLoader from '../../shared/ui/Loader/UiLoader.tsx';

const SUBMIT_PREVIEW_DELAY = 1200;

const wait = (delay: number) => new Promise(resolve => {
    window.setTimeout(resolve, delay);
});

const EditAppTitle = () => {
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

    if (isLoading) {
        return <UiLoader label="Loading app title..." />;
    }

    return (
        <form className={s.editor__form} onSubmit={handleSubmit}>
            <div className={s.editor__eyebrow}>Application settings</div>
            <h1 className={s.editor__title}>
                {data?.title || 'Title is empty'}
            </h1>
            <p className={s.editor__description}>
                Give your application a name. You can change it whenever you need.
            </p>
            <label className={s.editor__field}>
                <span>App title</span>
                <input
                    value={title}
                    disabled={isSubmitting}
                    placeholder="Enter your application title"
                    aria-describedby="app-title-hint"
                    onChange={event => setTitle(event.target.value)}
                />
                <span id="app-title-hint" className={s.editor__hint}>
                    Changes are applied when you save.
                </span>
            </label>
            <div className={s.editor__actions}>
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
                <UiLoader className={s.editor__loader} label={loaderLabel} />
            )}
            {isFetching && (
                <p className={s.editor__status}>Syncing...</p>
            )}
            {(isError || isUpdateError || isDeleteError) && (
                <p className={s.editor__error} role="alert">API request failed.</p>
            )}
        </form>
    );
};

export default EditAppTitle;
