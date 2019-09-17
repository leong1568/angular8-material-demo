export interface Stock{
    id: string;
    name: string;
    dateOfBirth: Date;
    address: string;

    accounts?: Account;
}
