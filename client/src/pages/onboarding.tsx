import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const OnBoarding = () => {

    const[formData, setFormData] = useState({
        name: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("User Data:", formData);
    };

    return (
        <div>
            <div className="flex items-center justify-center p-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>User Onboarding</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Agent Name (Nickname)</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="email">Agent Name (Nickname)</Label>
                                <Input required />
                            </div>
                            <div>
                                <Label htmlFor="phone">Agent Name (Nickname)</Label>
                                <Input required />
                            </div>
                            <Button type="submit" className="w-full bg-[#875bf7]">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OnBoarding;