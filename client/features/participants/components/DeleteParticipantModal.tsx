import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { Participant } from '@/types/participant';

interface Props {
  showModal: boolean;
  participant: Participant | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteParticipantModal = ({ showModal, participant, onClose, onConfirm, isLoading }: Props) => {
  return (
      <DeleteConfirmModal
          isOpen={showModal}
          onClose={onClose}
          onConfirm={onConfirm}
          title="Delete Participant"
          message={`Are you sure you want to delete ${participant?.name}? This action cannot be undone.`}
          isLoading={isLoading}
      />
  );
};

export default DeleteParticipantModal;