<template>
  <q-header
    class="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-3 border-b border-gray-300/50"
  >
    <q-toolbar class="container mx-auto">
      <q-toolbar-title class="no-wrap">
        <div class="flex items-center">
          <a href="/" class="font-bold no-underline group">
            <img src="/img/brand.png" class="w-[100px] h-[45px]" />
          </a>
        </div>
      </q-toolbar-title>
      <q-space />

      <div class="hidden md:flex items-center space-x-3 mr-5">
        <q-btn
          flat
          no-caps
          to="/"
          class="text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
        >
          Home
        </q-btn>

        <!-- Dropdown Menu -->
        <q-btn-dropdown
          flat
          no-caps
          class="text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
        >
          <template v-slot:label>
            <div class="flex items-center">
              <span>Courses</span>
            </div>
          </template>

          <q-list
            class="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-80 divide-y divide-gray-100/50"
          >
            <!-- <div class="px-4 py-3 text-sm font-bold text-blue-700 uppercase tracking-wider flex items-center">
                    <q-icon name="school" class="mr-2 text-yellow-500" size="sm" />
                    <span class="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Our Courses</span>
                  </div> -->

            <q-item
              clickable
              v-ripple
              to="/services/web"
              class="hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
            >
              <q-item-section avatar>
                <q-avatar
                  size="md"
                  class="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                >
                  <q-icon name="web" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  class="font-medium text-gray-800 group-hover:text-blue-700"
                  >Web Development</q-item-label
                >
                <q-item-label caption class="text-blue-600"
                  >Custom websites & apps</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-icon
                  name="arrow_forward_ios"
                  size="xs"
                  class="text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                />
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              to="/services/mobile"
              class="hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
            >
              <q-item-section avatar>
                <q-avatar
                  size="md"
                  class="bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                >
                  <q-icon name="phone_android" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  class="font-medium text-gray-800 group-hover:text-green-700"
                  >Mobile Development</q-item-label
                >
                <q-item-label caption class="text-green-600"
                  >iOS & Android apps</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-icon
                  name="arrow_forward_ios"
                  size="xs"
                  class="text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                />
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              to="/services/cloud"
              class="hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
            >
              <q-item-section avatar>
                <q-avatar
                  size="md"
                  class="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                >
                  <q-icon name="cloud" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  class="font-medium text-gray-800 group-hover:text-purple-700"
                  >Cloud Services</q-item-label
                >
                <q-item-label caption class="text-purple-600"
                  >Scalable cloud solutions</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-icon
                  name="arrow_forward_ios"
                  size="xs"
                  class="text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          flat
          no-caps
          to="/about"
          class="text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
        >
          About
        </q-btn>
        <q-btn
          flat
          no-caps
          to="/carriers"
          class="text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
        >
          Carriers
        </q-btn>
      </div>

      <!-- Search Bar -->
      <div
        class="hidden md:flex items-center mr-4 bg-white/15 backdrop-blur-sm rounded-full px-3 transition-all duration-300 hover:bg-white/25 w-64 border border-white/10"
      >
        <q-icon name="search" class="text-white/70 q-mr-sm" />
        <q-input
          dense
          borderless
          placeholder="Search..."
          class="text-white"
          dark
        >
          <template v-slot:append>
            <q-icon
              name="close"
              class="cursor-pointer text-white/70 hover:text-white"
            />
          </template>
        </q-input>
      </div>

      <!-- Auth Button -->
      <div>
        <!-- <q-btn
          v-if="!isAuthenticated"
          unelevated
          no-caps
          to="auth/signin"
          class="ml-4 hidden md:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium hover:from-yellow-300 hover:to-yellow-400 rounded-full px-5 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          <q-icon name="login" class="q-mr-sm" />
          Sign In
        </q-btn> -->
        <!-- ============= USER PROFILE DROPDOWN ============== -->
        <!-- User Profile Dropdown -->
        <div class="relative">
          <q-btn flat round no-caps class="bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all duration-300">
            <q-avatar size="32px" class="shadow-sm">
              <img :src="user?.photoURL || 'https://ui-avatars.com/api/?name=' + (user?.displayName || 'User')" />
            </q-avatar>
            
            <q-menu class="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-72" transition-show="jump-down" transition-hide="jump-up">
              <!-- User Info Header -->
              <div class="px-4 py-3 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                  <q-avatar size="48px" class=" shadow-md">
                    <img :src="user?.photoURL || 'https://ui-avatars.com/api/?name=' + (user?.displayName || 'User')" />
                  </q-avatar>
                  <div class="flex flex-col">
                    <span class="font-medium text-gray-800">{{ user?.displayName || 'User' }}</span>
                    <span class="text-sm text-blue-600 truncate max-w-[180px]">{{ user?.email }}</span>
                  </div>
                </div>
                <div class="mt-2 bg-blue-50 rounded-lg px-3 py-1.5 text-sm text-blue-700 flex items-center">
                  <q-icon name="verified" size="xs" color="blue-7" class="mr-1" />
                  <span>Verified Account</span>
                </div>
              </div>
              
              <!-- Menu Items -->
              <q-list padding>
                <q-item clickable v-ripple to="/profile" class="hover:bg-blue-50/80 rounded-lg mx-1 my-0.5 transition-all duration-300 hover:translate-x-1 group">
                  <q-item-section avatar>
                    <q-icon name="person" class="text-blue-600 bg-blue-100 p-1 rounded-full group-hover:bg-blue-200 transition-colors" />
                  </q-item-section>
                  <q-item-section>My Profile</q-item-section>
                  <q-item-section side>
                    <q-icon name="chevron_right" size="xs" class="text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  </q-item-section>
                </q-item>
                
                <q-item clickable v-ripple to="/dashboard" class="hover:bg-indigo-50/80 rounded-lg mx-1 my-0.5 transition-all duration-300 hover:translate-x-1 group">
                  <q-item-section avatar>
                    <q-icon name="dashboard" class="text-indigo-600 bg-indigo-100 p-1 rounded-full group-hover:bg-indigo-200 transition-colors" />
                  </q-item-section>
                  <q-item-section>Dashboard</q-item-section>
                  <q-item-section side>
                    <q-icon name="chevron_right" size="xs" class="text-gray-400 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-transform" />
                  </q-item-section>
                </q-item>
                
                <q-item clickable v-ripple to="/settings" class="hover:bg-purple-50/80 rounded-lg mx-1 my-0.5 transition-all duration-300 hover:translate-x-1 group">
                  <q-item-section avatar>
                    <q-icon name="settings" class="text-purple-600 bg-purple-100 p-1 rounded-full group-hover:bg-purple-200 transition-colors" />
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                  <q-item-section side>
                    <q-icon name="chevron_right" size="xs" class="text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform" />
                  </q-item-section>
                </q-item>
                
                <q-separator class="my-1" />
                
                <q-item clickable v-ripple @click="useAuthStore().signOut" class="hover:bg-red-50/80 rounded-lg mx-1 my-0.5 transition-all duration-300 hover:translate-x-1 group">
                  <q-item-section avatar>
                    <q-icon name="logout" class="text-red-600 bg-red-100 p-1 rounded-full group-hover:bg-red-200 transition-colors" />
                  </q-item-section>
                  <q-item-section>Sign Out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <!-- Sign In Button (when not authenticated) -->
        <!-- <q-btn
          v-else
          unelevated
          no-caps
          to="/auth/signin"
          class="ml-4 hidden md:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium hover:from-yellow-300 hover:to-yellow-400 rounded-full px-5 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          <q-icon name="login" class="q-mr-sm" />
          Sign In
        </q-btn> -->
        <!-- ============= USER PROFILE DROPDOWN ============== -->
      </div>

      <!-- mobile -->
      <q-btn
        flat
        dense
        round
        icon="menu"
        class="md:hidden text-white bg-blue-600/30 hover:bg-blue-500/50 transition-colors duration-300"
      >
        <q-menu>
          <q-list
            style="min-width: 220px"
            class="bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
          >
            <q-item
              clickable
              v-ripple
              to="/"
              class="hover:bg-blue-50 mx-2 rounded-md"
            >
              <q-item-section avatar
                ><q-icon name="home" color="blue-7"
              /></q-item-section>
              <q-item-section>Home</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/about"
              class="hover:bg-blue-50 mx-2 rounded-md"
            >
              <q-item-section avatar
                ><q-icon name="info" color="blue-7"
              /></q-item-section>
              <q-item-section>About</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/carriers"
              class="hover:bg-blue-50 mx-2 rounded-md"
            >
              <q-item-section avatar
                ><q-icon name="local_shipping" color="blue-7"
              /></q-item-section>
              <q-item-section>Carriers</q-item-section>
            </q-item>
            <q-separator class="my-1" />
            <q-item
              clickable
              v-ripple
              class="hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
            >
              <q-item-section avatar
                ><q-icon name="login" color="blue-7"
              /></q-item-section>
              <q-item-section>Sign In</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
<script setup>
import { useAuthStore } from '~/store/auth';


const { user, isAuthenticated } = useAuthStore();

watch( () => isAuthenticated, (auth) => {
  console.log('User changed:', auth.value);
}, { immediate: true });
</script>
