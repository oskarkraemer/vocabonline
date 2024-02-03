import { useState } from "react";
import AppLayout from "./AppLayout";
import { ListTable } from "./ListTable";

import api from './api/axiosConfig';

export default function Dashboard() {
  type List = {
    id: number;
    name: string;
    translation_amount: number;
    dateAdded: Date;
  }

  const [lists, setLists] = useState<List>();

  const getLists = async () => {
    try {
      return await api.get(`/api/v1/lists`).then((response) => {
        console.log("Fetched lists:");
        console.log(response.data);

        setLists(response.data);
        return response.data;
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <AppLayout>
        <nav>
            <h1>Vocab Online</h1>
            <p>Under construction</p>
        </nav>

        <div className="mt-8" />

        <ListTable />
    </AppLayout>
  )
}