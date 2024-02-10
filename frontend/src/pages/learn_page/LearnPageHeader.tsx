import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function LearnPageHeader(props: {listName: string, progress: number}) {
  
  return (
    <nav>
            {props.listName ?
            <>
              <h1 className="inline">Learning: </h1> <h1 className="inline-block">{props.listName}</h1>
              <h3 className="text-muted-foreground text-center text-lg">{Math.round(props.progress)}% / 100% </h3>
              <Progress value={props.progress} className="mt-4"/>
            </> :

            <>
              <Skeleton className="h-10 w-[330px]"/>
              <Skeleton className="h-6 w-full mt-4 text-center"/>
              <Progress value={props.progress} className="mt-4"/>
            </>
          }

    </nav>
  )
}