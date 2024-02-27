import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

export default function ListPageHeader(props: { listName: string, wordAmount: number, listId: string}) {
    const navigate = useNavigate();
    
    return (
        <nav>
            {props.listName ?
            <>
                <h1>Vocabulary: {props.listName}</h1>
                <p>This dataset contains {props.wordAmount} words.</p>

                <a onClick={() => {navigate("/learnList/" + props.listId)}}><Button className="mt-4 mr-3" variant="default">Learn All</Button></a>
                <a onClick={() => {navigate("/learnListHard/" + props.listId)}}><Button className="mt-4" variant="destructive">Learn Hard</Button></a>
            </>
            :
            <>
                <Skeleton className="h-10 w-[330px]"/>
                <Skeleton className="h-6 w-[220px] mt-4"/>
                <Skeleton className="h-9 w-[140px] mt-5"/>
            </>
            }
        </nav>
    )
}