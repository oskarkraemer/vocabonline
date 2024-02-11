import * as React from "react"

import { WordStat } from "@/lib/word_stats"
import { StatCard } from "./StatCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function TopFailsCard(props: {wordStatsDiff: WordStat[]}) {

    //const incorrectWords = props.wordStatsDiff.filter(stat => stat.incorrect).map(stat => stat.word_id);
    const incorrectWords = ["Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test","Test"];

    return (
    <StatCard>
        <p className="text-3xl font-bold mb-4 pt-2">Top Fails</p>
        
        <ScrollArea className="h-80 w-full">
            <div className="p-1">
                {incorrectWords.map((incorrectWord) => (
                    <>
                        <div key={incorrectWord} className="text-md">
                            {incorrectWord}
                        </div>
                        <Separator className="my-2" />
                    </>
                ))};
            </div>
        </ScrollArea>
    </StatCard>
    )
}