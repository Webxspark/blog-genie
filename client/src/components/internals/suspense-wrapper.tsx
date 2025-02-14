import {ReactNode, Suspense} from "react";
import PreLoader from "@/components/internals/pre-loader.tsx";
import {motion} from "framer-motion";

interface SuspenseWrapperProps {
    children: ReactNode;
}

const SuspenseWrapper = ({children}: SuspenseWrapperProps) => {
    return (
        <Suspense
            fallback={<PreLoader className={'h-[90dvh]'}/>}
        >
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1.3, ease: "easeInOut"}}
            >
                {children}
            </motion.div>
        </Suspense>
    );
};

export default SuspenseWrapper;