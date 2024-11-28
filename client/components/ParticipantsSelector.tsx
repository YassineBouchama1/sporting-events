
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


        <div className=" flex flex-col py-4">
            <SimpleSelect
                disabled={isLoading || disabled}
                label="Select Participants"
                options={participantOptions}
                onChange={handleChange}
                value={selectedValues}
            />
        </div>


    );
};

export default ParticipantsSelector;