<script>

import { useStore } from '../stores/game';
import {mapActions} from 'pinia';

export default {

   data(){
      return{
         isLoad: true
      }
   },

   methods: {
      ...mapActions(useStore, ['payMidtrans'])
   },
   
   mounted(){
      setTimeout(() => {
         this.isLoad = false
      }, 500);
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

               <!-- ***** Featured Games Start ***** -->
               <div class="row">
                  <div class="col-lg-12">
                     <div class="featured-games header-text">
                        <div class="heading-section">
                           <h4><em>Payment</em> Cyborg</h4>
                        </div>
                        <p>
                           Click Link Below!, To get access to download links for all games

                           <br><br><br>
                        </p>
                        <button type="button" class="btn btn-outline-secondary" @click.prevent="payMidtrans"><i class="fa fa-dollar"></i> Purchase</button>
                     
                        
                     </div>
                  </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>