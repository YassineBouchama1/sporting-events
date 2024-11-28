import { useState, useCallback, useMemo } from 'react';
import { Participant, SortConfig, SortField } from '@/types/participant';
import { useDeleteParticipant } from './useDeleteParticipant';


export const useParticipantsTable = (participants: Participant[]) => {
    const { deleteParticipant, isDeletingParticipant } = useDeleteParticipant();
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'name', order: 'asc' });

    const handleDeleteClick = useCallback((participant: Participant) => {
        setSelectedParticipant(participant);
        setShowDeleteModal(true);
    }, []);



    // handle  btn confirm delete
    const handleConfirmDelete = useCallback(() => {
        if (selectedParticipant) {
            deleteParticipant(selectedParticipant._id);
            setShowDeleteModal(false);
            setSelectedParticipant(null);
        }
    }, [selectedParticipant, deleteParticipant]);


    const handleSort = useCallback((field: SortField) => {
        setSortConfig(prevConfig => ({
            field,
            order: prevConfig.field === field && prevConfig.order === 'asc' ? 'desc' : 'asc'
        }));
    }, []);



    const sortedParticipants = [...participants].sort((a, b) => {
        const { field, order } = sortConfig;
        const compareResult = a[field].localeCompare(b[field]);
        return order === 'asc' ? compareResult : -compareResult;
    });

    return useMemo(() => ({
        sortConfig,
        handleSort,
        showDeleteModal,
        selectedParticipant,
        handleDeleteClick,
        handleConfirmDelete,
        setShowDeleteModal,
        sortedParticipants,
        isDeletingParticipant
    }), [
        sortConfig,
        handleSort,
        showDeleteModal,
        selectedParticipant,
        handleDeleteClick,
        handleConfirmDelete,
        setShowDeleteModal,
        sortedParticipants,
        isDeletingParticipant
    ]);
};