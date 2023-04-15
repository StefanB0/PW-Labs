import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import SignUpView from "../views/SignUpView.vue"
import LogInView from "../views/LogInView.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: HomeView,
		},
		{
			path: "/log-in",
			name: "LogIn",
			component: LogInView,
		},
		{
			path: "/sign-up",
			name: "SignUp",
			component: SignUpView,
		},
	],
})

export default router
