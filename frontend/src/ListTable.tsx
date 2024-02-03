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
  
  const lists = [
    {
      id: "1",
      name: "The Road",
      wordAmount: "46",
      dateAdded: "13.01.24",
    },
    {
        id: "2",
        name: "The Road",
        wordAmount: "46",
        dateAdded: "13.01.24",
      },
  ]
  
  export function ListTable() {
    const navigate = useNavigate();

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
                <TableCell>
                    <Badge variant="default" className="mr-2">
                        New
                    </Badge>
                    {list.name}
                </TableCell>
                <TableCell>{list.wordAmount}</TableCell>
                <TableCell>{list.dateAdded}</TableCell>
                <TableCell className="text-right">
                    <Button variant="default">Learn</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  