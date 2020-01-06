import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  'zh-cn': require('../assets/i18n/zh-cn'),   // 中文简体语言包
  'zh-tw': require('../assets/i18n/zh-tw'),   // 中文繁体语言包
  'en-us': require('../assets/i18n/en-us')    // 英文语言包
}

const lang = localStorage.getItem('lang') || navigator.language.toLowerCase()

// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale : lang || 'zh-cn', // set locale 默认显示英文
  messages : messages // set locale messages
})
