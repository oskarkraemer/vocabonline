import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Translation } from "@/types";
import SynonymAntonymBadges from "./SynonymAntonymBadges";

export default function TranslationInfo(props: { translation: Translation}) {
    return (
        <Card className="w-full mt-5">
          <CardHeader>
            <CardTitle>Translation info</CardTitle>
            <CardDescription>View information about the current translation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <ul className="list-decimal">
                {props.translation.meanings && props.translation.meanings.map((meaning, index) => (
                    <li key={index} className="pl-3 ml-7 mb-7">
                        <p className="font-bold">{meaning.partOfSpeech}</p>

                        {meaning.synonyms && (
                            <div className="mb-4">
                                <p>Synonyms</p>
                                <SynonymAntonymBadges translation={props.translation} type={"synonym"} />
                            </div>
                        )}

                        {meaning.antonyms && (
                            <div className="mb-4">
                                <p>Antonyms</p>
                                <SynonymAntonymBadges translation={props.translation} type={"antonym"} />
                            </div>
                        )}

                        {meaning.definitions.length > 0 && <p>Definitions: </p>}
                        <ul className="list-disc">
                            {meaning.definitions.map((definition, index) => (
                                <li key={index} className="ml-7">
                                    <p>{definition.definition}</p>
                                    {definition.example && <p className="ml-3 text-gray-400 mt-0">Example: {definition.example}</p>}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
    )
}