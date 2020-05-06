import { changeTitle, insertUserInfo, changeLang } from './mutation-types'

export default {
  [changeTitle](state, title) {
    state.title = title
  },
  [insertUserInfo](state, userInfo) {
    state.userInfo = sessionStorage.getItem('userInfo')
  },
  [changeLang](state, lang) {
    state.lang = localStorage.getItem('lang')
  }
}
