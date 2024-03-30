import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id_user: null,
    login: null,
    role: null,
  }),
  actions: {
    setUser(user) {
      this.id_user = user.id_user;
      this.login = user.login;
      this.role = user.role;
    },
    clearUser() {
      this.id_user = null;
      this.login = null;
      this.role = null;
    },
  },
});
