import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableRowBottomless,
  } from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"
  
  export function WordsTableSkeleton() {

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[90px]">ID</TableHead>
            <TableHead className="min-w-[145px]">English</TableHead>
            <TableHead>German</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(18).keys()].map((prop_translation_id) => (
            <>
              <TableRowBottomless key={prop_translation_id}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-5 w-5 w-[90px] my-2" />
                  </TableCell>
                  <TableCell>
                  <Skeleton className="h-5 w-5 w-[145px] my-2" />
                    </TableCell>
                  <TableCell>
                  <Skeleton className="h-5 w-5 w-[145px] my-2" />
                  </TableCell>

              </TableRowBottomless>
            </>
          ))}
        </TableBody>
      </Table>
    )
  }
  