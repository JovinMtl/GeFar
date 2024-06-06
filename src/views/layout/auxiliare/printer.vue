<template>
  <main>
    <section class="chapter">
      <h2>About</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Duis nibh tortor</p>
    </section>

    <section class="chapter">
      <h2>Chapter 1</h2>
      <p>Lorem ipsum dolor sit amet</p>
    </section>

    <section class="chapter">
      <h2>Chapter 2</h2>
      <p>consectetur adipiscing elit</p>
    </section>

    <section class="chapter">
      <h2>Chapter 3</h2>
      <p>Duis nibh tortor, pellentesque eu suscipit vel</p>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { Previewer } from 'pagedjs';

onMounted(() => {
  let paged = new Previewer();

  paged.preview().then((flow) => {
    console.log('Rendered', flow.total, 'pages.');
  });
});
</script>
  
<style scoped>
@page {
  size: A6;
  /* margin: 20mm 15mm 26mm 15mm; */
  margin: 20mm 15mm 26mm 15mm;
}
</style>

h2 {
    break-before: page;
  }
  