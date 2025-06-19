import { toast } from 'react-toastify';

export default function useToast() {
    const success = (message) => {
        toast.success(message);
    };

    const error = (message) => {
        toast.error(message);
    };

    const info = (message) => {
        toast.info(message);
    };

    const warning = (message) => {
        toast.warning(message);
    };

    const loading = (message) => {
        return toast.loading(message);
    };

    const update = (toastId, message, type = 'success') => {
        toast.update(toastId, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: 3000,
        });
    };

    return {
        success,
        error,
        info,
        warning,
        loading,
        update
    };
}