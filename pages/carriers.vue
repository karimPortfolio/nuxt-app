<template>
  <div>
    <h3 class="text-center font-semibold text-primary ">
      Welcome to the carriers page
    </h3>
    <p class="text-xl text-center m-0">
      This page contains information about our organization and its mission.
    </p>
  </div>

  <div class="grid grid-cols-4 px-6 gap-5 mt-10">
    <CustomCard
      v-for="job in data"
      :key="job.title"
      icon="mdiBriefcase"
      :title="job.title"
      :subtitle="job.company"
      :content="job.location"
    />
  </div>
</template>
<script setup>
const { data } = await useFetch("/api/jobs");

useSeoMeta({
  title: "Carriers",
  description:
    "This page contains information about our organization and its mission.",
  image: "https://example.com/image.jpg",
});
</script>
