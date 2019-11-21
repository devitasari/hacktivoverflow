<template>
  <div id="app" class="flex">
    <Navbar/>

    <router-view/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
