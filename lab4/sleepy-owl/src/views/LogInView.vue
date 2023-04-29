<script lang="ts">
import { quizStoreV2 } from '@/stores/quizStore';
import type { UserInterface } from '@/stores/userStore';
import { userStore } from '@/stores/userStore';
import { mapStores } from 'pinia';

enum error_message {
	NONE,
	EMPTY_FIELDS,
	USER_NOT_FOUND,
}

export default {
	data() {
		return {
			name: "",
			surname: "",
			displayError: error_message.NONE,
			error_message,
		};
	},
	computed: {
		...mapStores(userStore, quizStoreV2),
	},
	methods: {
		logIn() {
			if (this.name === "" || this.surname === "") {
				this.displayError = error_message.EMPTY_FIELDS;
				return;
			}
			let user_exists = this.userStoreStore.checkUser(this.name, this.surname);
			if (user_exists) {
				let user: UserInterface = this.userStoreStore.getUser(this.name, this.surname)!;
				this.userStoreStore.changeUser(user);
				this.userStoreStore.isAuth = true;
				this.$router.push(`/`);
			} else {
				this.displayError = error_message.USER_NOT_FOUND;
			}
		},
		resetQuizzes() {
			this.quizStoreV2Store.resetQuizzes();
			this.quizStoreV2Store.quizReviews = [];
		}
	}
}
</script>

<template>
	<div class="flex flex-col h-screen items-center justify-center">
		<div class="bg-secondary w-fit max-w-xl mb-24 pt-4 pb-6 px-8 rounded-xl">
			<div>
				<h2 class="text-center text-3xl font-bold text-gray-200">Log in</h2>
			</div>
			<form class="relative">
				<div class="mb-4 rounded-md shadow-sm">
					<div class="flex justify-between space-x-4 mt-4">
						<input id="name" type="text" v-model="name"
							class="border-2 border-slate-500 rounded-md py-1.5 pl-3 bg-secondary text-white placeholder:text-slate-400 outline-none focus-visible:border-indigo-600"
							placeholder="Name" />
						<input id="surname" type="text" v-model="surname"
							class="border-2 border-slate-500 rounded-md py-1.5 pl-3 bg-secondary text-white placeholder:text-slate-400 outline-none focus-visible:border-indigo-600"
							placeholder="Surname" />
					</div>
				</div>

				<div class="flex w-full justify-between items-center">
					<button type="submit"
						class="relative flex w-40 justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white hover:bg-indigo-500"
						@click.prevent="logIn">
						Log in
					</button>
					<button class="float-right text-slate-300 hover:text-white mt-2">
						<router-link to="/sign-up">Don't have an account? Sign up</router-link>
					</button>
				</div>
				<p class="text-red-500 absolute right-0" v-show="displayError === error_message.USER_NOT_FOUND">No such user
					exists</p>
				<p class="text-red-500 absolute right-0" v-show="displayError === error_message.EMPTY_FIELDS">Please fill in all
					fields</p>
			</form>
		</div>
	</div>
</template>
