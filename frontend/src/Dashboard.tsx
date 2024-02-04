import { useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import { ListTable } from "./ListTable";

import api from './api/axiosConfig';
import { List } from "./types";

export default function Dashboard() {

  const [lists, setLists] = useState<List[]>([]);

  const getLists = async () => {
    try {
      return await api.get(`/api/v1/lists`).then((response) => {
        console.log(response.data);

        setLists(response.data);
        return response.data;
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("Fetching lists...");
    getLists();
  }, []);
  
  return (
    <AppLayout>
        <nav>
            <h1>Vocab Online</h1>
            <p>Under construction</p>
        </nav>

        <div className="mt-8" />

        <ListTable lists={lists}/>
    </AppLayout>
  )
}