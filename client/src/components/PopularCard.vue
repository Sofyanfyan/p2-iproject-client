<script>

import { useStore } from '../stores/game';
import {mapActions} from 'pinia'

export default{
   
   props:['data'],

   methods: {
      ...mapActions(useStore, ['gameId']),


      gameIdLocal(id){

         this.$router.push(`${id}`)
      }
   },
}

</script>



<template>
   <div class="col-lg-3 col-sm-6 pointer" @click.prevent="gameIdLocal(data.id)">
      <div class="item">
         <div class="thumb">
            <img :src="data.thumbnail" alt="">
            <div class="hover-effect">
               <div class="content">
                  <div class="live">
                     <a href="#">{{ data.genre }}</a>
                  </div>
                  <ul>
                     <!-- <li><router-link href="#"><i class="fa fa-eye"></i></router-link></li> -->
                     <li><a href="#"><i class="fa fa-gamepad"></i>{{ data.platform }}</a></li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="down-content">
            <!-- <div class="avatar">
               <img :src="data.thumbnail" alt=""
                  style="max-width: 46px; border-radius: 50%; float: left;">
            </div> -->
            <span><i class="fa fa-check"></i>{{ data.developer }}</span>
            <h5>{{ data.title }}</h5>
         </div>
      </div>
   </div>
</template>


<style>

.pointer{
   cursor: pointer;
}

</style>