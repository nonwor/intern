export interface Store{
    Key: string;
    LastModified: string;
    ETag: string;
    Size: number;
    StorageClass: string;
}

export interface DataErr{
    epname: string;
    cname: string;
    errType: "timing"|"rowcount";
    errmsg: string;
    cwurl: string;
    schedguid: string;
    now: Date;
}

export interface TimingErr{
    paulPulledDateUTC: Date;
    scheduleExpectedTimeUTC: Date;
    epname: string;
    cname: string;
    errType: "timing"|"rowcount";
    errmsg: string;
    cwurl: string;
    schedguid: string;
    awsCronExpression: string;
    now: Date;
}