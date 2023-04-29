import { ref, computed } from "vue"
import { defineStore } from "pinia"

export interface UserInterface {
	id: number
	name: string
	surname: string
}

let localUser: UserInterface
if (localStorage.getItem("currentUser")) {
	localUser = JSON.parse(localStorage.getItem("currentUser")!)
} else {
	localUser = { id: 0, name: "Gabe", surname: "Newel" } as UserInterface
}
let userIsAuth: boolean = false
if (localStorage.getItem("isAuth")) {
	userIsAuth = JSON.parse(localStorage.getItem("isAuth")!)
}

export const userStore = defineStore("userStore", {
	state: () => ({
		users: [] as UserInterface[],
		currentUser: localUser,
		isAuth: userIsAuth,
		accessToken:
			"731b74c9d17271652b50b2bb7ab1deb5dbaa91cf95cc7ee5b40a3f6de263c2e7",
	}),
	getters: {},
	actions: {
		changeUser(user: UserInterface) {
			this.currentUser = user
		},
		getUser(name: string, surname: string) {
			return this.users.find(
				(u) => u.name === name && u.surname === surname
			)
		},
		checkUser(name: string, surname: string) {
			return (
				this.users.filter((u) => u.name === name && u.surname === surname)
					.length > 0
			)
		},
		addUser(user: UserInterface) {
			this.users.push(user)
		},
		deleteUser(id: number) {
			const userIndex = this.users.findIndex((u) => u.id === id)
			if (userIndex !== -1) {
				this.users.splice(userIndex, 1)
			}
		},
	},
})
