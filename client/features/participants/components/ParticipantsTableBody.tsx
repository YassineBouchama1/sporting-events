import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from '@/components/Button';
import { Participant } from '@/types/participant';

interface Props {
    participants: Participant[];
    onDeleteClick: (participant: Participant) => void;
    isDeletingParticipant: boolean;
}

const ParticipantsTableBody = ({ participants, onDeleteClick, isDeletingParticipant }: Props) => {
    return (
        <tbody className="bg-gray-800 divide-y divide-gray-800">
            {participants.map((participant, index) => (
                <tr
                    key={participant._id}
                    className="hover:bg-gray-900/85 transition-colors"
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
                            onClick={() => onDeleteClick(participant)}
                            danger
                            disabled={isDeletingParticipant}
                        >
                            <RiDeleteBin6Line className="w-4 h-4" />
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default ParticipantsTableBody;