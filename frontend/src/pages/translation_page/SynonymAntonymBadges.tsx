import { Badge } from "@/components/ui/badge";
import { formatAntonyms, formatSynonyms, hasMeanings } from "@/lib/word_utils";
import { Translation } from "@/types";

export default function SynonymAntonymBadges(props: { translation: Translation, type: "synonym"|"antonym", center?: boolean}) {
    if(!hasMeanings(props.translation)){
        return null;
    }

    function formatSynAnts(): string[] {
        if(props.type === "synonym") {
            return formatSynonyms(props.translation);
        } else {
            return formatAntonyms(props.translation);
        }
    }

    return (
      <div className={"synonym-wrapper flex flex-wrap " + (props.center ? 'justify-center' : '')}>
        {formatSynAnts().slice(0, 3).map((synAnt, index) => (
          <Badge key={index} variant="secondary" className="mr-1 mt-1">{synAnt}</Badge>
        ))}
      </div>
    )
}