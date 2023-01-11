import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const useStore = defineStore('counter', {
   state: () => ({ 
      popular: [],
      game: [],
      detail:{},
      gameLibrary:[],
      search: '',
      username: localStorage.username? localStorage.username : '',
      joined: localStorage.createdAt? localStorage.createdAt : '',
      isSubs: localStorage.isSubs == true? true : false,
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
         } catch (error) {
            
            console.log(error);
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
            

         } catch (error) {
            console.log(error);
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
            this.router.push(`/${id}`)
            console.log(data);
         } catch (error) {
            console.log(error);
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

         } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
         }
      },


      
   },

   
})