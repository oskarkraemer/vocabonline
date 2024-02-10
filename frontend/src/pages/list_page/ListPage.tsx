import { useParams } from "react-router-dom";
import AppLayout from "../../AppLayout";
import { WordsTable } from "./WordsTable";
import { Button } from "../../components/ui/button";

import api from '../../api/axiosConfig';
import { Translation } from "../../types";
import { useEffect, useState } from "react";
import { WordsTableSkeleton } from "./WordsTableSkeleton";
import ListPageHeader from "./ListPageHeader";

export default function ListPage() {
  const { listId } = useParams();

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