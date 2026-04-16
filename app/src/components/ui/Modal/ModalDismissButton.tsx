import {FC} from 'react';
import UiButton, {ButtonProps} from '../Button/UiButton.tsx';

type Props = {
    closeModal: () => void;
}

const ModalDismissButton: FC<ButtonProps & Props> = ({ children, closeModal, ...props }) => {
    return (
        <UiButton {...props} onClick={closeModal}>
            {children}
        </UiButton>
    );
};

export default ModalDismissButton;
