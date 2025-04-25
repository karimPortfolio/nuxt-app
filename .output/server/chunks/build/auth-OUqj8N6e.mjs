import { ref } from 'vue';
import { a as useQuasar, n as navigateTo, i as useRoute } from './server.mjs';
import { u as useFetch } from './fetch-D6WZ-eiX.mjs';
import { defineStore } from 'pinia';

const useAuthStore = defineStore("auth", () => {
  const $q = useQuasar();
  const user = ref(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const validationErrors = ref(null);
  const hasFetchedProfile = ref(false);
  async function login(credentials) {
    var _a;
    try {
      const { data, status, error } = await useFetch("/api/auth/login", {
        method: "POST",
        body: credentials
      }, "$X79xU4UTsj");
      const route = useRoute();
      const redirectTo = route.query.redirect_to || (void 0).location.origin;
      if (status.value === "success") {
        console.log(redirectTo);
        user.value = (_a = data.value) == null ? void 0 : _a.user;
        isAuthenticated.value = true;
        (void 0).location.href = redirectTo;
      }
      if (error.value) {
        if (error.value.statusCode === 422) {
          const validationErr = error.value.statusMessage;
          validationErrors.value = [validationErr];
          $q.notify({
            type: "negative",
            message: validationErr,
            icon: "warning",
            timeout: 3e3
          });
        }
        if (error.value.statusCode === 401) {
          $q.notify({
            type: "negative",
            message: error.value.statusMessage,
            icon: "warning",
            timeout: 3e3
          });
        }
      }
    } catch (err) {
      console.log(err);
      $q.notify({
        type: "negative",
        message: "An error occurred during login.",
        icon: "warning",
        timeout: 3e3
      });
    } finally {
      loading.value = false;
    }
  }
  async function fetchProfile() {
    var _a;
    if (hasFetchedProfile.value) return;
    try {
      const { data, status, error } = await useFetch("/api/auth/me", {
        method: "GET"
      }, "$ut4CvpQmLF");
      if (status.value === "success") {
        user.value = (_a = data.value) == null ? void 0 : _a.user;
        isAuthenticated.value = true;
        return;
      }
      if (error.value) {
        $q.notify({
          type: "negative",
          message: error.value.statusMessage,
          icon: "warning",
          timeout: 3e3
        });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      loading.value = false;
      hasFetchedProfile.value = true;
    }
  }
  async function logout() {
    try {
      const { status, error } = await useFetch("/api/auth/logout", {
        method: "POST"
      }, "$OtQf28CjnM");
      if (status.value === "success") {
        user.value = null;
        isAuthenticated.value = false;
        navigateTo("/auth/sigin");
      }
      if (error.value) {
        $q.notify({
          type: "negative",
          message: error.value.statusMessage,
          icon: "warning",
          timeout: 3e3
        });
      }
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      loading.value = false;
    }
  }
  return {
    user,
    isAuthenticated,
    loading,
    validationErrors,
    login,
    logout,
    fetchProfile
  };
});

export { useAuthStore as u };
//# sourceMappingURL=auth-OUqj8N6e.mjs.map
