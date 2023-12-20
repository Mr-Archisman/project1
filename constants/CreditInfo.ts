// src/models/CreditInfo.ts
export default interface CreditInfo {
    companyName: string;
    address: string;
    registrationDate: string;
    numberOfEmployees: number;
    raisedCapital: number;
    turnover: number;
    netProfit: number;
    contactNumber: string;
    contactEmail: string;
    companyWebsite: string;
    loanAmount: number;
    loanInterest: number;
    accountStatus: 'active' | 'closed';
}
