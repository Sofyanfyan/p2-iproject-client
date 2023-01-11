import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const useStore = defineStore('counter', {
   state: () => ({ count: 0, name: 'Eduardo' }),
   getters: {
     doubleCount: (state) => state.count * 2,
   },
   actions: {
      
      async login(value) {

         try {

            const {data} = await axios({
               url: baseUrl + '/users/login',
               method: 'POST',
               data: {
                  email: value.email,
                  password: value.password
               }
            })

            localStorage.setItem('access_token', data.access_token)
            this.router.push('/')
         } catch (error) {
            console.log(error);
         }
      },


      async register(value){
   
         try {

            await axios({
               url: baseUrl + '/users/register',
               method: 'POST',
               data: {
                  username: value.username,
                  email: value.email,
                  password: value.password
               }
            })

            this.router.push('/login')
         } catch (error) {
            console.log(error);
         }
      }

   },
})