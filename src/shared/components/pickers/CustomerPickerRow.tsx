import { TableCell, TableRow } from "@/components/ui/table";

import { CustomerOption } from "./customer-picker.types";

type Props = {
  customer: CustomerOption;

  onSelect: (
    customer: CustomerOption
  ) => void;
};

export default function CustomerPickerRow({
  customer,
  onSelect,
}: Props) {
  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => onSelect(customer)}
    >
      <TableCell>
        {customer.fname} {customer.lname}
      </TableCell>

      <TableCell>
        {customer.company || "-"}
      </TableCell>

      <TableCell>
        {customer.phone1 || "-"}
      </TableCell>
    </TableRow>
  );
}