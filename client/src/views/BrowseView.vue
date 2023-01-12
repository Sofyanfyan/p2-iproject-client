<script>

import Card from '../components/BrowseCard.vue'
import { useStore } from '../stores/game';
import {mapActions, mapWritableState, mapState} from 'pinia'

export default {

   data(){
      return{
         isLoad:true
      }
   },
   components: {
      Card,
   },
   computed:{
      ...mapWritableState(useStore, ['game']),
      ...mapState(useStore, ['gameSearch'])
   },

   methods: {

      ...mapActions(useStore, ['fetchGame'])
   },

   created(){

      this.fetchGame(this.$route.query.category, this.$route.query.sort, this.$route.query.platform);
   },

   mounted(){
      setTimeout(() => {
         this.isLoad = false
      }, 400);
   },

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
                  <div class="col-lg-8">
                     <div class="featured-games header-text">
                        <div class="heading-section">
                           <h4><em>About</em></h4>
                        </div>
                        <h6>
                           Welcome to <span>Cyborg</span>, where I am dedicated to bringing you the best in online gaming experiences. I am developers and designers who are passionate about 
                           creating fun and engaging games that are accessible to players of all ages and skill levels. <br><br>

                           My mission is to create games that are <span>not only entertaining</span>, but also thought-provoking and challenging. I believe that games can be more than 
                           just a way to pass the time, they can be a 
                           powerful tool for learning and personal growth. That's why I strive to create games that are not only fun to play, but also <span>educational</span> and thought-provoking. <br><br>

                           I am always looking to improve my games and make them as <span>fun and enjoyable</span> as possible, so if you have any feedback, suggestions, or just want to say hi, 
                           please feel free to contact me through email <i><span>cyborggames@outlook.co.id</span></i>. 
                           I also have an active community section where you can interact with other players, share your experiences, and get help. <br><br>

                           I am also committed to social responsibility and using my platform for good, as such I have dedicated a few games for social causes like helping children learn in 
                           an interactive way, 
                           and spreading awareness about various social issues like mental health, environment, etc. <span>Thank you</span> for choosing Cyborg Games. I hope you enjoy your time with me! <br><br>
                     
                        </h6>
                     </div>
                  </div>
                  <div class="col-lg-4">
                     <div class="top-downloaded">
                        <div class="heading-section">
                           <h4 class="text-center"><em>Games</em> Filter</h4>
                        </div>

                        <form>

                           <div class="my-4 form-group" >
                              <label for="Sort" class="text-white">Sort By : </label>
                              <select name="sort" id="Sort" class="text-center form-select" placeholder="Sort"> 
                                 <option :value="this.$route.query.sort?  this.$route.query.sort : ''">{{ this.$route.query.sort?  this.$route.query.sort : 'Relevance' }}</option>
                                 <option v-if="this.$route.query.sort" value="">Relevance</option>
                                 <option v-if="this.$route.query.sort !== 'release-date'" value="release-date">release-date</option>
                                 <option v-if="this.$route.query.sort !== 'popularity'" value="popularity">popularity</option>
                                 <option v-if="this.$route.query.sort !== 'alphabetical'" value="alphabetical">alphabetical</option>
                              </select><br>
                           </div>
                           <div class="my-4 form-group" >
                              <label for="Sort" class="text-white">Genre : </label>
                              <select name="category" id="Sort" class="text-center form-select" placeholder="Sort"> 
                                 <option :value="this.$route.query.category?  this.$route.query.category : ''">{{ this.$route.query.category?  this.$route.query.category : 'All Genre'}}</option>
                                 <option v-if="this.$route.query.category" value="">All Genre</option>
                                 <option v-if="this.$route.query.category !== 'action'" value="action">action</option>
                                 <option v-if="this.$route.query.category !== 'hahha'" value="strategy">strategy</option>
                                 <option v-if="this.$route.query.category !== 'racing'" value="racing">racing</option>
                                 <option v-if="this.$route.query.category !== 'sports'" value="sports">sports</option>
                                 <option v-if="this.$route.query.category !== 'mmorpgc'" value="mmorpg">mmorpg</option>
                                 <option v-if="this.$route.query.category !== 'shooter'" value="shooter">shooter</option>
                                 <option v-if="this.$route.query.category !== 'moba'" value="moba">moba</option>
                                 <option v-if="this.$route.query.category !== 'pvp'" value="pvp">pvp</option>
                                 <option v-if="this.$route.query.category !== 'horror'" value="horror">horror</option>
                              </select><br>
                           </div>
                           <div class="my-4 form-group" >
                              <label for="Sort" class="text-white">Platform : </label>
                              <select name="platform" id="Sort" class="text-center form-select" placeholder="Sort"> 
                                 <option :value="this.$route.query.platform?  this.$route.query.platform : ''">{{ this.$route.query.platform?  this.$route.query.platform : 'All Platform' }}</option>
                                 <option v-if="this.$route.query.platform" value="">All Platform</option>
                                 <option v-if="this.$route.query.platform !== 'pc'" value="pc">pc</option>
                                 <option v-if="this.$route.query.platform !== 'browser'" value="browser">browser</option>
                              </select><br>
                           </div>
                           <button type="submit" class="btn btn-secondary">Submit</button>
                        </form>


                        <!-- <div class="text-button">
                  <a href="profile.html">View All Games</a>
                  </div> -->
                     </div>
                  </div>
               </div>
               <!-- ***** Featured Games End ***** -->

               <!-- ***** Live Stream Start ***** -->
               <div class="live-stream">
                  <div class="col-lg-12">
                     <div class="heading-section">
                        <h4><em>Games</em> List</h4>
                     </div>
                  </div>
                  <div class="row">
                     
                     <Card v-for="el in gameSearch" :key="el.id" :data="el" />

                  </div>
               </div>
               <!-- ***** Live Stream End ***** -->

            </div>
         </div>
      </div>
      </div>
</template>



<style scoped>

span{
   color: #e75e8d
}

</style>