export interface Punch {
    _id: string;
    user: string;
    date: string;
    firstPunchIn?: string;
    lastPunchOut?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PunchResponse extends Punch {}
  
  export interface PunchRequest {
    userId: string;
  }
  