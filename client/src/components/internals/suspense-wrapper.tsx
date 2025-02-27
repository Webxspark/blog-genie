import {ReactNode, Suspense} from "react";
import PreLoader from "@/components/internals/pre-loader.tsx";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils.ts";

interface SuspenseWrapperProps {
    children: ReactNode;
    fallbackClassName?: string;
}

const SuspenseWrapper = ({children, fallbackClassName}: SuspenseWrapperProps) => {
    return (
        <Suspense
            fallback={<PreLoader className={cn('h-[90dvh]', fallbackClassName)}/>}
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