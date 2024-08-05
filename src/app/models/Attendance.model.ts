export interface Attendance {
  pId: number,
  id:string,
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  updatedBy: string;
  attendanceId: number;
  empId: string;
  date: string;
  timeTable: string;
  onDuty: string;
  offDuty: string;
  clockIn: string;
  clockOut:string;
  department: string;
  normall: number;
  realTime: number;
  late: string;
  earl: string;
  status: number;
  totalLE:string;
  attendanceStatus: string;
  absentDays: number;
  leaveType: string;
}


export interface userInfo {
  userid: number,
  badgenumber: string,
  ssn: string,
  name: string,
  gender: string,
  title: string,
  pager: string,
  birthday: string,
  hiredday: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  ophone: string,
  fphone: string,
  verificationmethod: number,
  defaultdeptid: number,
  securityflags: number,
  att: number,
  inlate: number,
  outearly: number,
  overtime: number,
  sep: number,
  holiday: number,
  minzu: string,
  password: string,
  lunchduration: number,
  photo: string,
  mverifypass: string,
  notes: string,
  privilege: number,
  inheritDeptSch: number,
  inheritDeptSchClass: number,
  autoSchPlan: number,
  minAutoSchInterval: number,
  registerOT: number,
  inheritDeptRule: number,
  emprivilege: number,
  cardNo: string,
  faceGroup: number,
  accGroup: number,
  useAccGroupTZ: number,
  verifyCode: number,
  expires: number,
  validCount: number,
  validTimeBegin: string,
  validTimeEnd: string,
  timeZone1: number,
  timeZone2: number,
  timeZone3: number,
  upsize_ts: string
}

export interface UserOfNum
{
  userid: number,
  nuM_OF_RUN_ID: number,
  startdate: string,
  enddate:string,
  isnotoF_RUN: number,
  ordeR_RUN: number
}
export interface Schedule
{
  schClassid: number,
  schName: string,
  startTime: string,
  endTime: string,
  lateMinutes: number,
  earlyMinutes: number,
  checkIn: number,
  checkOut: number,
  color: number,
  autoBind: number,
  checkInTime1: string,
  checkInTime2: string,
  checkOutTime1: string,
  checkOutTime2:string,
  workDay: number,
  sensorID: string,
  workMins: number,
  upsize_ts: string
  }

  export interface CheckInOut
  {
    userid: number,
    checktime: string,
    checktype: string,
    verifycode: number,
    sensorid: string,
    memoinfo: string,
    workCode: string,
    sn: string,
    userExtFmt: number
  }
  export interface NumOfRun
  {
    nuM_RUNID: number,
    oldid: number,
    name: string,
    startdate: string,
    enddate: string,
    cyle: number,
    units: number
  }
  
  export interface NumOfRunDel
  {
    nuM_RUNID: number,
    starttime: string,
    endtime:string,
    sdays: number,
    edays: number,
    schclassid: number,
    overTime: number
  }