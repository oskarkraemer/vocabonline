import { useParams } from "react-router-dom";
import AppLayout from "../../AppLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Skeleton } from "../../components/ui/skeleton";

import api from '../../api/axiosConfig';
import { Translation } from "../../types";
import { WordStat, useWordStats } from "../../lib/word_stats";
import LearnPageHeader from "./LearnPageHeader";
import FinishedLearning from "./results/FinishedLearning";
import TranslationInfo from "../translation_page/TranslationInfo";
import SynonymAntonymBadges from "../translation_page/SynonymAntonymBadges";

export default function LearnPage(props : {onlyHard: boolean}) {

  const { listId } = useParams();
  const [listName, setListName] = useState();

  const [translations, setTranslations] = useState<Translation[]>([]);

  const [currentTranslation, setCurrentTranslation] = useState<Translation>();
  const [flipped, setFlipped] = useState(false);

  const [englishFirst, setEnglishFirst] = useState(true);

  const [wordShown, setWordShown] = useState("");

  const [progress, setProgress] = useState(0);
  const [progressMax, setProgressMax] = useState(1);

  const { increaseWordStat, isHard, wordStats } = useWordStats();
  const [beforeWordStats,] = useState<WordStat[]>(wordStats.map(stat => ({...stat})));

  const getTranslations = async () => {
    try {
      return await api.get(`/api/v1/list_translations/${listId}`).then((response) => {
        console.log("Fetched translations:");
        console.log(response.data);

        setTranslations(response.data);

        //set the list name
        setListName(response.data[0].wordList.name);

        return response.data;
      });
    } catch (error) {
      console.error(error);
    }
  }

  //Get the translations
  useEffect(() => {
    console.log("Fetching translations...");
    getTranslations().then((response_translations: Translation[]) => {
      if(props.onlyHard) {
        console.log("Only hard mode is enabled. Filtering translations...");
        response_translations = response_translations.filter(translation => isHard(translation.id));
      }

      //set the progress max
      setProgressMax(response_translations.length);   

      console.log("Shuffling translations...");

      setProgress(0);

      const shuffeled = response_translations.sort(() => Math.random() - 0.5);
      setTranslations(shuffeled);

      setCurrentTranslation(shuffeled[0]);
      handleFlip(false, shuffeled[0]);

      console.log(shuffeled);
    });
  }, []);

  function handleFlip(flipped: boolean, newTranslation?: Translation) {
    if(flipped === false && !newTranslation) {
      throw new Error("You need to provide a new translation to show when flipping the card back.");
    }

    setFlipped(flipped);

    if(flipped) {
      if(englishFirst) {
        setWordShown(currentTranslation!.german);
      } else {
        setWordShown(currentTranslation!.english);
      }
    } else {
      if(englishFirst) {
        setWordShown(newTranslation!.english);
      } else {
        setWordShown(newTranslation!.german);
      }
    }
  }

  function handleAwnser(knew: boolean) {
    let newTranslations: Translation[];

    setTranslations((currentTranslations) => {
      if(knew) {
        //increase the word stat for correct
        increaseWordStat(currentTranslation!, 1, 0);

        //remove the current translation from the list
        newTranslations = currentTranslations.filter(translation => translation.id !== currentTranslation!.id);

        //set the progress
        setProgress((currentProgress) => currentProgress + (1 / progressMax * 100));
      } else {
        //increase the word stat for incorrect
        increaseWordStat(currentTranslation!, 0, 1);

        if(currentTranslations.length === 1) {
          //if there is only one translation left, flip it and show it again
          handleFlip(false);
        }

        //add the current translation to the end of the list
        newTranslations = currentTranslations.filter(translation => translation.id !== currentTranslation!.id);
        newTranslations.push(currentTranslation!);
      }

      console.log("New translations:");
      console.log(newTranslations);

      //set the new translations
      setTranslations(newTranslations);

      if(newTranslations.length > 0) {
        handleFlip(false, newTranslations[0]);

        //set the current translation
        setCurrentTranslation(newTranslations[0]);
      }
      
      return newTranslations;
    });
  }

  useEffect(() => {
    if(!currentTranslation) return;

    handleFlip(false, currentTranslation);
  }, [englishFirst]);
  
  return (
    <AppLayout>
      {translations.length === 0 && listName ?
      <FinishedLearning list_id={parseInt(listId!)} beforeWordStats={beforeWordStats} afterWordStats={wordStats} />
      :
      <>
        <LearnPageHeader listName={listName!} progress={progress} />

        <Card onClick={() => {if(!flipped) {handleFlip(true)}}} className="flex flex-col items-center w-full mt-5 py-16 md:py-24 2xl:py-40 cursor-pointer">
          <p className="text-3xl sm:text-4xl text-center select-none mb-1">{wordShown || <Skeleton className="h-10 w-[210px]"/>}</p>

          {flipped && (
            <>
              <SynonymAntonymBadges translation={currentTranslation!} type="synonym" center={true} />

              <div className="flex flex-row justify-center justify-self-end gap-4 w-full"> 
                <Button onClick={() => handleAwnser(false)} className="mt-6 w-[100px] py-6">
                  <Cross1Icon className="w-6 h-6" />
                </Button>

                <Button onClick={() => handleAwnser(true)} className="mt-6 w-[100px] py-6">
                  <CheckIcon className="w-7 h-7" />
                </Button>
              </div>
            </>
          )}

          {/* Add some space if the card is not flipped */}
          {!flipped && (
            <div className="w-full py-[49px]" />
          )}
        </Card>

        {currentTranslation && <TranslationInfo translation={currentTranslation} />}

        <Card className="w-full mt-5">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Customize the settings for the learning process.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch onCheckedChange={(checked) => setEnglishFirst(!checked)} id="english-german" />
              <Label htmlFor="english-german">English - German</Label>
            </div>
          </CardContent>
        </Card>
      </>
    }
    </AppLayout>
  )
}