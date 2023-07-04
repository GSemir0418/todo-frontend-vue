import { defineStore } from "pinia"
import { reactive } from "vue"
import { getCurrentUser } from "../api/me"

export const useCurrentUser = defineStore('counter', () => {
  const me = reactive({})
  async function fetchMe() {
    return getCurrentUser().then(res => {
      console.log('res', res);
      // if(res.status === 200){
      //   Object.assign(currentUser, res.data)
      // }
      return true
    }).catch(err => {
      Object.assign(me, {})
      console.log('err', err)
      return false
    })
  }

  return { me, fetchMe }
})