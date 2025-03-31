import {ReactNode} from 'react';
import {Toaster} from "@/components/ui/sonner";

const ToastProvider = ({children}: {children: ReactNode}) => {
    return (
        <>
            {children}
            <Toaster
                position={'bottom-center'}
                closeButton={true}
            />
        </>
    );
};

export default ToastProvider;
