import { Label } from "@radix-ui/react-label";
import AppLayout from "../../AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ImportPage() {

    return (
    <AppLayout>
        <nav>
            <h1>Import PDF</h1>
            <p className="text-muted-foreground text-md">Import PDF and convert it to a vocabulary list.</p>
        </nav>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
            <Label htmlFor="voc-pdf">Vocabulary PDF</Label>
            <Input id="voc-pdf" type="file" />

            <Label htmlFor="list-name">List name</Label>
            <Input id="list-name" type="text" />

            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />

            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />

            <Button className="mt-2">Import</Button>
        </div>
        
    </AppLayout>
    )
}