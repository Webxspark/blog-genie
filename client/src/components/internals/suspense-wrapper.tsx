import {ReactNode, Suspense} from "react";
import PreLoader from "@/components/internals/pre-loader.tsx";

interface SuspenseWrapperProps {
    children: ReactNode;
}

const SuspenseWrapper = ({children}: SuspenseWrapperProps) => {
    return (
        <Suspense
            fallback={<PreLoader className={'h-[90dvh]'}/>}
        >
            {children}
        </Suspense>
    );
};

export default SuspenseWrapper;