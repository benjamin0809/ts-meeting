import Cookies from 'js-cookie'

// User
const userKey = 'meeting-room-user'
export const getUser = () => Cookies.getJSON(userKey)
export const setUser = (token: any) => Cookies.set(userKey, token)
export const removeUser = () => Cookies.remove(userKey)
