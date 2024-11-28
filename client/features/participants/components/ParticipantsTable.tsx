'use client'
import { memo } from 'react';
import { RiAddLine } from 'react-icons/ri';
import ParticipantsTableHeader from './ParticipantsTableHeader';
import ParticipantsTableBody from './ParticipantsTableBody';
import DeleteParticipantModal from './DeleteParticipantModal';

import Button from '@/components/Button';
import { useParticipants } from '../hooks/useParticipants';
import { useParticipantsTable } from '../hooks/useParticipantsTable';
import CreateParticipantForm from './CreateParticipantForm';
import { usePaticipantFormStore } from '../store/PaticipantFormStore';

const ParticipantsTable = memo(() => {
    const { participants, isLoading } = useParticipants();
    const { openModal } = usePaticipantFormStore()

    const {
        sortConfig,
        handleSort,
        showDeleteModal,
        selectedParticipant,
        handleDeleteClick,
        handleConfirmDelete,
        setShowDeleteModal,
        sortedParticipants,
        isDeletingParticipant
    } = useParticipantsTable(participants);








    return (
        <div className="space-y-4 w-full">
            <div className="flex justify-end">
                <Button
                    onClick={() => openModal()}
                    style="flex items-center gap-2"
                >
                    <RiAddLine className="w-5 h-5" />
                    Add Participant
                </Button>
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden w-full">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <ParticipantsTableHeader
                            sortConfig={sortConfig}
                            handleSort={handleSort}
                        />
                        <ParticipantsTableBody
                            participants={sortedParticipants}
                            onDeleteClick={handleDeleteClick}
                            isDeletingParticipant={isDeletingParticipant}
                            isParticipantsLoading={isLoading}

                        />
                    </table>
                </div>

                {!isLoading && participants.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        No participants found
                    </div>
                )}

                <DeleteParticipantModal
                    showModal={showDeleteModal}
                    participant={selectedParticipant}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDelete}
                    isLoading={isDeletingParticipant}
                />

                <CreateParticipantForm
                />
            </div>
        </div>
    );
});

ParticipantsTable.displayName = 'ParticipantsTable';

export default ParticipantsTable;