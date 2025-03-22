import {useCallback, useEffect, useRef, useState} from "react";
import PreLoader from "@/components/internals/pre-loader.tsx";
import {ITimelinePosts} from "@/share/responses";
import {fetchTimelines} from "@/share/apis.ts";
import {useAdminStore} from "@/contexts/app-store.ts";
import {toast} from "sonner";

const Timelines = () => {
    const [loading, setLoading] = useState(false)
    const isMounted = useRef(false)
    const [timelines, setTimelines] = useState<ITimelinePosts>([])
    const user = useAdminStore(state => state.user)
    const middleware = useCallback(() => {
        setLoading(true)
        fetchTimelines(user?.access_token || "").then(response => {
            if(response.status === 200){
                setTimelines(response.data)
            } else {
                toast.error(response.msg)
            }
        }).catch(err => {
            console.error(err)
            toast.error(err.message || "Something went wrong! [D-500]")
        }).finally(() => {
            setLoading(false)
        })
    }, [user?.access_token])
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            middleware()
        }
    }, [middleware]);
    return (
        <div>
            {loading && <PreLoader className={'h-[40dvh]'} />
                || <div>
                    {timelines.length !== 0 && <>
                        hi
                        </>
                        || <div className={'flex flex-col items-center justify-center h-[40dvh]'}>
                            <h1 className={'text-xl font-semibold'}>No timelines available</h1>
                            <p className={'text-sm text-muted-foreground'}>You have no timelines yet.</p>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Timelines;