import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import PreLoader from "@/components/internals/pre-loader.tsx";
import {IAgentListFetchResp, ITimelinePosts, ITimelineScheduleChunk} from "@/share/responses";
import {createNewTimeline, deleteTimeline, fetchAgents, fetchTimelines} from "@/share/apis.ts";
import {useAdminStore} from "@/contexts/app-store.ts";
import {toast} from "sonner";
import {Alert, Collapse, Modal, Tag, Timeline} from "antd"
import {Button} from "@/components/ui/button.tsx";
import {Calendar, LoaderCircle, Sparkles, Trash} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CheckCircleOutlined, ClockCircleOutlined} from "@ant-design/icons"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

const Timelines = () => {
    const [loading, setLoading] = useState(false)
    const [agentsLoading, setAgentsLoading] = useState(false)
    const isMounted = useRef(false)
    const [timelines, setTimelines] = useState<ITimelinePosts>([])
    const [agentsList, setAgentsList] = useState<IAgentListFetchResp['data']>([])
    const user = useAdminStore(state => state.user)
    const [generateTimelineDialogOpen, setGenerateTimelineDialogOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<string>("");
    const middleware = useCallback(() => {
        setLoading(true)
        fetchTimelines(user?.access_token || "").then(response => {
            if (response.status === 200) {
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
    useEffect(() => {
        if (generateTimelineDialogOpen && agentsList.length === 0) {
            setAgentsLoading(true)
            fetchAgents(user?.access_token || "").then(response => {
                if (response.status === 200) {
                    setAgentsList(response.data)
                } else {
                    toast.error(response.msg)
                }
            }).catch(err => {
                console.error(err)
                toast.error(err.message || "Something went wrong! [D-500]")
            }).finally(() => {
                setAgentsLoading(false)
            })
        }
    }, [agentsList, generateTimelineDialogOpen, user?.access_token]);
    const handleGenerateTimeline = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedAgent) {
            toast.info('Please select an agent')
            return
        }
        setLoading(true);
        createNewTimeline(selectedAgent, user?.access_token || "")
            .then(response => {
                if (response.status === 201) {
                    toast.success(response.msg)
                    setGenerateTimelineDialogOpen(false)
                    middleware()
                } else {
                    toast.error(response.msg)
                }
            })
            .catch(err => {
                console.error(err)
                toast.error(err.message || "Something went wrong! [D-500]")
            })
            .finally(() => setLoading(false))
    }
    return (
        <div>
            <div className={'flex items-center justify-between mb-4'}>
                <h1 className={'text-xl font-semibold'}>My Timelines</h1>
                <Button onClick={() => setGenerateTimelineDialogOpen(true)}><Sparkles/> Generate</Button>
            </div>
            {loading && <PreLoader className={'h-[40dvh]'}/>
                || <div>
                    {timelines.length !== 0 && <div className={'grid lg:grid-cols-2 gap-6'}>
                            {timelines.map((timeline, index) => {
                                const schedules = JSON.parse(timeline.schedule as string) as ITimelineScheduleChunk[];
                                return (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className={'flex justify-between items-center'}>
                                                <span>{timeline.agent.name} ({timeline.agent.cname})</span>
                                                <Button
                                                    onClick={() => Modal.confirm({
                                                        title: "Are you sure to delete this timeline?",
                                                        content: "This action is irreversible",
                                                        okText: "Delete",
                                                        okType: "danger",
                                                        cancelText: "Cancel",
                                                        onOk: () => {
                                                            setLoading(true)
                                                            deleteTimeline(user?.access_token || "", timeline.token)
                                                                .then(response => {
                                                                    if (response.status === 200) {
                                                                        toast.success(response.msg)
                                                                        middleware()
                                                                    } else {
                                                                        toast.error(response.msg)
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    console.error(err)
                                                                    toast.error(err.message || "Something went wrong! [D-500]")
                                                                })
                                                                .finally(() => setLoading(false))
                                                        }
                                                    })}
                                                    size={"icon"}
                                                    variant={"ghost"}
                                                >
                                                    <Trash />
                                                </Button>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className={'h-[80dvh] overflow-y-scroll'}>
                                            <Timeline
                                                className={'!py-5'}
                                                items={
                                                    schedules.map((schedule, i) => (
                                                        {
                                                            key: i,
                                                            children: <Card>
                                                                <div className={'p-2 px-4'}>
                                                                    <div className={'flex items-center justify-between'}>
                                                                        <div className={'flex items-center gap-2'}>
                                                                            <Calendar
                                                                                className={'size-4'}/>
                                                                            {schedule.date}
                                                                        </div>
                                                                        <Tag
                                                                            color={schedule.posted ? "green" : "default"}
                                                                            icon={schedule.posted ? <CheckCircleOutlined/> :
                                                                                <ClockCircleOutlined/>}
                                                                        >
                                                                            {schedule.posted ? "uploaded" : "waiting"}
                                                                        </Tag>
                                                                    </div>
                                                                    <div className={'my-1 mt-3'}>
                                                                        {schedule.posts.length > 0 && <Collapse
                                                                                ghost={true}
                                                                                items={
                                                                                    schedule.posts.map((post, id) => (
                                                                                        {
                                                                                            key: id,
                                                                                            label: post.title,
                                                                                            children: <Table>
                                                                                                <TableHeader>
                                                                                                    <TableRow>
                                                                                                        <TableHead
                                                                                                            className={'w-[30%]'}>Key</TableHead>
                                                                                                        <TableHead>Value</TableHead>
                                                                                                    </TableRow>
                                                                                                </TableHeader>
                                                                                                <TableBody>
                                                                                                    <TableRow>
                                                                                                        <TableCell>Description</TableCell>
                                                                                                        <TableCell>{post.description}</TableCell>
                                                                                                    </TableRow>
                                                                                                    <TableRow>
                                                                                                        <TableCell>Thumbnail
                                                                                                            Prompts</TableCell>
                                                                                                        <TableCell>
                                                                                                            <ul className={'list-disc'}>
                                                                                                                {
                                                                                                                    post.thumbnail_prompts.map((prompt, index) => (
                                                                                                                        <li key={index}>{prompt}</li>
                                                                                                                    ))
                                                                                                                }
                                                                                                            </ul>
                                                                                                        </TableCell>
                                                                                                    </TableRow>
                                                                                                    <TableRow>
                                                                                                        <TableCell>Tags</TableCell>
                                                                                                        <TableCell>{post.tags.map((tag, index) => (
                                                                                                            <Tag key={index}
                                                                                                                 color={'purple'}>#{tag}</Tag>
                                                                                                        ))}</TableCell>
                                                                                                    </TableRow>
                                                                                                </TableBody>
                                                                                            </Table>
                                                                                        }
                                                                                    ))
                                                                                }
                                                                            />
                                                                            || <Alert
                                                                                message={"No posts was scheduled for this date"}
                                                                                type={"info"}
                                                                            />
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Card>,
                                                        }
                                                    ))
                                                }
                                            />
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                        || <div className={'flex flex-col items-center justify-center h-[40dvh]'}>
                            <h1 className={'text-xl font-semibold'}>No timelines available</h1>
                            <p className={'text-sm text-muted-foreground'}>You have no timelines yet.</p>
                        </div>
                    }
                </div>
            }

            <Dialog open={generateTimelineDialogOpen} onOpenChange={setGenerateTimelineDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Generate Timeline
                        </DialogTitle>
                        <DialogDescription>
                            The timeline will be generated based on the Agent's details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleGenerateTimeline} className={'space-y-3'}>
                        <div className={'space-y-1'}>
                            <Label htmlFor={'agentList'} className={'flex items-center gap-2'}>
                                Select an Agent {agentsLoading && <LoaderCircle size={15} className={'animate-spin'}/>}
                            </Label>
                            <Select value={selectedAgent!} onValueChange={setSelectedAgent} disabled={agentsLoading}>
                                <SelectTrigger id="agentList">
                                    <SelectValue placeholder={'Pick one'}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        agentsList.map((agent, index) => (
                                            <SelectItem key={index}
                                                        value={agent.tag}>{agent.name} - {agent.cname}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={'flex justify-end'}>
                            <Button disabled={loading}>
                                {loading && <LoaderCircle className={'animate-spin'}/> || <Sparkles/>}
                                Generate Timeline
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Timelines;