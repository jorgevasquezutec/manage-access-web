import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
};

const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = 'text',
    placeholder = ''
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className=''>
            <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                {label}
            </label>
            <input
                type={type}
                placeholder= {placeholder}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                {...register(name)}
            />
            {errors[name] && (
                <span className='text-red-500 text-xs pt-1 block'>
                    {errors[name]?.message as unknown as string}
                </span>
            )}
        </div>
    );
};
export default FormInput;