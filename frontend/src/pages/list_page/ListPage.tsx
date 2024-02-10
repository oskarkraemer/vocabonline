import { useParams } from "react-router-dom";
import AppLayout from "../../AppLayout";
import { WordsTable } from "./WordsTable";

import api from '../../api/axiosConfig';
import { Translation } from "../../types";
import { useEffect, useState } from "react";
import { WordsTableSkeleton } from "./WordsTableSkeleton";
import ListPageHeader from "./ListPageHeader";
import { WarningModal } from "./WarningModal";
import { useUserSettings } from "@/lib/user_settings";

export default function ListPage() {
  const { listId } = useParams();
  const { userSettings, setUserSettings } = useUserSettings();

  const [translations, setTranslations] = useState<Translation[]>([]);

  const [listName, setListName] = useState();
  const [wordAmount, setWordAmount] = useState(0);

  const getTranslations = async () => {
    try {
      return await api.get(`/api/v1/translations/${listId}`).then((response) => {
        console.log("Fetched translations:");
        console.log(response.data);

        setTranslations(response.data);

        //set the list name and amount
        setListName(response.data[0].wordList.name);
        setWordAmount(response.data[0].wordList.translation_amount);

        return response.data;
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTranslations();
  }, []);
  
  return (
      <AppLayout>
          <WarningModal title="Be aware of the context" acceptedStore={userSettings.acceptedSynonymsWarning} setAcceptedStore={(state: boolean) => {setUserSettings({acceptedSynonymsWarning: state})}}>
              Please exercise caution when using the programmatically queried synonyms, antonyms, and definitions.
              While they can be helpful, they may not always accurately reflect the intended meaning within specific contexts.
              It's imperative to thoroughly understand the nuances and connotations of words before incorporating them into your communication or writing.
          </WarningModal>

          <ListPageHeader wordAmount={wordAmount} listName={listName!} listId={listId!} />

          <div className="mt-8" />

          {translations.length > 0 ?
            <WordsTable translations={translations} />
            :
            <WordsTableSkeleton />
          }
      </AppLayout>
  )
}