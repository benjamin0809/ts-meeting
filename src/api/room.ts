import store from '../store'
import request from '../utils/request'
import { IBookingRoomInput, IHomeDataResult, IUpdateBookingRoomInput } from '@/models/room'

export const getRoom = () => {
  return request.get<any>('room/GetRoom', { })
}

/**
 * 查询会议室预订数据
 * @param queryDate 格式 yyyy-MM eg: 2020-01
 */
export const GetHomeData = (queryDate: string) => {
  return request.get<IHomeDataResult[]>('room/GetHomeData', { params: { queryDate } })
}

export const GetSites = () => {
  return request.get<any>('room/GetSites', { })
}

export const GetActiveRoom = () => {
  return request.get<any>('room/GetActiveRoom', { })
}

/**
 * 预订会议室
 * @param entity 表单实体
 */
export const BookingRoom = (entity: IBookingRoomInput) => {
  return request.post<any>('room/BookingRoom', entity)
}

export const UpdateBookingInfo = (entity: IUpdateBookingRoomInput) => {
  return request.post<any>('room/UpdateBookingInfo', entity)
}

const testData: any = {
  'UpdateBookingEntity': {
    RecID: 0,
  	'RoomID': 2,
  	'StartTime': '2014-09-31 08:31:00.000',
  	'EndTime': '2014-09-30 10:30:00.000',
  	'MeetingMemo': 'Hello',
  	'Tel': '15014491899'
  }
}
UpdateBookingInfo(testData).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})

const siteOptions = [
  {
    value: 'GY',
    label: '贵阳'
  },
  {
    value: 'LH',
    label: '龙华'
  }
]

export const getSites = () => {
  return siteOptions
}

const roomOptions = [
  {
    value: 'LH-1',
    label: '龙华E7棟四楼视讯会议室1',
    site: 'LH'
  },
  {
    value: 'LH-2',
    label: '龙华E7棟四楼视讯会议室2',
    site: 'LH'
  },
  {
    value: 'GY-1',
    label: '贵阳E03棟2F四楼视讯会议室1',
    site: 'GY'
  },
  {
    value: 'GY-2',
    label: '贵阳E7棟四楼视讯会议室2',
    site: 'GY'
  }
]

export const getSiteRooms = (siteOption: string) => {
  return roomOptions.filter(p => p.site === siteOption)
}

const data = [
  {
    id: '1',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2020-01-04',
    start: '10:00:00',
    end: '12:00:00',
    room: 'GY-2'
  },
  {
    id: '1',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2020-01-03',
    start: '10:00:00',
    end: '12:00:00',
    room: 'GY-1'
  },
  {
    id: '1',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2020-01-02',
    start: '10:00:00',
    end: '12:00:00',
    room: 'GY-1'
  },
  {
    id: '2',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2020-01-02',
    start: '14:00:00',
    end: '16:00:00',
    room: 'GY-1'
  },
  {
    id: '1',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2019-12-31',
    start: '10:00:00',
    end: '12:00:00',
    room: 'GY-1'
  },
  {
    id: '1',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2019-12-30',
    start: '10:00:00',
    end: '12:00:00',
    room: 'GY-1'
  },
  {
    id: '1',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2019-12-29',
    start: '10:00:00',
    end: '12:00:00',
    room: 'GY-2'
  },
  {
    id: '1',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2019-12-28',
    start: '10:00:00',
    end: '12:00:00',
    room: 'GY-2'
  },
  {
    id: '1',
    subject: '部门学习交流分享会',
    remark: '',
    user: '李如梦',
    contact: '560-68962',
    date: '2019-12-27',
    start: '10:00:00',
    end: '12:00:00',
    room: 'GY-2'
  }

]

export const getShedulerData = (room: string) => {
  return data.filter(p => p.room === room)
}
