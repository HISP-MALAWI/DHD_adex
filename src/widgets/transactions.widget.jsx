import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
  Button,
} from "@dhis2/ui";
import React from "react";

export default function Transactions() {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Transaction ID</TableCellHead>
            <TableCellHead>Date/Time</TableCellHead>
            <TableCellHead>Created by</TableCellHead>
            <TableCellHead>Status</TableCellHead>
            <TableCellHead>Action</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Onyekachukwu</TableCell>
            <TableCell>Kariuki</TableCell>
            <TableCell>02/06/2007</TableCell>
            <TableCell>05/25/1972</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kwasi</TableCell>
            <TableCell>Okafor</TableCell>
            <TableCell>08/11/2010</TableCell>
            <TableCell>02/26/1991</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Siyabonga</TableCell>
            <TableCell>Abiodun</TableCell>
            <TableCell>07/21/1981</TableCell>
            <TableCell>02/06/2007</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Chiyembekezo</TableCell>
            <TableCell>Okeke</TableCell>
            <TableCell>01/23/1982</TableCell>
            <TableCell>07/15/2003</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mtendere</TableCell>
            <TableCell>Afolayan</TableCell>
            <TableCell>08/12/1994</TableCell>
            <TableCell>05/12/1972</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Inyene</TableCell>
            <TableCell>Okonkwo</TableCell>
            <TableCell>04/01/1971</TableCell>
            <TableCell>03/16/2000</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Amaka</TableCell>
            <TableCell>Pretorius</TableCell>
            <TableCell>01/25/1996</TableCell>
            <TableCell>09/15/1986</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Meti</TableCell>
            <TableCell>Abiodun</TableCell>
            <TableCell>10/24/2010</TableCell>
            <TableCell>07/26/1989</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Eshe</TableCell>
            <TableCell>Okeke</TableCell>
            <TableCell>01/31/1995</TableCell>
            <TableCell>01/31/1995</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Obi</TableCell>
            <TableCell>Okafor</TableCell>
            <TableCell>06/07/1990</TableCell>
            <TableCell>01/03/2006</TableCell>
            <TableCell dense>
              <Button > View</Button>
            </TableCell>
          </TableRow>
        </TableBody>
        
      </Table>
    </div>
  );
}
