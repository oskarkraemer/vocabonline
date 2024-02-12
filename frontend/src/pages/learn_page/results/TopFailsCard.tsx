import { WordStat } from "@/lib/word_stats"
import { StatCard } from "./StatCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function TopFailsCard(props: {wordStatsDiff: WordStat[]}) {

    const incorrectWords = props.wordStatsDiff.filter(stat => stat.incorrect).sort((a, b) => b.incorrect - a.incorrect);

    return (
    <StatCard>
        <p className="text-3xl font-bold mb-4 pt-2">Top Fails</p>
        
        <ScrollArea className="h-80 w-full">
            <div className="p-1">
                {incorrectWords.map((incorrectWord) => (
                    <React.Fragment key={incorrectWord.word_id}>
                        <div className="text-md w-full flex justify-between">
                            <span>{incorrectWord.word_en}</span> <span className="text-destructive font-bold mr-2">{incorrectWord.incorrect}x</span>
                        </div>
                        <Separator className="my-2" />
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    </StatCard>
    )
}