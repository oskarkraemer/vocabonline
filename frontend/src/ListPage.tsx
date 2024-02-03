import { useParams } from "react-router-dom";
import AppLayout from "./AppLayout";
import { WordsTable } from "./WordsTable";
import { Button } from "./components/ui/button";

import api from './api/axiosConfig';

export default function ListPage() {
  const { listId } = useParams();
  
  return (
    <AppLayout>
        <nav>
            <h1>Vocabulary: The Road</h1>
            <p>This dataset contains 46 words.</p>

            <a href={"/learnList/" + listId}><Button className="mt-4" variant="default">Start Learning</Button></a>
        </nav>

        <div className="mt-8" />

        <WordsTable />
    </AppLayout>
  )
}