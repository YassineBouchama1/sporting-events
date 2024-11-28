
import React, { useMemo } from 'react';
import { useParticipants } from '@/hooks/useParticipants';
import SimpleSelect from './inputs/SimpleSelect';

interface Participant {
    _id: string;
    name: string;
}

interface ParticipantOption {
    value: string;
    label: string;
}

interface ParticipantsSelectorProps {
    participantIds: string[];
    onParticipantsChange: (participantIds: string[]) => void;
    disabled?: boolean;
}

const ParticipantsSelector: React.FC<ParticipantsSelectorProps> = ({
    participantIds,
    onParticipantsChange,
    disabled
}) => {
    const { data: participants = [], isLoading } = useParticipants();

    // Memoize participant options to prevent unnecessary recalculations
    const participantOptions = useMemo(() =>
        participants.map((user: Participant) => ({
            value: user._id,
            label: user.name
        })),
        [participants]
    );

    // Memoize selected values for the Select component
    const selectedValues = useMemo(() =>
        participantOptions.filter(option =>
            participantIds.includes(option.value)
        ),
        [participantOptions, participantIds]
    );

    const handleChange = (selectedOptions: ParticipantOption[]) => {
        const newParticipantIds = selectedOptions.map(option => option.value);
        onParticipantsChange(newParticipantIds);
    };

    return (
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">

                <div className="mt-10 flex flex-col gap-y-8">
                    <SimpleSelect
                        disabled={isLoading || disabled}
                        label="Participants"
                        options={participantOptions}
                        onChange={handleChange}
                        value={selectedValues}
                    />
                </div>
            </div>
        </div>
    );
};

export default ParticipantsSelector;