<script>

import {useStore} from '../stores/game.js'

import { mapActions } from 'pinia'

export default {

   data(){
      return{
         email: '',
         password: ''
      }
   },

   methods: {
      ...mapActions(useStore, ['login']),
      loginLocal(){

         const value = {
            email: this.email,
            password: this.password,
         }

         this.login(value)
      }
   }

}

</script>


<template>

   <div class="container">
      <div class="row">
         <div class="col-lg-12">
            <div>
                  <section class="vh-100" style="background-color: #27292a; border-radius: 25px;">
                     <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                           <div class="col col-xl-10">
                              <div class="card bg-black" style="border-radius: 1rem;">
                                 <div class="row g-0">
                                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                                       <img src="https://i.pinimg.com/originals/6f/bc/96/6fbc96ceb91aacda6055800ed5645973.jpg"
                                          alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                                    </div>
                                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                       <div class="card-body p-4 p-lg-5 text-black">
                                       
                                          <form @submit.prevent="loginLocal">
                                          
                                             <div class="d-flex align-items-center mb-3 pb-1">
                                                <!-- <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i> -->
                                                <img src="../assets/images/logo.png" alt="" style="width:200px;" >
                                                <!-- <span class="h1 fw-bold mb-0">Cyborg</span> -->
                                             </div>
                                          
                                             <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>
                                          
                                             <div class="form-outline mb-4">
                                                <input type="email" id="form2Example17" class="form-control form-control-lg" v-model="email" placeholder="example@email.com"/>
                                                <label class="form-label text-white" for="form2Example17">Email address</label>
                                             </div>
                                          
                                             <div class="form-outline mb-4">
                                                <input type="password" id="form2Example27" class="form-control form-control-lg" v-model="password" />
                                                <label class="form-label text-white" for="form2Example27">Password</label>
                                             </div>
                                          
                                             <!-- <GoogleLogin :callback="callback"/> -->

                                             <div class="pt-1 mb-4 mt-3">
                                                <button class="btn btn-dark btn-lg btn-block" type="submit" style="background-color:#e75e8d">Login</button>
                                             </div>

                                          </form>

                                       
                                          <p class="mb-5 pb-lg-2" style="color: white;">Don't have an account? 
                                             <router-link to="/register" style="color: #e75e8d;">Register here</router-link></p>
                                          
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>

            </div>
         </div>
      </div>
   </div>
</template>