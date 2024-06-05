<template>
    <div>
      <button @click="printContent">Print</button>
      <div ref="printArea" id="pri">
        <!-- This is the content you want to print -->
        <h1>Hello, World!</h1>
        <p>This is a paragraph to be printed.</p>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue';

const printContent = () => {
  const printableElement = document.getElementById('pri');

  if (printableElement) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Printable Content in script setup</title>
          <style>
            /* Your print styles can go here */
            /* Example: Hide buttons and optimize layout for printing */
            button { display: none; }
          </style>
        </head>
        <body>
          ${printableElement.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  } else {
    alert('Could not find printable content.');
  }
};
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
  