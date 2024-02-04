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
  
  export function WordsTable(props: { translations: Translation[] }) {
    const navigate = useNavigate();

    const translations = props.translations;

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
                <TableCell>{translation.english}</TableCell>
                <TableCell>{translation.german}</TableCell>
                <TableCell>
                    {translation.synonyms.map((synonym) => (
                    <Badge key={synonym} variant="secondary" className="mr-1 mt-1 sm:mt-0">
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
  