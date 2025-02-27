import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Eye, Plus, Trash} from "lucide-react";
import {lazy, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import SuspenseWrapper from "@/components/internals/suspense-wrapper.tsx";

const NewAgentForm = lazy(() => import("@/views/dashboard/components/new-agent.tsx"));
const MyAgents = () => {
    const [addAgentModalDisplay, setAddAgentModalDisplay] = useState(false);
    // const
    return (
        <div>
            <div className={'mb-4 flex items-center justify-between'}>
                <h1 className={'text-xl font-semibold'}>My Agents</h1>
                <Button onClick={() => setAddAgentModalDisplay(true)} size={"sm"}><Plus/> New Agent</Button>
            </div>
            <div className={'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'}>
                <Card className={''}>
                    <CardHeader>
                        <CardTitle>Agent Name</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={'flex gap-1 justify-end'}>
                            <Button size={'sm'} variant={'destructive'}><Trash/></Button>
                            <Button size={"sm"}><Eye/> View</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

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
                        <div className={'max-h-[80dvh] overflow-y-scroll p-2'}><NewAgentForm callback={() => setAddAgentModalDisplay(false)}/></div>
                    </SuspenseWrapper>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyAgents;