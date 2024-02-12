import { WordStat, useWordStats } from "@/lib/word_stats";
import { useListStats } from "@/lib/list_stats";
import { CorrectWrongCard } from "./CorrectWrongCard";
import TopFailsCard from "./TopFailsCard";

import { getCorrectPerc } from "@/lib/result_utils";
import { useEffect } from "react";

export default function FinishedLearning(props: {list_id: number, beforeWordStats: WordStat[], afterWordStats: WordStat[]}) {
    const { getWordStatsDiff } = useWordStats();
    const { addListScore } = useListStats();

    const wordStatsDiff = getWordStatsDiff(props.afterWordStats, props.beforeWordStats);

    useEffect(() => {
        //Report the results
        addListScore(props.list_id, getCorrectPerc(wordStatsDiff));
    }, []);

    return (
        <>
            <nav className="mb-4">
                <h1>Finished Learning</h1>
                <p className="text-lg">You did <span className="font-bold">way worse 📉</span> than expected.</p>
            </nav>

            <div className="flex justify-center md:justify-normal flex-wrap">
                <CorrectWrongCard wordStatsDiff={wordStatsDiff}/>
                <TopFailsCard wordStatsDiff={wordStatsDiff}/>
                <CorrectWrongCard wordStatsDiff={wordStatsDiff}/>
            </div>
        </>
    )
}