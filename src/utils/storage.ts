class MemoryStorage {
  data: any
  constructor() {
    this.data = {}
    this.initMemoryStorage()
  }
  setItem(k: string, v: any) {
    this.data[k] = v
    this.dataSendHandler(this.data)
  }
  getItem(k: string) {
    console.log('getItem', k, this.data, this.data[k])
    console.log(Object.keys(this.data), this.data.user)
    return this.data
  }
  removeItem(k: string) {
    delete this.data[k]
    this.dataSendHandler(this.data)
  }
  clear() {
    this.data = {}
    this.dataSendHandler(this.data)
  }
  dataSendHandler(data: any) {
    localStorage.setItem('setMemoryStorage', JSON.stringify(data))
    console.log('setMemoryStorage 设置了data local', data,Date.now())
    localStorage.removeItem('setMemoryStorage')
    console.log('removeItem setMemoryStorage ')
  }
  dataGetHandler() {
    const cur = new Date().getTime().toString()
    localStorage.setItem('getMemoryStorage', cur)
    console.log('getMemoryStorage this.data', cur,this.data)
    localStorage.removeItem('getMemoryStorage')
    console.log('removeItem getMemoryStorage ')
  }
  initMemoryStorage() {
    window.addEventListener('storage', (e) => {
      if (e.newValue === null) return false
      if (e.key === 'getMemoryStorage') {
        console.log('有其他页面取memory')
        this.dataSendHandler(this.data)
      } else if (e.key === 'setMemoryStorage') {
        let data = JSON.parse(e.newValue)
        if (isEmptyObj(data)) {
          console.log('memory被清空了')
          this.data = {}
        } else {
          console.log('memory被修改了')
          for (let k in data) {
            this.data[k] = data[k]
          }
        }
      }
    })
    if (isEmptyObj(this.data)) {
      this.dataGetHandler()
    }
  }
}

function isEmptyObj(obj: Object) {
  for (let i in obj) {
    return false
  }
  return true
}
const instance = new MemoryStorage()
export default instance
