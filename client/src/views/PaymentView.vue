<script>

import { useStore } from '../stores/game';
import {mapActions} from 'pinia';

export default {

   methods: {
      ...mapActions(useStore, ['payMidtrans'])
   }

}

</script>


<template>
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
                           Click Link Below to access payment method 

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