import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Translation } from "../../types";
import { WordsTableRow } from "./WordsTableRow";
  
  export function WordsTable(props: { translations: Translation[] }) {
    const translations = props.translations;

    return (
      <Table>
        <TableCaption>A list of translations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[90px]">ID</TableHead>
            <TableHead className="min-w-[145px]">English</TableHead>
            <TableHead>German</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {translations.map((translation) => (
            <WordsTableRow key={translation.id} translation={translation} />
          ))}
        </TableBody>
      </Table>
    )
  }
  