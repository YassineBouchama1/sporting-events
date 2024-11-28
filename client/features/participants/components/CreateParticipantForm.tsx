'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useCreateParticipant } from '../hooks/useCreateParticipant';
import { usePaticipantFormStore } from '../store/PaticipantFormStore';
import Input from '@/components/inputs/Input';

const createParticipantSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
});

type CreateParticipantForm = z.infer<typeof createParticipantSchema>;



const CreateParticipantForm = () => {
    const { isModalOpen, closeModal } = usePaticipantFormStore()

    const { createParticipant, isCreatingParticipant } = useCreateParticipant();

    // setup config fomr
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateParticipantForm>({
        resolver: zodResolver(createParticipantSchema),
    });


    // hanlde submit action
    const onSubmit = async (data: CreateParticipantForm) => {
        createParticipant(data, {
            onSuccess: () => {
                reset();
                closeModal();
            },
        });
    };


    return (
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}

        >
            <form
                onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h4 className='text-white font-bold'>Create New Participant</h4>
                <div>

                    <Input
                        label="Name"
                        id="name"
                        register={register}
                        errors={errors}
                    />
                </div>



                <Input
                    label="Email"
                    id="email"
                    register={register}
                    errors={errors}
                />



                <div className="flex justify-end gap-3">

                    <Button
                        type="submit"
                        disabled={isCreatingParticipant}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateParticipantForm;