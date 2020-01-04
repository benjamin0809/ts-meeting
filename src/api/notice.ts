import { INotice } from './../models/notice'
import store from '../store'
import request from '../utils/request'

const notices: INotice[] = [
  {
    Id: 1,
    ModifyDate: '2019-12-25',
    ModifyUser: '李如梦',
    Content:
      '龙华视讯会议室使用完毕后请及时通知IT(A2栋 赵华丽：560-60560，黄梅宁：560-60565，E7栋 肖迎春：560-29188/560-29114)关闭视讯设备'
  },
  {
    Id: 2,
    ModifyDate: '2019-12-25',
    ModifyUser: '李如梦',
    Content:
      '龙华C16栋会议室使用完毕后请及时通知管理员 谢木兰：560-27369 (战情室;会议室1;会议室7)，刘念：560-27137 (工程会议室)关闭视讯设备'
  },
  {
    Id: 3,
    ModifyDate: '2019-12-25',
    ModifyUser: '李如梦',
    Content:
      '龙华E10栋会议室使用完毕后请及时通知管理员 凡亿平：560-78280 关闭视讯设备'
  },
  {
    Id: 4,
    ModifyDate: '2019-12-25',
    ModifyUser: '李如梦',
    Content:
      '龙华F07栋会议室使用完毕后请及时通知管理员 谢桃：560-70057/13421335203，谭海燕：560-70807/18565789818 关闭视讯设备'
  },
  {
    Id: 5,
    ModifyDate: '2019-12-25',
    ModifyUser: '李如梦',
    Content:
      '贵阳视讯会议室使用完毕后请及时通知管理员 周天卫：583-62628 ， 周安：583-61111 关闭视讯设备'
  }
]

export const getShowNotices = () => {
  return notices
}
