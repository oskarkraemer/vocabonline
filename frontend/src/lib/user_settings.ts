import { useState, useEffect } from "react";

export type UserSettings = {
    acceptedSynonymsWarning: boolean;
}

const initialState: UserSettings = {acceptedSynonymsWarning: false};

export const useUserSettings = () => {
    const [userSettings, setUserSettings] = useState<UserSettings>(() => {
        const saved = localStorage.getItem("userSettings");
        return saved ? JSON.parse(saved) : initialState;
    });

    useEffect(() => {
        localStorage.setItem("userSettings", JSON.stringify(userSettings));
    }, [userSettings]);

    return { userSettings, setUserSettings };
};