import { WordStat } from "@/lib/word_stats"
import { StatCard } from "./StatCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function TopFailsCard(props: {wordStatsDiff: WordStat[]}) {

    const incorrectWords = props.wordStatsDiff.filter(stat => stat.incorrect);

    return (
    <StatCard>
        <p className="text-3xl font-bold mb-4 pt-2">Top Fails</p>
        
        <ScrollArea className="h-80 w-full">
            <div className="p-1">
                {incorrectWords.map((incorrectWord) => (
                    <>
                        <div key={incorrectWord.word_id} className="text-md w-full flex justify-between">
                            <span>{incorrectWord.word_en}</span> <span className="text-destructive font-bold">{incorrectWord.incorrect}x</span>
                        </div>
                        <Separator className="my-2" />
                    </>
                ))}
            </div>
        </ScrollArea>
    </StatCard>
    )
}