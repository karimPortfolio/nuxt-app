type Credentials = {
  email: string;
  password: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export const useAuthStore = defineStore('auth', () => {

  const $q = useQuasar();

  const user = ref<any>(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const validationErrors = ref<string[] | null>(null);
  const hasFetchedProfile = ref(false);

  async function login(credentials: Credentials) {
    try {
      const { data, status, error } = await useFetch("/api/auth/login", {
        method: "POST",
        body: credentials,
      });

      const route = useRoute();

      const redirectTo = route.query.redirect_to || window.location.origin;

      if (status.value === "success") {
        console.log(redirectTo);
        user.value = data.value?.user;
        isAuthenticated.value = true;
        window.location.href = redirectTo as string;
      }

      if (error.value) {
        if (error.value.statusCode === 422) {
          // Handle validation errors
          const validationErr: any = error.value.statusMessage;
          validationErrors.value = [validationErr];
          $q.notify({
            type: "negative",
            message: validationErr,
            icon: "warning",
            timeout: 3000,
          });
        }

        if (error.value.statusCode === 401) {
          // Handle unauthorized error
          $q.notify({
            type: "negative",
            message: error.value.statusMessage,
            icon: "warning",
            timeout: 3000,
          });
        }
      }
    } catch (err) {
      console.log(err);
      $q.notify({
        type: "negative",
        message: "An error occurred during login.",
        icon: "warning",
        timeout: 3000,
      });
    } finally {
      loading.value = false;
    }
  }

  async function fetchProfile() {

    if (hasFetchedProfile.value) return;

    try {
      const { data, status, error } = await useFetch("/api/auth/me", {
        method: "GET",
      });

      if (status.value === "success") {
        user.value = data.value?.user;
        isAuthenticated.value = true;
        return;
      }

      if (error.value) {
        $q.notify({
          type: "negative",
          message: error.value.statusMessage,
          icon: "warning",
          timeout: 3000,
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
        method: "POST",
      });

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
          timeout: 3000,
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
    fetchProfile,
  };
});