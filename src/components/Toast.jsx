import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                '--toastify-color-success': '#00ff88',
                '--toastify-color-error': '#ff0055',
                '--toastify-color-info': '#00ffff',
                '--toastify-color-warning': '#ffaa00',
                '--toastify-icon-color-success': 'var(--toastify-color-success)',
                '--toastify-icon-color-error': 'var(--toastify-color-error)',
                '--toastify-icon-color-info': 'var(--toastify-color-info)',
                '--toastify-icon-color-warning': 'var(--toastify-color-warning)',
                '--toastify-text-color-dark': '#ffffff',
            }}
        />
    );
}