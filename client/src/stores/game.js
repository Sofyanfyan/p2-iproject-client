import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:3000'

export const useStore = defineStore('counter', {
   state: () => ({ 
      popular: [],
      game: [],
      detail:{},
      gameLibrary:[],
      search: '',
      username: '',
      joined: '',
      isSubs: false,
      isLogin: false,
      page: 'home'
   }),
   getters: {
     doubleCount: (state) => state.count * 2,
      gameSearch: (state) => {
         if(state.search){

            const data = state.game.filter(el =>{
               return el.title.toLowerCase().includes(state.search.toLowerCase())
            })

            return data
         } else {

            return state.game
         }
      }
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
            localStorage.setItem('username', data.username)
            localStorage.setItem('isSubs', data.isSubs)
            localStorage.setItem('createdAt', data.createdAt)
            this.isLogin = true
            this.router.push('/')
         } catch (error) {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: error.response.data.message,
            })
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
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: error.response.data.message,
            })
         }
      },


      async fetchPopular(){

         try {
            
            const {data} = await axios({
               url: baseUrl + '/games?sort=popularity',
               method: 'GET',
               headers: {
                  access_token: localStorage.access_token
               }
            })

            const cut = data.slice(0, 12);
            this.popular = cut
            this.page = 'home'
         } catch (error) {
            
            if(error.response.data.message === 'Invalid token'){
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })

               localStorage.clear()
               this.router.push('/login')
            } else {
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })
            }
         }
      },
      
      async fetchGame(category, sort, platform){


         let url = baseUrl + '/games'

         // COMBO 1

         if(sort && !category && !platform){

            url = baseUrl + `/games?sort=${sort}`
         } else if (!sort && category && !platform){

            url = baseUrl + `/games?category=${category}`
         } else if (!sort && !category && platform){

            url = baseUrl + `/games?platform=${platform}`
         }

         //COMBO 2

         else if (sort && category && !platform){

            url = baseUrl + `/games?sort=${sort}&category=${category}`
         }  else if (sort && !category && platform){

            url = baseUrl + `/games?sort=${sort}&platform=${platform}`
         }  else if (!sort && category && platform){

            url = baseUrl + `/games?category=${category}&platform=${platform}`
         }

         //COMBO 3

         else if (sort && category && platform){

            url = baseUrl + `/games?sort=${sort}&category=${category}&platform=${platform}`
         }

         try {
            
            const {data} = await axios({

               url, 
               method: 'GET',
               headers: {
                  access_token : localStorage.access_token
               }
            })
   
               this.game = data
               this.page = 'browse'

         } catch (error) {
            if(error.response.data.message === 'Invalid token'){
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })

               localStorage.clear()
               this.router.push('/login')
            } else {
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })
            }
         }
      },


      async gameId(id){

         try {
            
            const {data} = await axios({
               url: baseUrl + `/games/${id}`,
               method: 'GET',
               headers: {
                  access_token: localStorage.access_token
               }
            })

            this.detail = data;
            this.isSubs = localStorage.isSubs
            this.page = 'detail'
            this.router.push(`/${id}`)
         } catch (error) {
            if(error.response.data.message === 'Invalid token'){
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })

               localStorage.clear()
               this.router.push('/login')
            } else if (error.response.data.message === 'Game not found'){

               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })
               this.router.push('/browse')
            }
            else {
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })
            }
         }
      },

      async favGame(){

         try {
            
            const {data} = await axios({
               url: baseUrl + '/games/favorites',
               method: 'GET',
               headers: {
                  access_token: localStorage.access_token
               }
            })

            this.gameLibrary = data;
            this.username = localStorage.username
            this.isSubs = localStorage.isSubs
            this.joined = localStorage.createdAt
            this.page = 'profile'

         } catch (error) {
            if(error.response.data.message === 'Invalid token'){
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })

               localStorage.clear()
               this.router.push('/login')
            } else {
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })
            }
         }
      },


      async updateStatus(id){

         try {
            
            await axios({
               url: baseUrl + `/games/favorites/${id}`,
               method: 'PATCH',
               headers: {
                  access_token: localStorage.access_token
               }
            })

            this.router.push('/profile')
         } catch (error) {
            if(error.response.data.message === 'Invalid token'){
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })

               localStorage.clear()
               this.router.push('/login')
            } else {
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })
            }
         }
      },

      async addFavorite(id){

         try {
            
            await axios({
               url: baseUrl + `/games/favorites/${id}`,
               method: 'POST',
               headers: {
                  access_token: localStorage.access_token
               }
            })


            this.router.push('/profile')
         } catch (error) {
            if(error.response.data.message === 'Invalid token'){
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })

               localStorage.clear()
               this.router.push('/login')
            } else {
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })
            }
         }
      },

      async subscribe(){

         console.log('HIT SUBSCRIBE');

         try {
            await axios({
               url: baseUrl + '/games/subs',
               method: "PATCH",
               headers: {
                  access_token: localStorage.access_token
               }
            })

            localStorage.setItem('isSubs', true)
            this.isSubs = true
            this.router.push('/profile')
         } catch (error) {
            if(error.response.data.message === 'Invalid token'){
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })

               localStorage.clear()
               this.router.push('/login')
            } else {
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
               })
            }
         }
      },

      async payMidtrans(){

         try {
            
            const {data} = await axios({
               url: baseUrl + '/games/generate-mitrans-token',
               method: 'POST',
               headers: {
                  access_token: localStorage.access_token
               }
            })

            const cb = this.subscribe

            window.snap.pay(data.token, {
               onSuccess: function(){
                 /* You may add your own implementation here */
                  console.log('Yuk boss paymentnya');
                  cb()
               }
            })
         } catch (error) {
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
            }) 
         }
      },


      callback(response){
         
         axios({

            url: baseUrl + '/google-login',
            method:'POST', 
            headers: {
               access_token: response.credential
            }
         }).then(result=> {
            const { data } = result
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('isSubs', data.isSubs)
            localStorage.setItem('createdAt', data.createdAt)
            

            this.router.push('/')
            this.isLogin = true

         }).catch(err => {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: err.response,
         }) 
         })
      }
   },

   
})