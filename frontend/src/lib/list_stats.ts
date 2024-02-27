import { useState, useEffect } from "react";

const initialState = {};

export const useListStats = () => {
    const [listStats, setListStats] = useState(() => {
        const saved = localStorage.getItem("listStats");
        return saved ? JSON.parse(saved) : initialState;
    });

    const getListStat = (list_id: number) => {
        return listStats[list_id];
    }

    const addListScore = (list_id: number, score: number) => {
        //consider {list_id: [score1, score2, score3], list_id2: [score1, score2, score3], ...}
        if(listStats[list_id]) {
            listStats[list_id].push(score);
        } else {
            listStats[list_id] = [score];
        }

        setListStats({...listStats});
    }

    /*const getGlobalAverage = () => {
        let sum = 0;
        let count = 0;

        for (const [, value] of Object.entries(listStats)) {
            if(!Array.isArray(value)) continue;

            value.forEach((score: number) => {
                sum += score;
                count++;
            });
        }

        return sum / count;
    }

    const getListAverage = (list_id: number) => {
        if(!listStats[list_id]) return 0;

        let sum = 0;
        let count = 0;

        listStats[list_id].forEach((score: number) => {
            sum += score;
            count++;
        });

        return sum / count;
    }*/

    useEffect(() => {
        localStorage.setItem("listStats", JSON.stringify(listStats));
    }, [listStats]);

    return { getListStat, listStats, addListScore };
};