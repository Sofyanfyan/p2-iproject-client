<script>

export default{
   props:['data']
}

</script>


<template>
   <div class="col-lg-4">
      <img :src="data.image" alt=""
         style="border-radius: 23px; margin-bottom: 30px;">
   </div>
</template>