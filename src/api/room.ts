import store from '../store'
import request from '../utils/request'

export const getRoom = () => {
  return request.get('room/GetRoom', { })
}
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
