<script>

import { useStore } from '../stores/game';
import { mapWritableState, mapActions } from 'pinia';

import Card from '../components/DetailCard.vue'

export default{

   components:{
      Card,
   },

   methods: {
      ...mapActions(useStore, ['gameId', 'addFavorite']),
      favoriteLocal(){

         this.addFavorite(this.detail.id)
      }
   }, 

   computed: {

      ...mapWritableState(useStore, ['detail', 'isSubs'])
   },

   created(){
      
      this.gameId(this.$route.params.gameId)
   }
}  

</script>


<template>
   <div class="container">
      <div class="row">
         <div class="col-lg-12">
            <div class="page-content">

               <!-- ***** Featured Start ***** -->
               <div class="row">
                  <div class="col-lg-12">
                     <div class="feature-banner header-text">
                        <div class="row">
                           <div class="col-lg-12">
                              <img :src="detail.thumbnail" alt="" style="border-radius: 23px; height: 500px;">
                           </div>

                        </div>
                     </div>
                  </div>
               </div>
               <!-- ***** Featured End ***** -->

               <!-- ***** Details Start ***** -->
               <div class="game-details">
                  <div class="row">
                     <div class="col-lg-12">
                        <h2>{{ detail.title }}</h2>
                     </div>
                     <div class="col-lg-12">
                        <div class="content">
                           <div class="row">
                              <div class="col-lg-6">
                                 <div class="left-info">
                                    <div class="left">
                                       <h4>{{ detail.title }}</h4>
                                       <span>{{ detail.developer }}</span>
                                    </div>
                                    <ul>
                                       <li><i class="fa fa-calendar"></i> {{ detail.release_date?  detail.release_date : '?'}}</li>
                                       <li><i class="fa fa-desktop mx-1"></i>{{ detail.platform? detail.platform : '?' }}</li>
                                    </ul>
                                 </div>
                              </div>
                              <div class="col-lg-6">
                                 <div class="right-info">
                                    <ul>
                                       <li><i class="fa fa-star"></i> {{ detail.status }}</li>
                                       <li><i class="fa fa-memory"></i> {{ detail.minimum_system_requirements?  detail.minimum_system_requirements.memory : '?'}}</li>
                                       <li><i class="fa fa-download"></i>{{ detail.minimum_system_requirements?  detail.minimum_system_requirements.storage : '?'}}</li>
                                       <li><i class="fa fa-gamepad"></i> {{ detail.genre }}</li>
                                    </ul>
                                 </div>
                              </div>
                              <!-- <div class="col-lg-4">
                                 <img src="../assets/images/details-01.jpg" alt=""
                                    style="border-radius: 23px; margin-bottom: 30px;">
                              </div>
                              <div class="col-lg-4">
                                 <img src="../assets/images/details-02.jpg" alt=""
                                    style="border-radius: 23px; margin-bottom: 30px;">
                              </div>
                              <div class="col-lg-4">
                                 <img src="../assets/images/details-03.jpg" alt=""
                                    style="border-radius: 23px; margin-bottom: 30px;">
                              </div> -->
                              <div class="text-center my-5 ">
                                 <button @click.prevent="favoriteLocal" type="button" class="btn btn-outline-secondary btn-sm rounded" style="width:200px;">Add to favorites <i class="fa fa-heart"></i></button>
                              </div>
                              <Card v-for="el in detail.screenshots" :key="el.id" :data="el"/>
                              

                              <div class="col-lg-12">
                                 <p>{{ detail.description }}</p>
                              </div>
                              <div class="col-lg-12" v-if="isSubs == 'true'">
                                 <div class="main-border-button">
                                    <a :href="detail.game_url">Download Now!</a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- ***** Details End ***** -->


               <div class="start-stream" v-if="isSubs == 'false'">
               <div class="col-lg-12">
                  <div class="heading-section">
                     <h4><em>How To Download</em>This Game?</h4>
                  </div>
                  <div class="row">
                     <div class="col-lg-4">
                        <div class="item">
                           <div class="icon">
                              <img src="../assets/images/service-01.jpg" alt=""
                                 style="max-width: 60px; border-radius: 50%;">
                           </div>
                           <h4>Go To Your Profile</h4>
                           <p> <b>Step 1 : </b> Check your profile!, make sure you have subscribed to cyborg games, to get access to the download link.</p>
                        </div>
                     </div>
                     <div class="col-lg-4">
                        <div class="item">
                           <div class="icon">
                              <img src="../assets/images/service-02.jpg" alt=""
                                 style="max-width: 60px; border-radius: 50%;">
                           </div>
                           <h4>Live Stream Button</h4>
                           <p> <b>Step 2 : </b>If you haven't subscribed yet, press the subscribe button available on your profile.</p>
                        </div>
                     </div>
                     <div class="col-lg-4">
                        <div class="item">
                           <div class="icon">
                              <img src="../assets/images/service-03.jpg" alt=""
                                 style="max-width: 60px; border-radius: 50%;">
                           </div>
                           <h4>You Are Live</h4>
                           <p> <b>Step 3 : </b>After that you will be directed to the payment page, and then you can enjoy all the games here.</p>
                        </div>
                     </div>
                     <div class="col-lg-12">
                        <div class="main-button">
                           <router-link to="/profile">Go To Profile</router-link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            </div>
         </div>
      </div>
   </div>
</template>