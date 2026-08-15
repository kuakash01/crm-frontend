import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CustomerOption } from "./customer-picker.types";

import CustomerPickerRow from "./CustomerPickerRow";

type Props = {
  customers: CustomerOption[];

  onSelect: (
    customer: CustomerOption
  ) => void;
};

export default function CustomerPickerTable({
  customers,
  onSelect,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>

          <TableHead>Company</TableHead>

          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.map((customer) => (
          <CustomerPickerRow
            key={customer.id}
            customer={customer}
            onSelect={onSelect}
          />
        ))}
      </TableBody>
    </Table>
  );
}