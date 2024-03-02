import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableRowBottomless,
  } from "@/components/ui/table"

import { Badge } from "../../components/ui/badge"
import { useNavigate } from "react-router-dom";
import { Translation } from "../../types";
import { useWordStats } from "../../lib/word_stats";
import React from "react";
import { formatSynonyms, hasMeanings } from "@/lib/word_utils";
import SynonymAntonymBadges from "../translation_page/SynonymAntonymBadges";
  
  export function WordsTable(props: { translations: Translation[] }) {
    const navigate = useNavigate();
    const { isHard } = useWordStats();

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
            <React.Fragment key={translation.id}>
              <TableRowBottomless
                key={translation.id}
                onClick={() => navigate(`/translation/${translation.id}`)}
                className="cursor-pointer"
              >
                <TableCell className="text-base font-medium">{translation.id}</TableCell>
                <TableCell className="text-base">
                  {isHard(translation.id) && (
                    <Badge variant="destructive" className="mr-2">Hard</Badge>
                  )}
                  {translation.english}
                </TableCell>
                <TableCell className="text-base">{translation.german}</TableCell>
              </TableRowBottomless>

              <TableRow
                key={"syn" + translation.id}
                onClick={() => navigate(`/translation/${translation.id}`)}
                className="cursor-pointer"
              >
                {hasMeanings(translation) && (
                  <>
                    <TableCell></TableCell>
                    <TableCell colSpan={2} className="py-0 pb-4">
                      <SynonymAntonymBadges translation={translation} type="synonym"/>
                    </TableCell>
                  </>
                )}
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    )
  }
  