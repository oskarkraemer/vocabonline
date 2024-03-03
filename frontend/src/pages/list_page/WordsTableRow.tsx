import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { useWordStats } from "@/lib/word_stats";
import { hasMeanings } from "@/lib/word_utils";
import { Translation } from "@/types";
import { useNavigate } from "react-router-dom";
import SynonymAntonymBadges from "../translation_page/SynonymAntonymBadges";

export function WordsTableRow(props: { translation: Translation }) {
    const navigate = useNavigate();
    const { isHard } = useWordStats();

    const translation = props.translation;
    const translationHasMeaning = hasMeanings(translation);

    return (
        <>
            <TableRow
                key={translation.id}
                onClick={() => navigate(`/translation/${translation.id}`)}
                className={"cursor-pointer " + (translationHasMeaning ? "border-b-0" : "")}
                >
                <TableCell className="text-base font-medium">{translation.id}</TableCell>
                <TableCell className="text-base">
                    {isHard(translation.id) && (
                    <Badge variant="destructive" className="mr-2">Hard</Badge>
                    )}
                    {translation.english}
                </TableCell>
                <TableCell className="text-base">{translation.german}</TableCell>
            </TableRow>

            {translationHasMeaning && (
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
            )}
        </>
    )
}
  