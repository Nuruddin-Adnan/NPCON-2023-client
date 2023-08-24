export type IRegistration = {
  name: string;
  designation: string;
  hospital: string;
  emailAddress: string;
  phoneNumber: string;
  amount: number | number;
  purpose: string[];
  slideSeminar?: string;
  conference?: string;
  paymentMethod: string;
  bkashNumber?: string;
  receivedBy: string;
  updatedBy?: string;
  note?: string;
  status?: string;
};
