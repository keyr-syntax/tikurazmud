export type doctorType ={
    physicianID?:number;
    uniqueID?: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    phoneNumber: string;
    isPhysician: boolean;
    isAdmin?: boolean;
    isBlocked?: boolean;
    softDeleted?: boolean;
    isApproved?: boolean;
};