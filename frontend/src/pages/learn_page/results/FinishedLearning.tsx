import { WordStat, useWordStats } from "@/lib/word_stats";
import { CorrectWrongCard } from "./CorrectWrongCard";
import { useEffect } from "react";

export default function FinishedLearning(props: {beforeWordStats: WordStat[], afterWordStats: WordStat[]}) {
    const { getWordStatsDiff } = useWordStats();

    const wordStatsDiff = getWordStatsDiff(props.afterWordStats, props.beforeWordStats);

    return (
        <>
            <nav className="mb-4">
                <h1>Finished Learning</h1>
                <p className="text-lg">You did <span className="font-bold">way worse 📉</span> than expected.</p>
            </nav>

            <div className="flex justify-center md:justify-normal flex-wrap">
                <CorrectWrongCard wordStatsDiff={wordStatsDiff}/>
                <CorrectWrongCard wordStatsDiff={wordStatsDiff}/>
                <CorrectWrongCard wordStatsDiff={wordStatsDiff}/>
            </div>
        </>
    )
}