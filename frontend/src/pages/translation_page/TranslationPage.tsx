import { useEffect, useState } from "react";
import AppLayout from "../../AppLayout";

import api from '../../api/axiosConfig';
import { Translation } from "../../types";
import TranslationInfo from "./TranslationInfo";
import { useParams } from "react-router-dom";

export default function TranslationPage() {
    const { translationId } = useParams();

    const [translation, setTranslation] = useState<Translation>();

    const getTranslationInfo = async () => {
        try {
          return await api.get(`/api/v1/translations/${translationId}`).then((response) => {
            console.log("Fetched single translation:");
            console.log(response.data);
    
            setTranslation(response.data);
          });
        } catch (error) {
          console.error(error);
        }
      }
    
      useEffect(() => {
        getTranslationInfo();
      }, []);

    return (
    <AppLayout>
        <nav>
            <h1>{translation?.english}</h1>
        </nav>

        <TranslationInfo translation={translation!} />

        <div className="mt-8" />
    </AppLayout>
    )
}