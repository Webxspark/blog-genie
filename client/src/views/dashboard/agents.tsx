import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Eye, Plus} from "lucide-react";
import {lazy, useCallback, useEffect, useRef, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import SuspenseWrapper from "@/components/internals/suspense-wrapper.tsx";
import PreLoader from "@/components/internals/pre-loader.tsx";
import {fetchAgents} from "@/share/apis.ts";
import {useAdminStore} from "@/contexts/app-store.ts";
import {IAgentListFetchResp} from "@/share/responses";
import {toast} from "sonner";

const NewAgentForm = lazy(() => import("@/views/dashboard/components/new-agent.tsx"));
const MyAgents = () => {
    const [addAgentModalDisplay, setAddAgentModalDisplay] = useState(false);
    const [loading, setLoading] = useState(false);
    const isMounted = useRef(false)
    const user = useAdminStore(state => state.user)
    const [data, setData] = useState<IAgentListFetchResp['data']>([])
    const [viewAgentModalDisplay, setViewAgentModalDisplay] = useState<IAgentListFetchResp['data'][0] | boolean>(false)
    // const [editAgentDetails, setEditAgentDetails] = useState<IAgentListFetchResp['data'][0]>();
    const _fetchAgents = useCallback(() => {
        fetchAgents(user?.access_token || "")
            .then(response => {
                if (response.status !== 200) {
                    toast.error(response.msg || "Something went wrong!")
                } else {
                    setData(response.data)
                }
            })
            .catch(err => {
                console.error(err)
                toast.error("Something went wrong while fetching agent's list. [D-500]")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [user?.access_token])
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            setLoading(true)
            // fetch agents
            _fetchAgents()
        }
    }, [_fetchAgents, isMounted]);

    const addModalCallback = () => {
        setAddAgentModalDisplay(false)
        _fetchAgents()
    }
    return (
        <div>
            <div className={'mb-4 flex items-center justify-between'}>
                <h1 className={'text-xl font-semibold'}>My Agents</h1>
                <Button onClick={() => setAddAgentModalDisplay(true)} size={"sm"}><Plus/> New Agent</Button>
            </div>
            {
                loading && <PreLoader className={'h-[40dvh]'}/>
                || <div>
                    {
                        data.length > 0 && <div className={'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'}>
                            {
                                data.map((agent, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle>{agent.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className={'flex gap-1 justify-end'}>
                                                {/*<Button size={'sm'} variant={'destructive'}><Trash/></Button>*/}
                                                <Button onClick={() => setViewAgentModalDisplay(agent)} size={"sm"}><Eye/> View</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>
                        || <div className={"flex items-center justify-center h-[20dvh]"}>
                            <h1 className={'text-lg font-semibold text-muted-foreground'}>No Agents found!</h1>
                        </div>
                    }
                </div>
            }

            <Dialog
                open={addAgentModalDisplay}
                onOpenChange={setAddAgentModalDisplay}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add New Agent
                        </DialogTitle>
                    </DialogHeader>
                    <SuspenseWrapper fallbackClassName={'h-[40dvh]'}>
                        <div className={'max-h-[80dvh] overflow-y-scroll p-2'}>
                            <NewAgentForm
                                callback={addModalCallback}/>
                        </div>
                    </SuspenseWrapper>
                </DialogContent>
            </Dialog>
            <Dialog
                open={viewAgentModalDisplay !== false}
                onOpenChange={setViewAgentModalDisplay}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            View Agent
                        </DialogTitle>
                    </DialogHeader>
                    <div className={'max-h-[80dvh] overflow-y-scroll p-2'}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={'grid gap-2'}>
                                    <div>
                                        <h1 className={'text-sm text-muted-foreground'}>Name</h1>
                                        <p>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.name}</p>
                                    </div>
                                    <div>
                                        <h1 className={'text-sm text-muted-foreground'}>Instructions</h1>
                                        <p>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.instructions}</p>
                                    </div>
                                    <div>
                                        <h1 className={'text-sm text-muted-foreground'}>Post Frequency</h1>
                                        <p>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.postfreq}</p>
                                    </div>
                                    <div>
                                        <h1 className={'text-sm text-muted-foreground'}>Company Name</h1>
                                        <p>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.cname}</p>
                                    </div>
                                    <div>
                                        <h1 className={'text-sm text-muted-foreground'}>Company Niche</h1>
                                        <p>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.cniche}</p>
                                    </div>
                                    <div>
                                        <h1 className={'text-sm text-muted-foreground'}>Company Description</h1>
                                        <p>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.cdescription}</p>
                                    </div>
                                    <div>
                                        <h1 className={'text-sm text-muted-foreground'}>Blog Category</h1>
                                        <p>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.blogcat}</p>
                                    </div>
                                    <div>
                                        <h1 className={'text-sm text-muted-foreground'}>Blog Description</h1>
                                        <p>{(viewAgentModalDisplay as IAgentListFetchResp['data'][0])?.blogdesc}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyAgents;