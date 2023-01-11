<script>

import Card from '../components/BrowseCard.vue'
import { useStore } from '../stores/game';
import {mapActions, mapWritableState, mapState} from 'pinia'

export default {


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


}

</script>



<template>
   <div class="container">
      <div class="row">
         <div class="col-lg-12">
            <div class="page-content">

               <!-- ***** Featured Games Start ***** -->
               <div class="row">
                  <div class="col-lg-8">
                     <div class="featured-games header-text">
                        <div class="heading-section">
                           <h4><em>Featured</em> Games</h4>
                        </div>
                        <h6>
                           Welcome to Cyborg Games, where we're dedicated to bringing you the best in online gaming experiences. We're a small but talented team of developers and 
                           designers who are passionate about creating fun and engaging games that are accessible to players of all ages and skill levels <br><br>

                           Our mission is to create games that are not only entertaining, but also thought-provoking and challenging. We believe that games can be more 
                           than just a way to pass the time, they can be a powerful tool for learning and personal growth. That's why we strive to create games that are 
                           not only fun to play, but also educational and thought-provoking. <br><br>

                           We're always looking to improve our games and make them as fun and enjoyable as possible, so if you have any feedback, suggestions, or just want to say hi, 
                           please feel free to contact us through the contact section in the website. We also have active community section where you can interact with other players, 
                           share your experiences and get help. <br><br>

                           We're also committed to social responsibility and using our platform for good, as such we have dedicated few games for social causes like helping children learn in an interactive way, and spreading awareness about various social issues like mental health, environment etc.

                           Thank you for choosing Cyborg Games. We hope you enjoy your time with us! <br><br>
                     
                        </h6>
                     </div>
                  </div>
                  <div class="col-lg-4">
                     <div class="top-downloaded">
                        <div class="heading-section">
                           <h4 class="text-center"><em>Filter</em> Cyborg</h4>
                        </div>

                        <form>

                           <div class="my-4 form-group" >
                              <label for="Sort" class="text-white">Sort By : </label>
                              <select name="sort" id="Sort" class="text-center form-select" placeholder="Sort"> 
                                 <option :value="this.$route.query.sort?  this.$route.query.sort : ''">{{ this.$route.query.sort?  this.$route.query.sort : 'Relevance' }}</option>
                                 <option v-if="this.$route.query.sort" value="">Relevance</option>
                                 <option value="release-date">release-date</option>
                                 <option value="popularity">popularity</option>
                                 <option value="alphabetical">alphabetical</option>
                              </select><br>
                           </div>
                           <div class="my-4 form-group" >
                              <label for="Sort" class="text-white">Genre : </label>
                              <select name="category" id="Sort" class="text-center form-select" placeholder="Sort"> 
                                 <option :value="this.$route.query.category?  this.$route.query.category : ''">{{ this.$route.query.category?  this.$route.query.category : 'All Genre'}}</option>
                                 <option v-if="this.$route.query.category" value="">All Genre</option>
                                 <option value="action">action</option>
                                 <option value="strategy">strategy</option>
                                 <option value="racing">racing</option>
                                 <option value="sports">sports</option>
                                 <option value="mmorpg">mmorpg</option>
                                 <option value="shooter">shooter</option>
                                 <option value="moba">moba</option>
                                 <option value="pvp">pvp</option>
                                 <option value="horror">horror</option>
                              </select><br>
                           </div>
                           <div class="my-4 form-group" >
                              <label for="Sort" class="text-white">Platform : </label>
                              <select name="platform" id="Sort" class="text-center form-select" placeholder="Sort"> 
                                 <option :value="this.$route.query.platform?  this.$route.query.platform : ''">{{ this.$route.query.platform?  this.$route.query.platform : 'All Platform' }}</option>
                                 <option v-if="this.$route.query.platform" value="">All Platform</option>
                                 <option value="pc">PC (Windows)</option>
                                 <option value="browser">Web Browser</option>
                              </select><br>
                           </div>
                           <button type="submit" class="btn btn-primary">Submit</button>
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
                        <h4><em>Most Popular</em> Right Now</h4>
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