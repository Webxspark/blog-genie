import {cn} from "@/lib/utils.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {ROUTES} from "@/constants/routes.ts";
import {FormEvent, useRef, useState} from "react";
import {toast} from "sonner";
import {Loader} from "lucide-react";
import {login} from "@/share/apis.ts";
// import {APP_CONFIG} from "@/constants/app.config.ts";
import {useAdminStore} from "@/contexts/app-store.ts";

const LoginForm = () => {
    const emailRef = useRef<HTMLInputElement | null>(null),
        passwordRef = useRef<HTMLInputElement | null>(null)
    const setUser = useAdminStore(state => state.setUser)
    const [loading, setLoading] = useState(false);
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value,
            password = passwordRef.current?.value

        // validate form fields
        if (!email || !password) {
            toast.error('Please fill all fields')
            return
        }

        setLoading(true)
        login(email, password).then(response => {
            if (response.status === 200) {
                toast.success(response.msg)
                setUser({
                    access_token: response.access_token,
                    refresh_token: response.refresh_token
                })
                window.location.replace(ROUTES.dashboard.home)
            } else {
                toast.error(response.msg)
            }
        }).catch(err => {
            console.error(err)
            toast.error(err.message || "Something went wrong :( [D-500]")
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <form onSubmit={handleFormSubmit} className={cn("flex flex-col gap-6")}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input ref={emailRef} id="email" type="email" placeholder="services@webxspark.com"/>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input ref={passwordRef} id="password" type="password" placeholder={'* * * * * * * *'}/>
                </div>
                <Button disabled={loading} type="submit" className="w-full">
                    Login {loading && <Loader className={'animate-spin'}/>}
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={ROUTES.authentication.register} className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;