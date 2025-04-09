<template>
<section class="py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <!-- Background decoration elements with animation -->
    <div class="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
    <div class="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    
    <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-center mb-20">
            <div class="mb-10 md:mb-0 text-center md:text-left max-w-2xl">
                <span class="text-sm font-bold text-primary bg-blue-50 px-4 py-2 rounded-full mb-4 inline-block shadow-sm transform hover:scale-105 transition-transform duration-300">
                    <span class="pulse-dot mr-1.5"></span>Top Picks
                </span>
                <h2 class="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4" role="heading" aria-level="2">Featured Courses</h2>
                <p class="text-gray-600 text-lg max-w-xl leading-relaxed">Handpicked by our experts to accelerate your career journey and help you reach your full potential.</p>
            </div>
            <div class="flex items-center">
                <a href="#" class="group flex items-center font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 gap-2 px-4 py-2 rounded-full hover:bg-blue-50">
                    View all courses
                    <q-icon name="arrow_forward" size="xs" class="text-blue-600 group-hover:text-blue-800 transform group-hover:translate-x-1 transition-all duration-300" />
                </a>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <q-card v-for="course in courses" :key="course.id" flat class="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 bg-white group">
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                         class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" 
                         alt="Course thumbnail image" 
                         loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                        <q-btn flat round color="white" icon="play_circle" size="lg" class="opacity-90 hover:opacity-100 transform hover:scale-110 transition-all" aria-label="Preview course" />
                    </div>
                    <q-badge color="primary" class="absolute top-4 left-4 px-4 py-2 text-xs font-bold rounded-full shadow-sm">Bestseller</q-badge>
                    <div class="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-xs font-medium flex items-center shadow-sm">
                        <q-icon name="schedule" size="xs" class="mr-1.5" />
                        12 hours
                    </div>
                </div>
                <q-card-section class="p-8">
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center">
                            <q-avatar size="2.5rem" class="ring-2 ring-primary/20 shadow-sm">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Instructor avatar" />
                            </q-avatar>
                            <span class="ml-3 text-sm font-semibold text-gray-700 hover:text-primary transition-colors">{{ course.author.name }}</span>
                        </div>
                        <div class="bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm shadow-sm transform hover:scale-105 transition-transform">${{ course.price }}</div>
                    </div>
                    <h3 class="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">{{ course.title }}</h3>
                    <p class="text-gray-600 mb-6 text-sm line-clamp-2 leading-relaxed">{{ course.description }}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">HTML/CSS</span>
                        <span class="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">JavaScript</span>
                        <span class="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">React</span>
                    </div>
                    
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center">
                            <q-rating v-model="rating" max="5" size="sm" color="amber" readonly icon="star" icon-selected="star" />
                            <span class="ml-2 text-sm text-gray-600">4.5 (2.3k)</span>
                        </div>
                        <q-btn round flat color="primary" icon="bookmark" class="bg-blue-50 hover:bg-blue-100 transition-colors" aria-label="Bookmark this course">
                            <q-tooltip>Bookmark this course</q-tooltip>
                        </q-btn>
                    </div>
                    
                    <q-btn unelevated rounded class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-base">
                        <span class="relative z-10">Enroll Now</span>
                        <q-ripple />
                    </q-btn>
                </q-card-section>
            </q-card>
        </div>
    </div>
</section>
</template>

<script setup>
const rating = ref(4.5);
const currentPage = ref(1);


const { data:courses } = await useFetch('/api/v1/courses');

</script>
<script setup
></script>