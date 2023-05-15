declare function initiatePayment(phoneNumber: string, intocurrency: string, currency: string): Promise<void>;
declare const offRampCreated: (req: any, res: any) => Promise<void>;
declare const getTransactions: (req: any, res: any) => Promise<void>;
declare function test(): Promise<void>;
export { offRampCreated, test, initiatePayment, getTransactions };
