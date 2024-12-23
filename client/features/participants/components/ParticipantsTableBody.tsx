'use client'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import Button from '@/components/Button';
import { Participant } from '@/types/participant';
import { useState } from 'react';
import { useUpdateParticipant } from '../hooks/useUpdateParticipant';

interface Props {
    participants: Participant[];
    onDeleteClick: (participant: Participant) => void;
    isDeletingParticipant: boolean;
    isParticipantsLoading: boolean;
}

const ParticipantsTableBody = ({
    participants,
    onDeleteClick,
    isDeletingParticipant,
    isParticipantsLoading
}: Props) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const { updateParticipant, isUpdatingParticipant } = useUpdateParticipant(); // call function 



    // turn on edit mode
    const handleEditClick = (participant: Participant) => {
        setEditingId(participant._id);
        setEditName(participant.name);
    };



    // hanlde update click
    const handleUpdateClick = (id: string) => {
        updateParticipant(
            { id, updatedName: editName }, // pass  update data 
            {
                onSuccess: () => {
                    setEditingId(null);
                    setEditName("");
                }
            }
        );
    };


    // turn off mode edit
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditName("");
    };



    // skeleton loader
    if (isParticipantsLoading) {
        return (
            <tbody className="ltr:text-left rtl:text-right">
                {[...Array(5)].map((_, index) => (
                    <tr key={index} className="border-b ">

                        <td className=" py-4 h-4 ">
                            <div className="bg-gray-800 rounded-full text-gray-800">
                                loading...
                            </div>
                        </td>
                        <td className=" py-4 h-4 ">
                            <div className="px-4 bg-gray-800 rounded-full text-gray-800">
                                loading...
                            </div>
                        </td>
                        <td className=" py-4 h-4 ">
                            <div className="px-15 bg-gray-800 rounded-full text-gray-800">
                                loading...
                            </div>
                        </td>

                        <td className=" py-4  flex gap-x-2 w-full h-full items-center justify-center">
                            <div className="bg-gray-800 rounded-full text-gray-800 w-20 h-full">
                                loading...
                            </div>
                            <div className="bg-gray-800 rounded-full text-gray-800 w-20 h-full">
                                loading...
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>

        );
    }

    return (
        <tbody className="bg-gray-900 divide-y divide-gray-800">
            {participants.map((participant, index) => (
                <tr
                    key={participant._id}
                    className="hover:bg-gray-800/45 duration-300 transition-colors"
                >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {index + 1}
                    </td>
                    <td className="px-6 py-4 max-w-[20px] whitespace-nowrap text-sm text-white">
                        {editingId === participant._id ? (
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="bg-gray-700 text-white  rounded"
                                disabled={isUpdatingParticipant}
                            />
                        ) : (
                            participant.name
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {participant.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                        {editingId === participant._id ? (
                            <>
                                <Button
                                    onClick={() => handleUpdateClick(participant._id)}
                                    style="bg-green-600 hover:bg-green-700"
                                    disabled={isUpdatingParticipant}
                                >
                                    {isUpdatingParticipant ? 'Updating...' : 'Update'}
                                </Button>
                                <Button
                                    onClick={handleCancelEdit}
                                    style="bg-gray-600 hover:bg-gray-700"
                                    disabled={isUpdatingParticipant}
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => handleEditClick(participant)}
                                    style="bg-blue-600 hover:bg-blue-700"
                                >
                                    <FiEdit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => onDeleteClick(participant)}
                                    danger
                                    disabled={isDeletingParticipant}
                                >
                                    <RiDeleteBin6Line className="w-4 h-4" />
                                </Button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default ParticipantsTableBody;