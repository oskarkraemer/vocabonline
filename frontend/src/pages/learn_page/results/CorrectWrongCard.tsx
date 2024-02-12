import * as React from "react"

import "./circular_progress.css";
import { WordStat } from "@/lib/word_stats"
import { StatCard } from "./StatCard";

import { getCorrectPerc, getCorrectTotal, getWrongTotal } from "@/lib/result_utils";

export function CorrectWrongCard(props: {wordStatsDiff: WordStat[]}) {
  const correctTotal = getCorrectTotal(props.wordStatsDiff);
  const wrongTotal = getWrongTotal(props.wordStatsDiff);

  const correctPerc = getCorrectPerc(props.wordStatsDiff);

  return (
    <StatCard>
      <div className="prbr-cl p-2 mt-2" data-num={Math.round(correctPerc) + "%"} style={{"--prcnt":correctPerc, "--clr": "#ffffff", "--bg": "#09090b;"} as React.CSSProperties}>
          <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="prbr-cl-bg"/>

              <circle cx="50" cy="50" r="45" className="prbr-cl-fill"/>
          </svg>
      </div>

      <p className="text-xl text-center">You were wrong <span className="text-3xl text-destructive">{wrongTotal}</span> times.</p>
      <p className="text-xl text-center">You were correct <span className="text-3xl text-green-900">{correctTotal}</span> times.</p>
    </StatCard>
  )
}