<template>
  <section
    class="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden relative"
  >
    <div class="container mx-auto">
      <!-- Background decorative elements -->
      <div
        class="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
      ></div>

      <!-- Section header with animation classes -->
      <div class="relative z-10">
        <h2
          class="text-5xl font-bold mb-4 text-center text-gray-800 animate-fadeIn tracking-tight"
        >
          <span class="relative inline-block">
            Student
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 relative"
              >Voices
              <span
                class="absolute -bottom-2 left-0 w-full h-2 bg-indigo-400 opacity-40 rounded-full transform -rotate-1"
              ></span>
            </span>
          </span>
        </h2>
        <p
          class="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg leading-relaxed animate-fadeIn animation-delay-200"
        >
          Discover how our platform has helped
          <span
            class="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700"
            >thousands transform</span
          >
          their careers and lives
        </p>
      </div>

      <!-- Testimonial cards with improved layout and styling -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        <q-card
          v-for="(testimonial, i) in testimonials"
          :key="i"
          class="transform transition-all duration-500 rounded-2xl border-0 hover:shadow-2xl"
          :class="{
            'md:translate-y-8': i === 1,
            'md:-translate-y-4': i === 2,
            'hover:-translate-y-2': true,
          }"
          flat
        >
          <q-card-section
            class="p-8 relative overflow-hidden bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-2xl"
          >
            <q-icon
              name="format_quote"
              size="5rem"
              class="text-blue-100 absolute -top-5 -right-5 opacity-70 rotate-180"
            />

            <p
              class="my-6 text-gray-700 relative z-10 italic font-light text-lg leading-relaxed"
            >
              {{ testimonial.quote }}
            </p>

            <div class="pt-4 mt-6 border-t border-gray-100">
              <div class="flex items-center">
                <q-avatar
                  size="3.5rem"
                  class="ring-2 ring-blue-100 ring-offset-2"
                >
                  <img :src="testimonial.avatar" />
                </q-avatar>
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">
                    {{ testimonial.name }}
                  </h4>
                  <span class="text-gray-500 text-sm">{{
                    testimonial.role
                  }}</span>
                </div>
              </div>
              <div class="mt-4 flex items-center">
                <q-rating
                  v-model="testimonial.rating"
                  max="5"
                  size="1.2em"
                  color="amber-8"
                  readonly
                />
                <span class="ml-2 text-amber-600 font-medium"
                  >{{ testimonial.rating }}.0</span
                >
                <span class="ml-auto text-sm text-gray-400">{{
                  testimonial.date
                }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- <div class="text-center mt-16 relative z-10">
        <q-btn
            color="indigo-8"
            class="btn-explore px-6 py-3 text-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
            unelevated
            :ripple="{ color: 'rgba(255,255,255,0.4)', early: true }"
            aria-label="Explore All Student Stories"
        >
            <div class="flex items-center gap-2">
                <span>Explore All Student Stories</span>
                <q-icon name="arrow_forward" class="text-lg ml-1 transition-all duration-300 transform group-hover:translate-x-1" />
            </div>
        </q-btn>
      </div> -->
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";

const rating = ref(4.5);

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Web Developer",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    quote:
      "The courses here completely changed my career path. I went from knowing basic HTML to building full-stack applications in just 3 months!",
    rating: 5,
    date: "March 15, 2023",
  },
  {
    name: "Michael Chen",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    quote:
      "The instructors are incredible and the community support is unmatched. I've tried many platforms but none compare to the quality here.",
    rating: 5,
    date: "January 8, 2023",
  },
  {
    name: "Priya Patel",
    role: "Data Scientist",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    quote:
      "I was skeptical at first, but the hands-on projects helped me build a portfolio that landed me my dream job. Worth every penny!",
    rating: 4,
    date: "February 22, 2023",
  },
];
</script>
