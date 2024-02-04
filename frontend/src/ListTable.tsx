import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { useNavigate } from "react-router-dom";
import { List } from "./types";
  
  export function ListTable(props: { lists: List[] }) {
    const navigate = useNavigate();

    const lists = props.lists;

    return (
      <Table>
        <TableCaption>A list of vocabulary sets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Word Amount</TableHead>
            <TableHead>Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists.map((list) => (
            <TableRow key={list.id}
                onClick={() => navigate(`/list/${list.id}`)}
                className="cursor-pointer"
            >
                <TableCell className="font-medium">{list.id}</TableCell>
                <TableCell className="min-w-[100px]">
                    <Badge variant="default" className="mr-2">
                        New
                    </Badge>
                    {list.name}
                </TableCell>
                <TableCell>{list.translation_amount}</TableCell>
                <TableCell>{new Date(list.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</TableCell>
                <TableCell className="text-right">
                    <Button variant="default">Learn</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  