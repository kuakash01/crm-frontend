export type CustomerOption = {
  id: number;

  fname: string;

  lname: string;

  company: string | null;

  phone1: string | null;
};


export type UserOption = {
  id: number;
  fullname: string;
};

// export type CustomerPickerDialogProps = {
//   open: boolean;

//   onOpenChange: (open: boolean) => void;

//   onSelect: (customer: CustomerOption) => void;
// };



export type CustomerPickerDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSelect: (customer: CustomerOption) => void;
};
