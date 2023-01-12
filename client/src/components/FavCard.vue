<script>

import Swal from 'sweetalert2'

import { useStore } from '../stores/game';
import {mapActions} from 'pinia';

export default{

   props:['data'],

   methods:{
      ...mapActions(useStore, ['updateStatus']),
      updateLocal(){

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
               this.updateStatus(this.data.id)
               this.$router.go()
               Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Status Completed',
                  showConfirmButton: false,
                  timer: 1500
               })
            }
         })
      }
   }
}


</script>



<template>
   <div class="item">
      <ul>
         <li><img :src="data.imageUrl" alt="" class="templatemo-item" style="width:80px;"></li>
         <li>
            <h4>Games</h4><span>{{ data.name }}</span>
         </li>
         <li>
            <h4>Genre</h4><span>{{ data.genre }}</span>
         </li>
         <li>
            <h4>Date Added</h4><span>{{ data.createdAt.toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0,10) }}</span>
         </li>
         <li>
            <h4>Currently</h4><span v-if="data.status === 'Completed'"> Have Played </span> <span v-if="data.status === 'Uncompleted'"> Nope! </span>
         </li>
         <li v-if="data.status === 'Completed'">
            <h4 class="text-center text-success">Completed</h4>
         </li>
         <li v-if="data.status === 'Uncompleted'">
            <button type="button" class="btn btn-outline-secondary" data-mdb-ripple-color="dark" @click.prevent="updateLocal">Have you played?</button>
         </li>
         
      </ul>
   </div>
</template>