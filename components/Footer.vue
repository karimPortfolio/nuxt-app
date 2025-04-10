<template>
    <footer class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
            <!-- Logo and social section -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                <div class="transform hover:scale-105 transition-transform duration-300">
                    <h3 class="font-bold text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">LearnHub</h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">Your gateway to professional education and career advancement.</p>
                    <div class="flex space-x-4">
                        <q-btn round flat color="white" icon="fab fa-facebook" class="bg-gray-800/50 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20" />
                        <q-btn round flat color="white" icon="fab fa-twitter" class="bg-gray-800/50 hover:bg-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20" />
                        <q-btn round flat color="white" icon="fab fa-instagram" class="bg-gray-800/50 hover:bg-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20" />
                        <q-btn round flat color="white" icon="fab fa-linkedin" class="bg-gray-800/50 hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20" />
                    </div>
                </div>
                
                <!-- Quick links columns with improved hover effects -->
                <div>
                    <h4 class="font-bold text-lg mb-6 relative after:content-[''] after:absolute after:w-10 after:h-1 after:bg-blue-500 after:left-0 after:bottom-0 after:rounded-full">Courses</h4>
                    <ul class="space-y-3 text-gray-300">
                        <li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center"><q-icon name="arrow_right" size="xs" class="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> Web Development</a></li>
                        <li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center"><q-icon name="arrow_right" size="xs" class="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> Data Science</a></li>
                        <li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center"><q-icon name="arrow_right" size="xs" class="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> Business</a></li>
                        <li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center"><q-icon name="arrow_right" size="xs" class="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> Design</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-bold text-lg mb-6 relative after:content-[''] after:absolute after:w-10 after:h-1 after:bg-blue-500 after:left-0 after:bottom-0 after:rounded-full">About</h4>
                    <ul class="space-y-3 text-gray-300">
                        <li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center"><q-icon name="arrow_right" size="xs" class="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> About Us</a></li>
                        <li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center"><q-icon name="arrow_right" size="xs" class="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> Careers</a></li>
                        <li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center"><q-icon name="arrow_right" size="xs" class="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> Blog</a></li>
                        <li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center"><q-icon name="arrow_right" size="xs" class="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> Privacy Policy</a></li>
                    </ul>
                </div>
                
                <!-- Contact section with glass morphism -->
                <div class="bg-gray-800/40 p-6 rounded-xl backdrop-blur-md border border-gray-700/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
                    <h4 class="font-bold text-lg mb-6 relative after:content-[''] after:absolute after:w-10 after:h-1 after:bg-blue-500 after:left-0 after:bottom-0 after:rounded-full">Contact</h4>
                    <ul class="space-y-4 text-gray-300">
                        <li class="flex items-center transition-all hover:translate-x-1 duration-300 group"><q-icon name="email" class="mr-3 text-blue-400 group-hover:text-blue-300" /> info@learnhub.com</li>
                        <li class="flex items-center transition-all hover:translate-x-1 duration-300 group"><q-icon name="phone" class="mr-3 text-blue-400 group-hover:text-blue-300" /> +1 234 567 890</li>
                        <li class="flex items-center transition-all hover:translate-x-1 duration-300 group"><q-icon name="place" class="mr-3 text-blue-400 group-hover:text-blue-300" /> 123 Learn St, Education City</li>
                    </ul>
                    <q-btn unelevated rounded color="primary" class="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20" label="Contact Us" />
                </div>
            </div>
            
            <!-- Newsletter signup -->
            <div class="mb-12 p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/20">
                <div class="flex flex-col md:flex-row items-center justify-between">
                    <div class="mb-4 md:mb-0 md:mr-8">
                        <h4 class="font-bold text-xl text-white mb-2">Subscribe to our newsletter</h4>
                        <p class="text-gray-300">Get the latest news and updates delivered to your inbox</p>
                    </div>
                    <div class="w-full md:w-auto flex flex-nowrap">
                        <q-input dark outlined dense class="bg-gray-800/50 rounded-l-lg focus-within:ring-2 focus-within:ring-blue-500/50 mr-0 sm:mr-2 mb-2 sm:mb-0 w-80" placeholder="Your email address" />
                        <q-btn unelevated color="primary" class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-medium transition-all duration-300" label="Subscribe" />
                    </div>
                </div>
            </div>
            
            <!-- Copyright section with improved design -->
            <div class="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                <p class="hover:text-gray-300 transition-colors duration-300">© 2023 LearnHub. All rights reserved.</p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" class="hover:text-blue-400 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Terms</a>
                    <a href="#" class="hover:text-blue-400 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Privacy</a>
                    <a href="#" class="hover:text-blue-400 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup>
</script>