<script>

import Swal from 'sweetalert2'
import {mapActions, mapWritableState} from 'pinia'
import { useStore } from '../stores/game';

import Card from '../components/FavCard.vue'

export default {

   data(){
      return{
         isLoad:true
      }
   },

   components:{
      Card,
   },

   methods: {
      ...mapActions(useStore, ['favGame']),
      logout(){

         Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of this website!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e75e8d',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Yes, Logout!'
         }).then((result) => {
            if (result.isConfirmed) {
               localStorage.clear()
               this.$router.push('/login')
            }
         })

         
      }
   }, 
   computed: {
      ...mapWritableState(useStore, ['gameLibrary', 'username', 'joined', 'isSubs', 'page'])
   },
   created(){

      this.favGame()
   },
   mounted(){
      setTimeout(() => {
         this.isLoad = false
      }, 400);
   }
}


</script>

<template>

<div id="js-preloader" class="js-preloader" v-if="isLoad">
      <div class="preloader-inner">
         <span class="dot"></span>
         <div class="dots">
         <span></span>
         <span></span>
         <span></span>
      </div>
   </div>
</div>

   <div class="container">
      <div class="row">
         <div class="col-lg-12">
            <div class="page-content">

               <!-- ***** Banner Start ***** -->
               <div class="row">
                  <div class="col-lg-12">
                     <div class="main-profile ">
                        <div class="row">
                           <div class="col-lg-4">
                              <img src="../assets/images/profile.jpg" alt="" style="border-radius: 23px;">
                           </div>
                           <div class="col-lg-4 align-self-center">
                              <div class="main-info header-text">
                                 <span v-if="isSubs == 'false'">Not Member</span>
                                 <span v-if="isSubs == 'true'">Member</span>
                                 <h4 class="ms-1">{{ username }}</h4>
                                 <p v-if="isSubs == 'false'">You Haven't Subscribe yet. Go Subs By Touching The Button Below.</p>
                                 <p v-if="isSubs == 'true'">Thankyou for supporting us!.</p>
                                 <div class="main-border-button" v-if="isSubs == 'false'">
                                    <router-link to="/payment">Subscribe</router-link>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 align-self-center">
                              <ul>
                                 <li>Games Library <span>{{ gameLibrary.length }}</span></li>
                                 <li>Joined <span>{{ joined.toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0,10) }}</span></li>
                                 <li><button type="button" class="btn btn-outline-secondary" @click.prevent="logout">Logout</button></li>
                              </ul>
                           </div>
                        </div>
                        
                     </div>
                  </div>
               </div>
               <!-- ***** Banner End ***** -->

               <!-- ***** Gaming Library Start ***** -->
               <div class="gaming-library profile-library">
                  <div class="col-lg-12">
                     <div class="heading-section">
                        <h4><em>Your Gaming</em> Library</h4>
                     </div>

                     <Card v-for="el in gameLibrary" :key="el.id" :data="el"/>

                  </div>
               </div>
               <!-- ***** Gaming Library End ***** -->
            </div>
         </div>
      </div>
   </div>
</template>