import {LoaderCircle} from "lucide-react";
import {cn} from "@/lib/utils.ts";

export interface PreLoaderProps {
    className?: string;
    loadingText?: string;
    loaderClassName?: string;
    loadingTextClassName?: string;
}

const PreLoader = ({
                       loaderClassName, loadingTextClassName, loadingText, className
                   }: PreLoaderProps) => {
    return (
        <div className={cn('flex justify-center items-center gap-2', className)}>
            <LoaderCircle className={cn('animate-spin', loaderClassName)}/>
            <span className={cn("animate-pulse", loadingTextClassName)}>{loadingText || "Loading..."}</span>
        </div>
    );
};

export default PreLoader;