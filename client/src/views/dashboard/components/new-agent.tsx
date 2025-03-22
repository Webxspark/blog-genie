import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {FormEvent, useEffect, useRef, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {APP_CONFIG} from "@/constants/app.config.ts";
import {Loader} from "lucide-react";
import {toast} from "sonner";
import {createNewAgent} from "@/share/apis.ts";
import {useAdminStore} from "@/contexts/app-store.ts";
import {IAgentListFetchResp} from "@/share/responses";

interface newAgentFormProps {
    callback: () => void;
    agent ?: IAgentListFetchResp['data'][0]
}
const NewAgentForm = ({callback, agent}: newAgentFormProps) => {
    const [agentName, setAgentName] = useState("");
    const [agentInstructions, setAgentInstructions] = useState("");
    const [postFrequency, setPostFrequency] = useState(1);
    const [companyName, setCompanyName] = useState("");
    const [companyNiche, setCompanyNiche] = useState("");
    const [companyAboutUs, setCompanyAboutUs] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogDescription, setBlogDescription] = useState("");

    const [loading, setLoading] = useState(false)
    const user = useAdminStore(store => store.user)

    const isMounted = useRef(false)

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            if (agent) {
                setAgentName(agent.name)
                setAgentInstructions(agent.instructions)
                setPostFrequency(agent.postfreq)
                setCompanyName(agent.cname)
                setCompanyNiche(agent.cniche)
                setCompanyAboutUs(agent.cdescription)
                setBlogCategory(agent.blogcat)
                setBlogDescription(agent.blogdesc)
            }
        }
    }, [agent]);

    const handleFormSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //validate
        if (!agentName || !companyName || !companyNiche || !companyAboutUs || !blogCategory || !blogDescription) {
            toast.error('Please fill all fields')
            return
        }
        setLoading(true)
        createNewAgent(JSON.stringify({
            name: agentName,
            instructions: agentInstructions || "-",
            postfreq: postFrequency,
            cname: companyName,
            cniche: companyNiche,
            cdescription: companyAboutUs,
            blogcat: blogCategory,
            blogdesc: blogDescription
        }), user?.access_token || "").then(resp => {
            if(resp.status === 201){
                toast.success(resp.msg)
                callback()
            } else {
                toast.error(resp.msg || "Something went wrong while creating agent!")
            }
        }).catch(err => {
            console.error(err)
            toast.error(err.message || "Something went wrong :( [D-500]")
        }).finally(() => setLoading(false))
    }
    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleFormSubmit} className="space-y-3 w-full">
                <div className={'flex flex-col gap-2'}>
                    <Label htmlFor="name">Agent Name</Label>
                    <Input
                        id="name"
                        placeholder={"Ex: Automation Bot"}
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <Label htmlFor="instructions">Agent Instructions <i>(optional)</i></Label>
                    <Textarea
                        id="instructions"
                        placeholder={"Ex: You are a professional copywriter with some humor and sarcasm"}
                        className={'resize-none'}
                        value={agentInstructions}
                        onChange={(e) => setAgentInstructions(e.target.value)}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <Label htmlFor="postFreq">Post Frequency</Label>
                    <Slider
                        id="postFreq"
                        max={5}
                        min={1}
                        value={[postFrequency]}
                        onValueChange={(value) => setPostFrequency(value[0])}
                    />
                    <span className={'text-right'}>
                        {postFrequency} post(s) per day
                    </span>
                </div>
                <div className={'flex flex-col gap-2'}>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                        id="companyName"
                        placeholder={"Ex: Webxspark"}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <Label htmlFor="companyNiche">Company Niche</Label>
                    <Input
                        id="companyNiche"
                        placeholder={"Ex: ebook, ebook publishing"}
                        value={companyNiche}
                        onChange={(e) => setCompanyNiche(e.target.value)}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <Label htmlFor="companyAboutUs">About Company</Label>
                    <Textarea
                        id="companyAboutUs"
                        placeholder={"Ex: Giving readers and authors the best experience to publish and read ebooks"}
                        className={'resize-none'}
                        value={companyAboutUs}
                        onChange={(e) => setCompanyAboutUs(e.target.value)}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <Label htmlFor="companyNiche">Blog Category</Label>
                    <Select
                        onValueChange={setBlogCategory}
                        value={blogCategory}
                    >
                        <SelectTrigger className={'w-full'}>
                            <SelectValue placeholder={'Choose a category'} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                APP_CONFIG.CONSTANTS.agent.blogCategories.map((category, index) => (
                                    <SelectItem key={index} value={category}>{category}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className={'flex flex-col gap-2'}>
                    <Label htmlFor="companyNiche">Blog Description</Label>
                    <Textarea
                        id="companyNiche"
                        placeholder={"Ex: This blog is about ..."}
                        className={'resize-none'}
                        value={blogDescription}
                        onChange={(e) => setBlogDescription(e.target.value)}
                    />
                </div>

                <div className={'flex justify-end pt-2'}>
                    <Button disabled={loading} type="submit">{loading && <Loader className={'animate-spin'} />} Create</Button>
                </div>
            </form>
        </div>
    );
};

export default NewAgentForm;