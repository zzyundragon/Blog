import { changeTitle, insertUserInfo, changeLang } from './mutation-types.js'

export default {
  async insertUserInfo({ commit, state }) {
    commit(insertUserInfo, sessionStorage.getItem('userInfo'))
    commit(changeTitle, 'res.data')
  },
  async changeLang({ commit, state }) {
    commit(changeLang, localStorage.getItem('lang'))
  }
}
