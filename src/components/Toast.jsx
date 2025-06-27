import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';

export default function Toast() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            style={{
                '--toastify-color-dark': '#1c1c1c',
                '--toastify-color-success': 'var(--my-green)',
                '--toastify-color-error': '#ff0055',
                '--toastify-color-info': 'var(--my-cyan)',
                '--toastify-color-warning': '#ffaa00',
                '--toastify-icon-color-success': 'var(--my-green)',
                '--toastify-icon-color-error': '#ff0055',
                '--toastify-icon-color-info': 'var(--my-cyan)',
                '--toastify-icon-color-warning': '#ffaa00',
                '--toastify-text-color-dark': '#ffffff',
                '--toastify-font-family': 'inherit',
            }}
        />
    );
}