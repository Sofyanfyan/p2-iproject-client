<script>

import { useStore } from '../stores/game';
import { mapWritableState } from 'pinia';

export default {
   
   computed:{
      ...mapWritableState(useStore, ['search'])
   }
}

</script>



<template>

   <!-- <div id="js-preloader" class="js-preloader">
      <div class="preloader-inner">
         <span class="dot"></span>
         <div class="dots">
            <span></span>
            <span></span>
            <span></span>
         </div>
      </div>
   </div> -->

   <header class="header-area header-sticky position-fixed">
      <div class="container">
         <div class="row">
            <div class="col-12">
               <nav class="main-nav">
                  <!-- ***** Logo Start ***** -->
                  <div href="index.html" class="logo">
                     <img src="../assets/images/logo.png" alt="">
                  </div>
                  <!-- ***** Logo End ***** -->
                  <!-- ***** Search End ***** -->
                  <div class="search-input">
                     <form id="search" action="#">
                        <input type="text" placeholder="Type Something" id='searchText' v-model="search"
                           onkeypress="handle" />
                        <i class="fa fa-search"></i>
                     </form>
                  </div>
                  <!-- ***** Search End ***** -->
                  <!-- ***** Menu Start ***** -->
                  <ul class="nav">
                     <li><router-link to="/" class="active">Home</router-link></li>
                     <li><router-link to="/browse">Browse</router-link></li>
                     <li><router-link to="/profile">Profile <img src="../assets/images/profile-header.jpg" alt=""></router-link></li>
                  </ul>
                  <a class='menu-trigger'>
                     <span>Menu</span>
                  </a>
                  <!-- ***** Menu End ***** -->
               </nav>
            </div>
         </div>
      </div>
   </header>
</template>