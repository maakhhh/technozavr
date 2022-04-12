<template>
  <div>
    <h1>OOPS!</h1>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: ['message'],
};
</script>

<style scoped>
  h1 {
    margin-bottom: 0;
    margin-top: 0;

    font-size: 150px;
    line-height: 130px;
    font-weight: 700;
    text-align: center;
  }

  .message {
    font-size: 40px;
    line-height: 30px;
    text-align: center;
  }
</style>
