import AppLayout from "./AppLayout";
import { ListTable } from "./ListTable";


export default function Dashboard() {
  
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