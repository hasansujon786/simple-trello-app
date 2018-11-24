<template>
  <div class="col-6 mb-4">
    <div class="card">
      <div class="card-header">
        <h3>{{ textArea.name }}</h3>
      </div>
      <div class="card-body">
        <p>{{ textArea.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['textArea']
}
</script>

<style>
</style>
