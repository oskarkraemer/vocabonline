import { useParams } from "react-router-dom";
import AppLayout from "./AppLayout";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { useEffect, useState } from "react";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

import api from './api/axiosConfig';

export default function LearnPage() {
  type Translation = {
    id: number;
    english: string;
    german: string;
    locked_until?: number;
  }

  const { listId } = useParams();

  const [translations, setTranslations] = useState<Translation[]>([{id: 0, english: "tree", german: "Baum"}, {id: 1, english: "cat", german: "Katze"}, {id: 2, english: "fish", german: "Fisch"}]);

  const [currentTranslation, setCurrentTranslation] = useState<Translation>();
  const [flipped, setFlipped] = useState(false);

  const [englishFirst, setEnglishFirst] = useState(true);

  const [wordShown, setWordShown] = useState("");

  const [progress, setProgress] = useState(0);

  const getTranslations = async () => {
    try {
      return await api.get(`/api/v1/translations/${listId}`).then((response) => {
        console.log("Fetched translations:");
        console.log(response.data);

        setTranslations(response.data);
        return response.data;
      });
    } catch (error) {
      console.error(error);
    }
  }

  //Shuffle the translations
  useEffect(() => {
    console.log("Fetching translations...");
    getTranslations().then((response_translations: Translation[]) => {

      console.log("Shuffling translations...");

      setProgress(0);

      const shuffeled = response_translations.sort(() => Math.random() - 0.5);
      setTranslations(shuffeled);

      setCurrentTranslation(shuffeled[0]);

      console.log(shuffeled);
    });
  }, []);

  function handleFlip(flipped: boolean) {
    setFlipped(flipped);

    if(flipped) {
      if(englishFirst) {
        setWordShown(currentTranslation!.german);
      } else {
        setWordShown(currentTranslation!.english);
      }
    } else {
      if(englishFirst) {
        setWordShown(currentTranslation!.english);
      } else {
        setWordShown(currentTranslation!.german);
      }
    }
  }

  function handleAwnser(knew: boolean) {
    let newTranslations: Translation[];

    setTranslations((currentTranslations) => {
      if(knew) {
        //remove the current translation from the list
        newTranslations = currentTranslations.filter(translation => translation.id !== currentTranslation!.id);

        //set the progress
        setProgress((currentProgress) => currentProgress + (1/translations.length * 100));
      } else {
        if(currentTranslations.length === 1) {
          //if there is only one translation left, flip it and show it again
          handleFlip(false);
        }

        //add the current translation to the end of the list
        newTranslations = currentTranslations.filter(translation => translation.id !== currentTranslation!.id);
        newTranslations.push(currentTranslation!);
      }

      //set the new translations
      setTranslations(newTranslations);

      //set the current translation
      setCurrentTranslation(newTranslations[0]);
      
      return newTranslations;
    });
  }

  useEffect(() => {
    if(!currentTranslation) return;

    handleFlip(false);
  }, [currentTranslation, englishFirst]);
  
  return (
    <AppLayout>
        <nav>
            <h1>Learning: The Road</h1>
            <p className="text-muted-foreground">Amount of words: 46</p>
            <Progress value={progress} className="mt-4"/>

        </nav>

        {/* ALTERNATIVE: ALWAYS CENTER WORD.
        
        <Card onClick={() => {if(!flipped) {handleFlip(true)}}} className="grid grid-rows-3 grid-flow-col items-center justify-items-center w-full mt-5 py-40 cursor-pointer">
          <div />
          <p className="text-4xl select-none">{wordShown}</p>

          {flipped && (
            <div className="flex flex-row justify-center justify-self-end gap-4 w-full">
              <Button onClick={() => handleAwnser(true)} className="mt-6 w-[100px] py-6">
                <CheckIcon className="w-7 h-7" />
              </Button>

              <Button onClick={() => handleAwnser(false)} className="mt-6 w-[100px] py-6">
                <Cross1Icon className="w-6 h-6" />
              </Button>
            </div>
          )}

          {/Add some space if the card is not flipped /}
          {!flipped && (
            <div className="w-full py-9" />
          )}
        </Card>
        
        */}

        <Card onClick={() => {if(!flipped) {handleFlip(true)}}} className="flex flex-col items-center w-full mt-5 py-44 cursor-pointer">
          <p className="text-4xl select-none">{wordShown}</p>

          {flipped && (
            <div className="flex flex-row justify-center justify-self-end gap-4 w-full">
              <Button onClick={() => handleAwnser(true)} className="mt-6 w-[100px] py-6">
                <CheckIcon className="w-7 h-7" />
              </Button>

              <Button onClick={() => handleAwnser(false)} className="mt-6 w-[100px] py-6">
                <Cross1Icon className="w-6 h-6" />
              </Button>
            </div>
          )}

          {/* Add some space if the card is not flipped */}
          {!flipped && (
            <div className="w-full py-9" />
          )}
        </Card>

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
    </AppLayout>
  )
}