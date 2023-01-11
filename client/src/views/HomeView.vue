<script>

import Card from '../components/PopularCard.vue'
import { useStore } from '../stores/game';
import {mapActions, mapWritableState} from 'pinia'

export default {

   components:{
      Card,
   },
   computed:{
      ...mapWritableState(useStore, ['popular'])
   },
   methods:{

      ...mapActions(useStore, ['fetchPopular']),
   },
   created(){

      this.fetchPopular()
   }
}

</script>


<template>
   <div class="container">
      <div class="row">
         <div class="col-lg-12">
            <div class="page-content">

               <!-- ***** Banner Start ***** -->
               <div class="main-banner">
                  <div class="row">
                     <div class="col-lg-7">
                        <div class="header-text">
                           <h6>Welcome To Cyborg</h6>
                           <h4><em>Browse</em> Our Popular Games Here</h4>
                           <div class="main-button">
                              <router-link to="/browse">Browse Now</router-link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- ***** Banner End ***** -->

               <div class="live-stream">
                  <div class="col-lg-12">
                     <div class="heading-section">
                        <h4><em>Most Popular</em> Right Now</h4>
                     </div>
                  </div>
                  <div class="row">
                     
                     <Card v-for="el in popular" :key="el.id" :data="el"/>

                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>