import { memo } from 'react';
import { Dialog } from '@headlessui/react';
import { RiLoader2Fill } from 'react-icons/ri';
import Button from './Button';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading?: boolean;
}

const DeleteConfirmModal = memo<DeleteConfirmModalProps>(({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isLoading = false,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-sm rounded bg-gray-900 p-6">
                    <Dialog.Title className="text-lg font-medium text-white mb-4">
                        {title}
                    </Dialog.Title>

                    <p className="text-gray-300 mb-6">
                        {message}
                    </p>

                    <div className="flex justify-end gap-4">
                        <Button
                            onClick={onClose}

                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            danger
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <RiLoader2Fill className="animate-spin" />
                                    Deleting...
                                </div>
                            ) : (
                                'Delete'
                            )}
                        </Button>
                    </div>
                </Dialog.Panel>
            </div >
        </Dialog >
    );
});

DeleteConfirmModal.displayName = 'DeleteConfirmModal';

export default DeleteConfirmModal;