<template>
  <section class="py-24 px-4">
    <div class="container mx-auto">
      <div class="text-center mb-20 relative">
        <!-- Floating elements for visual interest -->
        <div
          class="absolute -left-16 top-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"
        ></div>
        <div
          class="absolute -right-16 bottom-0 w-40 h-40 bg-indigo-100 rounded-full opacity-30 blur-xl"
        ></div>

        <!-- Enhanced animated badge with glassmorphism effect -->
        <span
          class="text-xs font-bold tracking-widest uppercase text-indigo-700 mb-4 inline-block animate__animated animate__fadeInDown relative px-5 py-2 bg-white bg-opacity-70 backdrop-blur-sm rounded-full shadow-sm"
        >
          <span
            class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 animate-pulse opacity-50"
          ></span>
          <span class="relative">Discover Your Path</span>
        </span>

        <!-- Modern gradient heading with animated underline -->
        <h2
          class="text-4xl md:text-6xl font-extrabold mb-6 animate__animated animate__fadeIn"
        >
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700"
          >
            Popular Categories
          </span>
          <!-- <div class="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-3 rounded-full animate__animated animate__fadeInLeft animate__delay-1s"></div> -->
        </h2>

        <!-- Enhanced paragraph with better typography -->
        <p
          class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate__animated animate__fadeInUp animate__delay-1s mb-10"
        >
          Explore our
          <span class="text-indigo-700 font-semibold">most sought-after</span>
          learning paths to accelerate your career and unlock new opportunities
        </p>

        <!-- Modern filter chips with hover effects -->
        <div
          class="flex flex-wrap justify-center gap-4 animate__animated animate__fadeInUp animate__delay-2s"
        >
          <q-chip
            clickable
            color="indigo-9"
            text-color="white"
            icon="filter_list"
            class="shadow-md hover:shadow-lg transition-all duration-300 scale-105"
          >
            Filter
            <q-badge color="white" text-color="indigo" floating>4</q-badge>
          </q-chip>
          <q-chip
            outline
            clickable
            color="blue-9"
            class="hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            <q-icon name="category" size="sm" left />
            All Categories
          </q-chip>
          <q-chip
            outline
            clickable
            color="blue-9"
            class="hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            <q-icon name="whatshot" size="sm" left />
            Popular
          </q-chip>
          <q-chip
            outline
            clickable
            color="blue-9"
            class="hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            <q-icon name="new_releases" size="sm" left />
            New
          </q-chip>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        <div
          v-for="(category, index) in [
            'Web Development',
            'Data Science',
            'Business',
            'Design',
          ]"
          :key="category"
          class="animate__animated animate__fadeInUp transform hover:-translate-y-2 transition-all duration-500"
          :style="`animation-delay: ${0.15 * (index + 1)}s`"
        >
          <q-card
            class="text-center cursor-pointer transition-all duration-500 border-0 rounded-3xl overflow-hidden group h-full flex flex-col shadow-xl hover:shadow-2xl"
            :class="{
              'bg-gradient-to-br from-white to-red-50': index === 0,
              'bg-gradient-to-br from-white to-green-50': index === 1,
              'bg-gradient-to-br from-white to-blue-50': index === 2,
              'bg-gradient-to-br from-white to-purple-50': index === 3,
            }"
            v-ripple
          >
            <q-card-section class="py-12 px-8 relative flex-grow flex flex-col">
              <!-- Decorative elements -->
              <div
                class="absolute -right-14 -top-14 w-28 h-28 bg-blue-100 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500"
              ></div>
              <div
                class="absolute -left-14 -bottom-14 w-20 h-20 bg-indigo-100 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500"
              ></div>

              <!-- Modern icon display -->
              <div
                class="bg-gradient-to-br from-white to-indigo-50 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-8 group-hover:from-blue-50 group-hover:to-indigo-100 transition-all duration-500 shadow-lg group-hover:shadow-xl relative z-10 group-hover:scale-110"
              >
                <q-icon
                  :name="getIconForCategory(category)"
                  size="3.2rem"
                  :class="{
                    'text-red-600 group-hover:text-red-700': index === 0,
                    'text-green-600 group-hover:text-green-700': index === 1,
                    'text-blue-600 group-hover:text-blue-700': index === 2,
                    'text-purple-600 group-hover:text-purple-700': index === 3,
                  }"
                  class="transition-all duration-500 transform group-hover:scale-110"
                />
              </div>

              <!-- Category title with modern typography -->
              <h3
                class="text-2xl font-bold mt-4 mb-3 group-hover:text-blue-700 transition-colors duration-300"
              >
                {{ category }}
              </h3>

              <!-- Rating with improved visualization -->
              <div class="flex items-center justify-center gap-2 mb-5">
                <q-rating
                  size="1.1em"
                  :model-value="5"
                  readonly
                  color="amber"
                />
                <span class="text-gray-600 text-sm font-medium"
                  >(120+ courses)</span
                >
              </div>

              <!-- Progress indicator with animation -->
              <q-linear-progress
                size="sm"
                :value="0.8"
                rounded
                :color="['red', 'green', 'blue', 'purple'][index]"
                class="q-mt-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                track-color="grey-2"
              />
              <span class="text-sm text-gray-600 mt-2 font-medium"
                >80% of students complete this path</span
              >

              <!-- Call to action button with modern design -->
              <div class="mt-auto pt-8">
                <q-btn
                  unelevated
                  rounded
                  class="px-8 py-2 transform transition-all duration-500 shadow-md hover:shadow-lg group-hover:scale-105"
                  :class="{
                    'bg-gradient-to-r from-red-500 to-red-600 text-white':
                      index === 0,
                    'bg-gradient-to-r from-green-500 to-green-600 text-white':
                      index === 1,
                    'bg-gradient-to-r from-blue-500 to-blue-600 text-white':
                      index === 2,
                    'bg-gradient-to-r from-purple-500 to-purple-600 text-white':
                      index === 3,
                  }"
                  label="Explore Path"
                  icon-right="arrow_forward"
                  no-caps
                >
                  <q-tooltip>Discover {{ category }} courses</q-tooltip>
                </q-btn>
              </div>

              <!-- Category badges with enhanced design -->
              <div class="absolute top-5 right-5 z-20">
                <q-badge
                  color="red-7"
                  v-if="index === 0"
                  class="text-sm px-3 py-1 shadow-sm"
                >
                  <q-icon name="star" size="sm" class="q-mr-xs" />Popular
                </q-badge>
                <q-badge
                  color="green-7"
                  v-if="index === 1"
                  class="text-sm px-3 py-1 shadow-sm"
                >
                  <q-icon name="new_releases" size="sm" class="q-mr-xs" />New
                </q-badge>
                <q-badge
                  color="blue-7"
                  v-if="index === 2"
                  class="text-sm px-3 py-1 shadow-sm"
                >
                  <q-icon
                    name="trending_up"
                    size="sm"
                    class="q-mr-xs"
                  />Trending
                </q-badge>
                <q-badge
                  color="purple-7"
                  v-if="index === 3"
                  class="text-sm px-3 py-1 shadow-sm"
                >
                  <q-icon name="verified" size="sm" class="q-mr-xs" />Top Rated
                </q-badge>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const getIconForCategory = (category) => {
  switch (category) {
    case "Web Development":
      return "code";
    case "Data Science":
      return "bar_chart";
    case "Business":
      return "business_center";
    case "Design":
      return "brush";
    default:
      return "help";
  }
};
</script>
