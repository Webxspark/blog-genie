import {cn} from "@/lib/utils.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "@/constants/routes.ts";
import {FormEvent, useRef, useState} from "react";
import {toast} from "sonner";
import {signup} from "@/share/apis.ts";

const RegisterForm = () => {
    const emailRef = useRef<HTMLInputElement | null>(null),
        usernameRef = useRef<HTMLInputElement | null>(null),
        passwordRef = useRef<HTMLInputElement | null>(null),
        confirmPasswordRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = usernameRef.current?.value,
            email = emailRef.current?.value,
            password = passwordRef.current?.value,
            confirmPassword = confirmPasswordRef.current?.value
        // validate
        if (!username || !email || !password || !confirmPassword) {
            toast.error('Please fill all fields')
            return
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)
        signup(username, email, password).then(resp => {
            toast.success(resp.msg)
            navigate(ROUTES.authentication.login)
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
                <h1 className="text-2xl font-bold">
                    Register for an account
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to register for an account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input ref={usernameRef} id="username" type="text" placeholder="John Doe"/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input ref={emailRef} id="email" type="email" placeholder="services@webxspark.com"/>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">New Password</Label>
                    </div>
                    <Input ref={passwordRef} id="password" type="password" placeholder={'* * * * * * * *'}/>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Confirm New Password</Label>
                    </div>
                    <Input ref={confirmPasswordRef} id="password" type="password" placeholder={'* * * * * * * *'}/>
                </div>
                <Button disabled={loading} type="submit" className="w-full">
                    Register {loading && <Loader className={'animate-spin'}/>}
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={ROUTES.authentication.login} className="underline underline-offset-4">
                    Sign In
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;