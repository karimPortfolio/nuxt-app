<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-28 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-pattern opacity-20 animate-pulse-slow"
      ></div>
      <!-- Abstract shapes for background interest -->
      <div
        class="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
      ></div>
      <div
        class="absolute bottom-10 left-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"
      ></div>

      <div class="container mx-auto px-4 relative z-10">
        <div
          class="flex flex-nowrap flex-col md:flex-row items-center justify-between gap-12"
        >
          <div class="mb-8 md:mb-0">
            <div
              class="inline-block px-3 py-1 bg-blue-600/30 backdrop-blur-sm rounded-full text-blue-100 font-medium text-sm mb-6 border border-blue-500/20 shadow-glow"
            >
              <span class="mr-2">🚀</span> The future of online learning is here
            </div>
            <h1
              class="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in tracking-tight"
            >
              Expand Your
              <span
                class="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 animate-gradient"
                >Knowledge</span
              >
            </h1>
            <p class="text-xl mb-8 text-blue-100 max-w-lg leading-relaxed">
              Discover thousands of online courses from expert instructors
              around the world, designed to elevate your skills to the next
              level.
            </p>
            <div class="flex flex-wrap gap-5">
              <q-btn
                unelevated
                rounded
                color="white"
                text-color="blue-800"
                size="lg"
                label="Get Started"
                class="font-medium px-10 py-2 hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              />
              <q-btn
                outline
                rounded
                color="white"
                label="Learn more"
                class="hover:bg-blue-700/30 transition-all backdrop-blur-sm px-8 border-2"
              />
            </div>
            <div
              class="mt-10 flex items-center p-4 bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20"
            >
              <div class="flex -space-x-3">
                <q-avatar
                  size="46px"
                  class="border-2 border-blue-700 shadow-lg"
                >
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" />
                </q-avatar>
                <q-avatar
                  size="46px"
                  class="border-2 border-blue-700 shadow-lg"
                >
                  <img src="https://randomuser.me/api/portraits/men/44.jpg" />
                </q-avatar>
                <q-avatar
                  size="46px"
                  class="border-2 border-blue-700 shadow-lg"
                >
                  <img src="https://randomuser.me/api/portraits/women/42.jpg" />
                </q-avatar>
                <div
                  class="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold border-2 border-blue-700 shadow-lg"
                >
                  +5k
                </div>
              </div>
              <div class="ml-4">
                <div class="text-white font-semibold">Join our community</div>
                <div class="text-blue-200 text-sm">
                  10K+ students enrolled this month
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="relative group">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-3xl opacity-30 transform -rotate-6 group-hover:opacity-40 transition-all duration-700"
              ></div>
              <img
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                class="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700 relative z-10 border border-white/10"
                alt="Students learning online"
              />

              <div
                class="absolute -bottom-8 -left-8 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl p-5 shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
              >
                <div class="flex items-center">
                  <div class="mr-3">
                    <q-icon name="star" color="blue-900" size="1.8rem" />
                  </div>
                  <div>
                    <div class="text-blue-900 font-bold text-2xl">4.9/5</div>
                    <div class="text-sm text-blue-900 font-medium">
                      Student satisfaction
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="absolute top-6 -right-6 z-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
              >
                <div class="text-blue-900 font-bold flex items-center">
                  <q-icon
                    name="school"
                    size="1.8rem"
                    class="mr-3 text-blue-600"
                  />
                  <div>
                    <div class="text-lg">500+ Courses</div>
                    <div class="text-xs text-blue-500 font-normal">
                      Updated weekly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="py-8 container mx-auto px-4 -mt-16 relative z-20">
      <q-card
        class="shadow-2xl rounded-2xl border border-gray-100 hover:shadow-blue-100/50 transition-all duration-300 backdrop-blur-sm bg-white/95"
      >
        <q-card-section class="p-8">
          <div class="flex flex-col md:flex-row items-stretch gap-6">
            <div class="relative w-full group flex-1">
              <div
                class="absolute -top-3 -left-3 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"
              ></div>
              <div
                class="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse-slow animation-delay-1000"
              ></div>

              <q-input
                outlined
                dense
                class="w-full text-lg shadow-inner"
                placeholder="What do you want to learn today?"
                bg-color="white"
                rounded
                borderless
                style="box-shadow: inset 0 0 0 1px rgba(209, 213, 219, 0.5)"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="search"
                    color="blue-600"
                    size="1.2rem"
                    class="ml-2 animate-bounce-subtle"
                  />
                </template>
                <template v-slot:append>
                  <q-btn
                    round
                    flat
                    size="sm"
                    icon="mic"
                    color="blue-500"
                    class="hover:bg-blue-50 transition-colors mr-1"
                  >
                    <q-tooltip>Search by voice</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
              <div
                class="absolute -bottom-6 left-3 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
              >
                <span class="font-medium text-blue-600 mr-1">Pro tip:</span> Try
                "Web Development", "Python", "UI Design"
              </div>
            </div>
            <q-btn
              rounded
              color="primary"
              label="Search Courses"
              class="w-full md:w-auto px-8 py-2.5 text-base font-medium transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
              icon-right="trending_flat"
            />
          </div>
          <div class="flex flex-wrap gap-3 mt-10 relative">
            <div
              class="text-gray-600 mr-2 self-center text-sm font-medium flex items-center"
            >
              <q-icon
                name="trending_up"
                size="sm"
                color="blue-600"
                class="mr-1.5 animate-pulse"
              />
              <span>Trending:</span>
            </div>
            <q-chip
              clickable
              color="blue-50"
              text-color="blue-700"
              size="md"
              class="font-medium px-2 border border-blue-100 bg-blue-100 transition-all duration-300 shadow-sm hover:shadow-blue-200 transform hover:-translate-y-1 hover:scale-105"
            >
              <q-icon name="code" size="xs" class="mr-1.5" />
              JavaScript
              <q-badge color="blue-600" floating rounded class="text-xs"
                >Hot</q-badge
              >
            </q-chip>
            <q-chip
              clickable
              color="indigo-50"
              text-color="indigo-700"
              size="md"
              class="font-medium px-2 border border-indigo-100 bg-indigo-100 transition-all duration-300 shadow-sm hover:shadow-indigo-200 transform hover:-translate-y-1 hover:scale-105"
            >
              <q-icon name="design_services" size="xs" class="mr-1.5" />
              UX/UI Design
            </q-chip>
            <q-chip
              clickable
              color="purple-50"
              text-color="purple-700"
              size="md"
              class="font-medium px-2 border border-purple-100 bg-purple-100 transition-all duration-300 shadow-sm hover:shadow-purple-200 transform hover:-translate-y-1 hover:scale-105"
            >
              <q-icon name="analytics" size="xs" class="mr-1.5" />
              Data Science
              <q-badge color="purple-600" floating rounded class="text-xs"
                >New</q-badge
              >
            </q-chip>
            <q-chip
              clickable
              color="teal-50"
              text-color="teal-700"
              size="md"
              class="font-medium px-2 border border-teal-100 bg-teal-100 transition-all duration-300 shadow-sm hover:shadow-teal-200 transform hover:-translate-y-1 hover:scale-105"
            >
              <q-icon name="psychology" size="xs" class="mr-1.5" />
              Machine Learning
            </q-chip>
            <q-chip
              clickable
              color="amber-50"
              text-color="amber-700"
              size="md"
              class="font-medium px-2 border border-amber-100 bg-amber-100 transition-all duration-300 shadow-sm hover:shadow-amber-200 transform hover:-translate-y-1 hover:scale-105"
            >
              <q-icon name="language" size="xs" class="mr-1.5" />
              Languages
            </q-chip>
            <q-btn
              flat
              round
              size="sm"
              color="gray-500"
              icon="more_horiz"
              class="self-center hover:bg-gray-100 hover:text-blue-600 transition-all"
            >
              <q-tooltip>More trending topics</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </section>

    <!-- Categories Section -->
    <CategoriesSection />

    <!-- Featured Courses -->
    <FeaturesCoursesSection />

    <!-- Testimonials -->
    <TestimonialsSection />

    <!-- CTA Section -->
    <CTASection />

    <!-- Footer -->
    <FooterSection />
  </div>
</template>
<script setup>
import CategoriesSection from "./home/CategoriesSection.vue";
import FeaturesCoursesSection from "./home/FeaturesCoursesSection.vue";
import CTASection from "./home/CTASection.vue";
import TestimonialsSection from "./home/TestimonialsSection.vue";
import FooterSection from "./home/FooterSection.vue";

//add seo meta tags
useHead({
  title: "Online Learning Platform | Expand Your Knowledge",
  link: [{ rel: "icon", type: "image/x-icon", href: "/img/brand.png" }],
  meta: [
    {
      name: "description",
      content:
        "Discover thousands of online courses from expert instructors around the world, designed to elevate your skills to the next level.",
    },
    {
      name: "keywords",
      content:
        "online courses, e-learning, education, skills development, online education, professional development, learning platform",
    },
    {
      property: "og:title",
      content: "Online Learning Platform | Expand Your Knowledge",
    },
    {
      property: "og:description",
      content:
        "Discover thousands of online courses from expert instructors around the world, designed to elevate your skills to the next level.",
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/img/brand.png" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Online Learning Platform | Expand Your Knowledge",
    },
    {
      name: "twitter:description",
      content:
        "Discover thousands of online courses from expert instructors around the world.",
    },
  ],
});
</script>
