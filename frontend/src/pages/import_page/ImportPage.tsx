import { Label } from "@radix-ui/react-label";
import AppLayout from "../../AppLayout";
import api from '../../api/axiosConfig';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Axios, AxiosError } from "axios";

export default function ImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [listName, setListName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string |null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) {
            setFile(files[0]);
        }
    }

    function setResponse(status: "error" | "success", message: string) {
        setErrorMessage(null);
        setSuccessMessage(null);

        setLoading(false);

        if(status === "error") {
            setErrorMessage(message);
        } else {
            setSuccessMessage(message);
        }
    }

    async function submitUpload(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log(file, listName, username);

        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("username", username);
            formData.append("password", password);

            setLoading(true);

            return await api.post(`/api/v1/importer/upload_zorn/${listName}`, formData).then((response) => {
                console.log("Got response from file submission.");
                setLoading(false);
        
                if(response.status === 200) {
                    setResponse("success", "File uploaded successfully.");
                }
            }).catch((reason: AxiosError) => {
                if(reason.response && reason.response.status === 401) {
                    setResponse("error", "Invalid username or password.");
                } else {
                    setResponse("error", "Error uploading file: " + reason.message);
                }
            });
              
        }
    }

    return (
    <AppLayout>
        <nav>
            <h1>Import PDF</h1>
            <p className="text-muted-foreground text-md">Import PDF and convert it to a vocabulary list.</p>
        </nav>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
            <form onSubmit={submitUpload}>
                <Label htmlFor="voc-pdf">Vocabulary PDF</Label>
                <Input id="voc-pdf" type="file" required onChange={(e) => handleFileChange(e)} />

                <Label htmlFor="list-name">List name</Label>
                <Input id="list-name" type="text" required onChange={(e) => setListName(e.target.value)} />

                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" required onChange={(e) => setUsername(e.target.value)}/>

                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>

                <div className="flex items-center mt-2 gap-3">
                    <Button type="submit">Import</Button>
                    {loading && <LoadingSpinner />}
                </div>
                
            </form>

            <p className="text-red-500">{errorMessage}</p>
            <p className="text-green-500">{successMessage}</p>
        </div>
        
    </AppLayout>
    )
}