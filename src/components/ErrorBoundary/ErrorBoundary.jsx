import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flip, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './custom-toast.css';

// import SuccessIcon from '../../assets/icons/successIcon.svg';
// import ErrorIcon from '../../assets/icons/errorIcon.svg';

const CustomToast = ({ message, type }) => {
    return (
        <div className="custom-toast">
            {/* <img
                src={type === "success" ? SuccessIcon : ErrorIcon}
                alt={type === "success" ? "Success" : "Error"}
                className="toast-icon"
            /> */}
            <p className="toast-message">{message}</p>
        </div>
    );
};

const withErrorHandling = WrappedComponent => ({
    error,
    success,
    message,
    children,
    clearErrorMessage,
    clearSuccessMessage,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (error && message) {
            toast.error(<CustomToast message={message} type="error" />, {
                icon: false,
                onClose: () => {
                    dispatch(clearErrorMessage && clearErrorMessage());
                },
            });
            return;
        }
        if (success && message) {
            toast.success(<CustomToast message={message} type="success" />, {
                icon: false,
                onClose: () => {
                    dispatch(clearSuccessMessage && clearSuccessMessage());
                },
            });
            return;
        }
        return () => { }
    }, [error, success, message]);

    return (
        <WrappedComponent>
            <>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Flip}

                ></ToastContainer>
            </>
            {children}
        </WrappedComponent>
    );
};

const ErrorBoundary = withErrorHandling(({ children }) => (
    <>{children}</>
));

export default ErrorBoundary;