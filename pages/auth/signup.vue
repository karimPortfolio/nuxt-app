<template>
    <div class="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 md:p-0">
        <!-- Left Section with Enhanced Illustration -->
        <div class="hidden md:flex flex-col items-center justify-center p-8 animate-fade-in">
            <div class="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative">
                <!-- Image with improved quality -->
                <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=100" 
                    alt="Learning community" 
                    class="w-full h-full object-cover blur-[1px] transform scale-105 transition-all duration-1000"
                />
                <!-- Enhanced overlay with modern gradient -->
                <div class="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-indigo-600/40 flex flex-col items-center justify-center p-10 text-white backdrop-blur-sm">
                    <div class="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 class="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
                            Join our learning community
                        </h2>
                        <p class="text-center text-xl max-w-lg leading-relaxed">
                            Create an account today and unlock a world of personalized educational content designed just for you.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Section with Enhanced Form -->
        <div class="flex items-center justify-center mx-auto py-8 px-4 md:px-0">
            <div class="p-10 space-y-8 bg-white/95 rounded-3xl transition-all duration-500 animate-fade-in">
                <div class="text-center">
                    <div class="flex justify-center mb-6">
                        <div class="h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl rotate-12 flex items-center justify-center shadow-xl">
                            <div class="h-16 w-16 bg-white/90 backdrop-blur-sm rounded-xl -rotate-12 flex items-center justify-center">
                                <q-icon name="person_add" size="lg" class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700" />
                            </div>
                        </div>
                    </div>
                    <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-tight">
                        Create Account
                    </h1>
                    <p class="mt-3 text-gray-600 text-lg">
                        Join our platform and unlock your learning potential
                    </p>
                </div>

                <q-form @submit.prevent="onSignup" class="mt-10 space-y-6">
                    <div class="grid grid-cols-2 gap-6 m-0">
                        <q-input
                            v-model="firstName"
                            label="First Name"
                            :rules="[(val) => !!val || 'First name is required']"
                            class="col-span-1"
                            lazy-rules
                            outlined
                            dense
                            standout="bg-blue-50 text-indigo-700"
                        />

                        <q-input
                            v-model="lastName"
                            label="Last Name"
                            :rules="[(val) => !!val || 'Last name is required']"
                            class="col-span-1"
                            lazy-rules
                            outlined
                            dense
                            standout="bg-blue-50 text-indigo-700"
                        />
                    </div>

                    <q-input
                        v-model="email"
                        label="Email Address"
                        type="email"
                        outlined
                        dense
                        lazy-rules
                        standout="bg-blue-50 text-indigo-700"
                        class="my-2"
                        :rules="[
                            (val) => !!val || 'Email is required',
                            (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Please enter a valid email',
                        ]"
                    >
                        <template v-slot:append v-if="email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)">
                            <q-icon name="check_circle" color="green-600" />
                        </template>
                    </q-input>

                    <q-input
                        v-model="password"
                        label="Password"
                        :type="isPwdVisible ? 'text' : 'password'"
                        outlined
                        dense
                        lazy-rules
                        standout="bg-blue-50 text-indigo-700"
                        class="my-2"
                        :rules="[
                            (val) => !!val || 'Password is required',
                            (val) => val.length >= 8 || 'Password must be at least 8 characters',
                        ]"
                    >
                        <template v-slot:append>
                            <div class="flex items-center">
                                <q-icon
                                    v-if="password && password.length >= 8"
                                    name="check_circle"
                                    color="green-600"
                                    class="mr-2"
                                />
                                <q-icon
                                    :name="isPwdVisible ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    color="indigo-600"
                                    @click="isPwdVisible = !isPwdVisible"
                                />
                            </div>
                        </template>
                    </q-input>
                    <q-input
                        v-model="password"
                        label="Password Confirmation"
                        :type="isPwdVisible ? 'text' : 'password'"
                        outlined
                        dense
                        lazy-rules
                        standout="bg-blue-50 text-indigo-700"
                        class="my-2"
                        :rules="[
                            (val) => !!val || 'Password is required',
                            (val) => val.length >= 8 || 'Password must be at least 8 characters',
                        ]"
                    >
                        <template v-slot:append>
                            <div class="flex items-center">
                                <q-icon
                                    v-if="password && password.length >= 8"
                                    name="check_circle"
                                    color="green-600"
                                    class="mr-2"
                                />
                                <q-icon
                                    :name="isPwdVisible ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    color="indigo-600"
                                    @click="isPwdVisible = !isPwdVisible"
                                />
                            </div>
                        </template>
                    </q-input>

                    <div class="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <q-checkbox v-model="agreeTerms" color="indigo">
                            <span class="text-sm text-gray-700">
                                I agree to the
                                <a class="font-medium text-indigo-600 hover:text-indigo-800 transition-colors" href="#">Terms</a>
                                and
                                <a class="font-medium text-indigo-600 hover:text-indigo-800 transition-colors" href="#">Privacy Policy</a>
                            </span>
                        </q-checkbox>
                    </div>

                    <q-btn
                        type="submit"
                        unelevated
                        color="primary"
                        class="w-full py-4 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform hover:scale-[1.02]"
                        :loading="loading"
                        :disable="!isFormValid"
                    >
                        <span class="text-lg font-bold tracking-wide">Sign Up</span>
                        <template v-slot:loading>
                            <q-spinner-dots color="white" />
                        </template>
                    </q-btn>

                    <div class="relative py-4">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-200"></div>
                        </div>
                        <div class="relative flex justify-center">
                            <span class="px-4 text-sm font-medium text-gray-500 bg-white">Or continue with</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <q-btn
                            class="py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow"
                            flat
                        >
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" class="w-5 h-5 mr-2" />
                            <span class="font-medium text-gray-700">Google</span>
                        </q-btn>

                        <q-btn
                            class="py-3 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                            flat
                        >
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" class="w-5 h-5 mr-2 invert" />
                            <span class="font-medium">GitHub</span>
                        </q-btn>
                    </div>

                    <div class="text-center pt-3">
                        <p class="text-sm text-gray-600">
                            Already have an account?
                            <NuxtLink
                                to="/auth/signin"
                                class="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center"
                            >
                                Sign in 
                                <q-icon name="arrow_forward" size="xs" class="ml-1 animate-pulse" />
                            </NuxtLink>
                        </p>
                    </div>
                </q-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
    layout: false,
})

const router = useRouter();

// Form data
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const agreeTerms = ref(false);
const isPwdVisible = ref(false);
const loading = ref(false);

// Form validation
const isFormValid = computed(() => {
  return (
    firstName.value &&
    lastName.value &&
    email.value &&
    password.value &&
    password.value.length >= 8 &&
    agreeTerms.value
  );
});

// Form submission
const onSignup = async () => {
  if (!isFormValid.value) return;

  loading.value = true;
  try {
    // Here you would implement your signup logic
    // For example:
    // await registerUser({
    //   firstName: firstName.value,
    //   lastName: lastName.value,
    //   email: email.value,
    //   password: password.value
    // })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to dashboard after successful signup
    router.push("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    // Handle error (you could use Quasar's notification system here)
  } finally {
    loading.value = false;
  }
};

// Social login methods
const loginWithGoogle = () => {
  // Implement Google login logic
};

const loginWithFacebook = () => {
  // Implement Facebook login logic
};
</script>

<style scoped>
/* Additional custom styles can go here */
/* .text-primary {
    @apply text-blue-600;
}
.text-primary-dark {
    @apply text-blue-800;
} */
</style>
