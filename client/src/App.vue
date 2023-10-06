<template>
  <employee></employee>
</template>

<script>
import employee from '../src/components/employees.vue'

export default {
  name: 'App',
  components: {
     employee
  }
}
</script>

<style>
#app {

  text-align: center;
 
  margin-top: 20px;
}
</style>
