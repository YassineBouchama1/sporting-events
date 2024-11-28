'use client'
import { memo, useState, useCallback } from 'react';
import { RiDeleteBin6Line, RiLoader2Fill } from 'react-icons/ri';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Participant } from '@/types/participant';
import { useParticipants } from '../hooks/useParticipants';
import Button from '@/components/Button';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { useDeleteParticipant } from '../hooks/useDeleteParticipant';


type SortField = 'name' | 'email';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
    field: SortField;
    order: SortOrder;
}

const ParticipantsTable = memo(() => {
    const { participants, isLoading } = useParticipants();
    const { deleteParticipant, isDeletingParticipant } = useDeleteParticipant();
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'name', order: 'asc' });

    const handleDeleteClick = useCallback((participant: Participant) => {
        setSelectedParticipant(participant);
        setShowDeleteModal(true);
    }, []);

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

    const getSortIcon = useCallback((field: SortField) => {
        if (sortConfig.field !== field) return <FaSort />;
        return sortConfig.order === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }, [sortConfig]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <RiLoader2Fill className="animate-spin text-4xl text-white" />
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden w-full">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                #
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-2">
                                    Name
                                    {getSortIcon('name')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('email')}
                            >
                                <div className="flex items-center gap-2">
                                    Email
                                    {getSortIcon('email')}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {sortedParticipants.map((participant, index) => (
                            <tr
                                key={participant._id}
                                className="hover:bg-gray-800 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                    {participant.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {participant.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button
                                        onClick={() => handleDeleteClick(participant)}
                                        danger

                                        disabled={isDeletingParticipant}
                                    >
                                        <RiDeleteBin6Line className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {participants.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                    No participants found
                </div>
            )}

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Participant"
                message={`Are you sure you want to delete ${selectedParticipant?.name}? This action cannot be undone.`}
                isLoading={isDeletingParticipant}
            />
        </div>
    );
});

ParticipantsTable.displayName = 'ParticipantsTable';

export default ParticipantsTable;