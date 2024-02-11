import { WordStat, useWordStats } from "@/lib/word_stats";
import { StatCard } from "./StatCard";
import { useEffect } from "react";

export default function FinishedLearning(props: {beforeWordStats: WordStat[], afterWordStats: WordStat[]}) {
    const { getWordStatsDiff } = useWordStats();

    useEffect(() => {
        console.log("FinishedLearning props:");
        console.log(props.beforeWordStats);
        console.log(props.afterWordStats);

        console.log("FinishedLearning word_stats_diff:");
        console.log(getWordStatsDiff(props.afterWordStats, props.beforeWordStats));
    });

    return (
        <>
            <nav className="mb-4">
                <h1>Finished Learning</h1>
                <p>You learned 44 words.</p>
                
            </nav>

            <StatCard/>
        </>
    )
}