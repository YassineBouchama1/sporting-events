'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useCreateParticipant } from '../hooks/useCreateParticipant';
import { usePaticipantFormStore } from '../store/PaticipantFormStore';

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
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-200"
                    >
                        Name
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-200"
                    >
                        Email
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

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