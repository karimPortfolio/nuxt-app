<template>
  <q-layout>
    <q-page-container class="p-0">
      <q-page>
        <!-- navbar -->
        <Navbar />

        <!-- main content -->
        <slot />

        <!-- footer -->
        <Footer />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

</script>
