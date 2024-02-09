import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { useNavigate } from "react-router-dom";
import { Translation } from "./types";
import { useWordStats } from "./lib/word_stats";
  
  export function WordsTable(props: { translations: Translation[] }) {
    const navigate = useNavigate();
    const { isHard } = useWordStats();

    const translations = props.translations;

    function formatSynonyms(translation: Translation): string[] {
      if (translation.meanings.length === 0 || translation.meanings[0].synonyms === null) {
        return [];
      }
      
      let synonyms: string[] = [];
      translation.meanings.map((meaning) => {
        //add meaning.part_of_speech to every synonym
        meaning.synonyms.map((synonym) => {
          synonyms.push(meaning.partOfSpeech + ": " + (meaning.partOfSpeech=="verb" ? "to ": "") + synonym);
        });
      });

      return synonyms;
    }

    return (
      <Table>
        <TableCaption>A list of translations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>English</TableHead>
            <TableHead>German</TableHead>
            <TableHead>Synonyms</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {translations.map((translation) => (
            <TableRow key={translation.id}
                onClick={() => navigate(`/translation/${translation.id}`)}
                className="cursor-pointer"
            >
                <TableCell className="font-medium">{translation.id}</TableCell>
                <TableCell>
                  {isHard(translation.id) && (
                  <Badge variant="destructive" className="mr-2">Hard</Badge>
                  )}
                  
                  {translation.english}
                  </TableCell>
                <TableCell>{translation.german}</TableCell>
                <TableCell>
                    {formatSynonyms(translation).slice(0, 5).map((synonym) => (
                    <Badge key={synonym} variant="secondary" className="mr-1 mt-1">
                        {synonym}
                    </Badge>
                    ))}
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="default">Details</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  