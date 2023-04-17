import { ref, computed } from "vue"
import { defineStore } from "pinia"

export interface UserInterface {
	id: number
	name: string
	surname: string
}

// export const useCounterStore = defineStore("counter", () => {
// 	const count = ref(0)
// 	const doubleCount = computed(() => count.value * 2)
// 	function increment() {
// 		count.value++
// 	}

// 	return { count, doubleCount, increment }
// })

export const userStore = defineStore("userStore", {
	state: () => ({
		users: [] as UserInterface[],
	}),
	getters: {
		users: (state) => {
			state.users
		}
	},
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
