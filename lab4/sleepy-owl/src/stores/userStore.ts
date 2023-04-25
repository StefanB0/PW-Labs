import { ref, computed } from "vue"
import { defineStore } from "pinia"

export interface UserInterface {
	id: number
	name: string
	surname: string
}

export const userStore = defineStore("userStore", {
	state: () => ({
		users: [] as UserInterface[],
		currentUser: {} as UserInterface,
		accessToken: "731b74c9d17271652b50b2bb7ab1deb5dbaa91cf95cc7ee5b40a3f6de263c2e7"
	}),
	getters: {},
	actions: {
		addUser(user: UserInterface) {
			this.users.push(user)
		},
		deleteUser(id: number) {
			const userIndex = this.users.findIndex((u) => u.id === id)
			if (userIndex !== -1) {
				this.users.splice(userIndex, 1)
			}
		}
	}
})
