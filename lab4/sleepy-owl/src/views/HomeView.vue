<script lang="ts">
import type { QuizInterfaceV2, QuizPreview } from '@/stores/quizStore';
import { mapStores } from 'pinia';

import { userStore, type UserInterface } from '@/stores/userStore';

import { deleteUser, getQuiz, getQuizzes } from '@/assets/scripts/server-api';
import IconDeleteForever from '@/components/icons/IconDeleteForever.vue';
import IconLogOut from '@/components/icons/IconLogOut.vue';
import Card from '@/components/quiz/quiz-card.vue';
import type { QuizFull } from '@/stores/quizStore';
import { quizStoreV2 } from '../stores/quizStore';

export default {
	components: {
		Card,
		IconLogOut,
		IconDeleteForever,
	},
	created() {
		this.getUser();
		this.fetchQuizzes();
	},
	data() {
		return {
			user: {} as UserInterface,
		};
	},
	computed: {
		...mapStores(quizStoreV2, userStore),
		quizArray(): QuizInterfaceV2[] {
			return this.quizStoreV2Store.quizzes;
		},
	},
	methods: {
		getUser() {
			this.user = this.userStoreStore.currentUser;
		},
		async fetchQuizzes() {
			let quizPreviews = await getQuizzes();

			let quizArray = quizPreviews.map(async (quiz: QuizPreview) => {
				let quizFull: QuizFull = await getQuiz(quiz.id);
				return {
					id: quizFull.id,
					title: quizFull.title,
					question_count: quizFull.questions.length,
					question_array: quizFull.questions,
					finished: false,
					score: 0,
				} as QuizInterfaceV2;
			});

			quizArray.forEach(async (quiz) => {
				this.quizStoreV2Store.addQuiz(await quiz);
			});

			this.quizStoreV2Store.quizzes.forEach((quiz) => {
				if (quizPreviews.find((quizPreview) => quizPreview.id === quiz.id)) return;
				this.quizStoreV2Store.removeQuiz(quiz.id);
				this.quizStoreV2Store.removeQuizReview(quiz.id);
			});
		},
		logOut() {
			this.userStoreStore.changeUser({ name: "", surname: "", id: 0 } as UserInterface);
			this.userStoreStore.isAuth = false;
			this.resetQuizzes();
			this.$router.push('/log-in');
		},
		deleteAccount() {
			let confirm = window.confirm('Are you sure you want to delete your account?');
			if (!confirm) return;
			
			this.userStoreStore.deleteUser(this.user.id);
			deleteUser(this.user.id);
			this.userStoreStore.isAuth = false;
			this.resetQuizzes();
			this.$router.push('/log-in');
		},
		resetQuizzes() {
			this.quizStoreV2Store.resetQuizzes();
			this.quizStoreV2Store.quizReviews = [];
		}
	},
}
</script>

<template>
	<main>
		<button id="btn-delete-account" @click.prevent="deleteAccount">
			<IconDeleteForever class="absolute right-5 top-5" />
		</button>
		<div class="flex flex-col items-center">
			<div class="self-center flex items-center w-[50rem] mt-16">
				<img src="@/assets/img/mascot-round-3.png" alt="owl mascot image" class="h-[400px] m-4" />
				<div class="mx-4 ml-20 pt-8">
					<h1 class="text-4xl text-center">Sleepy Owl</h1>
					<h1 class="text-4xl text-center">Quizzes</h1>
				</div>
			</div>
			<div class="mt-10 flex items-center py-2 h-16">
				<h1 class="text-3xl font-bold"> User: {{ user.name }} {{ user.surname }} </h1>
				<div @click="logOut">
					<IconLogOut class="mt-1 ml-2 relative" />
				</div>				
			</div>
			<div class="mt-8 mb-20 flex flex-col w-full max-w-3xl items-center rounded-md bg-secondary">
				<div v-for="(quiz, index) in quizArray" class="py-3 w-full">
					<Card :quiz="quiz" :index="index" />
				</div>
			</div>
		</div>
	</main>
</template>

<!-- TODO Generate a list of 10 quizzes with questions and answers then populate the API -->
