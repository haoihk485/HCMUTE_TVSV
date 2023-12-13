import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = () => {
    return <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={'absolute'}
    />
}

export default ToastMessage