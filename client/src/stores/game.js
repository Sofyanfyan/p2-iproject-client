import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const useStore = defineStore('counter', {
   state: () => ({ 
      popular: [],
      game: [],
      search: '',
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
      
      async fetchGame(category, sort, platform, search){


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

         console.log(sort, '<<<<SORT');
         console.log(category, '<<<<<< GENRE');
         console.log(platform, "<<<<<<<< PLATFORM");
         console.log(search, "<<<<<<<< SEARCH");

         try {
            
            const {data} = await axios({

               url, 
               method: 'GET',
               headers: {
                  access_token : localStorage.access_token
               }
            })

            if(search){
               const filter = data.filter(el => {
                  search.includes(el.title)
               })
               
               this.game = filter
               console.log(filter, "<<<<FILTER");
            }else {
               
               this.game = data
               console.log(data);
            }

         } catch (error) {
            console.log(error);
         }
      },

   },
})