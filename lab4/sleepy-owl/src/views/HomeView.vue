<script lang="ts">
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { quizStore } from '@/stores/quizStore';

import type { UserInterface } from '@/stores/userStore';
import type { QuizInterface } from '@/stores/quizStore';
import type { QuizCardInterface } from '@/stores/quizStore';

import Card from '@/components/quiz/quiz-card.vue';
import IconLogOut from '@/components/icons/IconLogOut.vue';
import IconDeleteForever from '@/components/icons/IconDeleteForever.vue';

export default {
	components: {
		Card,
		IconLogOut,
		IconDeleteForever,
	},
	created() {
		this.getUser();
		this.getQuizzes();
	},
	data() {
		return {
			// quizCards: [] as QuizCardInterface[],
			// quizzes: [] as any,
			user: {} as UserInterface,
		};
	},
	computed: {
		...mapState(quizStore, ['quizzes', 'quizCards'])
	},
	methods: {
		async getUser() {
			let res = await fetch('/mockUser.json');
			let data = await res.json();

			this.user = data as UserInterface;
		},

		async getQuizzes() {
			// Get quizzes from API
			let res = await fetch('/mockQuiz.json');
			let data = await res.json() as QuizInterface[];
			// Map quizzes to quiz cards

			// this.quizzes = data;
			// this.quizCards = this.quizzes.map((quiz: { id: number; title: string; questions: string[]; }) => {
			// 	return {
			// 		id: quiz.id,
			// 		title: quiz.title,
			// 		questionCount: quiz.questions.length,
			// 	}
			// }) as QuizCardInterface[];
			console.log(data);
			data.forEach((quiz) => {
				console.log(quiz);
				this.addQuiz({
					id: quiz.id,
					title: quiz.title,
					questions: quiz.questions,
					finished: false,
				});
			});
		},
		...mapActions(quizStore, ['addQuiz']),
	}
};
</script>

<template>
	<main>
		<button id="btn-delete-account">
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
				<router-link to="/log-in">
					<IconLogOut class="mt-1 ml-2 relative" />
				</router-link>
			</div>
			<div class="mt-8 mb-20 flex flex-col w-full items-center">
				<div v-for="item in quizCards" class="py-3 bg-secondary w-full max-w-3xl rounded-md">
					<Card :quiz-card="item" />
				</div>
			</div>
		</div>
	</main>
</template>

<!-- TODO Add delete SVG button in the top right corner to delete account -->
<!-- TODO Hook to API -->
<!-- TODO Add Score to finished quizzes. If more than 50% of questions are answered correctly the score is green, if less the text is red -->
<!-- TODO Disable hover and links for finished quizzes -->
<!-- TODO Generate a list of 10 quizzes with questions and answers then populate the API -->
<!-- TODO Make dynamic route to /user -->
<!-- TODO Make dynamic routes for each quiz /user/quiz-name -->
<!-- TODO Add button to reset all quizzes -->
<!-- TODO Mute color of inactive quizzes -->
