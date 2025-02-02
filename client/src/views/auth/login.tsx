import {cn} from "@/lib/utils.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {ROUTES} from "@/constants/routes.ts";
import {FcGoogle} from "react-icons/fc";

const LoginForm = () => {
    return (
        <form className={cn("flex flex-col gap-6")}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="services@webxspark.com" required/>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" placeholder={'* * * * * * * *'}/>
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <div
                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
                >
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full">
                    <FcGoogle />
                    Continue with Google
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