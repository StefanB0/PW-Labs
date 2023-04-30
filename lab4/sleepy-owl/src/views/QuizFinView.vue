<script lang="ts">
import type { Review } from '@/stores/quizStore';
import { mapStores } from 'pinia';
import { quizStoreV2 } from '../stores/quizStore';


export default {
	created() {
		this.loadQuiz();
		console.log(this.pass)
	},
	data() {
		return {
			quizReview: {} as Review,
			quizId: Number(this.$route.params.quizId),
		};
	},
	computed: {
		...mapStores(quizStoreV2),
		pass() {
			return this.quizReview.score / this.quizReview.question_count >= 0.5;
		},
	},
	methods: {
		loadQuiz() {
			this.quizReview = this.quizStoreV2Store.quizReviews.find((quiz) => quiz.id === this.quizId) as Review;
		},
	}
}
</script>

<template>
	<div v-if="quizReview.question_array.length !== 0">
		<div class="min-h-screen py-20">
			<div class="mx-auto max-w-4xl">
				<h1 class="mx-auto w-fit px-4 py-1 mb-4 text-3xl border-b-2">Quiz: {{ quizReview.title }} </h1>
				<div class="bg-secondary rounded-md">
					<div v-for="(question, index) in quizReview.question_array" class="w-full p-4 space-y-4">
						<div class="bg-primary border-2 w-full px-5 py-2 rounded-lg">
							<p> Question {{ index + 1 }}</p>
							<p>{{ question.question }}</p>
							<div v-for="(answer, index) in question.answers" class="m-2">
								<div class="flex items-center" :class="{}">
									<div v-if="answer === question.selected_answer">
										<input class="hover:cursor-pointer mr-1 h-4 w-4" disabled checked type="radio" />
									</div>
									<div v-else>
										<input class="hover:cursor-pointer mr-1 h-4 w-4" disabled type="radio" />
									</div>
									<div v-if="answer === question.correct_answer" class="hover:cursor-pointer pl-1 w-full bg-green-500/60">
										<label class="hover:cursor-pointer">{{ answer }}</label>
									</div>
									<div v-else-if="answer === question.selected_answer && answer !== question.correct_answer"
										class="hover:cursor-pointer pl-1 w-full bg-red-500/60">
										<label class="hover:cursor-pointer">{{ answer }}</label>
									</div>
									<div v-else class="pl-1 w-full">
										<label class="hover:cursor-pointer">{{ answer }}</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="my-1 flex justify-between items-center">
					<div class="text-xl pl-5">
						<span :class="{ 'text-red-500': !pass, 'text-green-500': pass }">{{ quizReview.score }}</span>
						<span> / {{ quizReview.question_count }}</span>
					</div>
					<RouterLink to="/">
						<button class="float-right ml-auto rounded-md my-2 font-bold bg-green-600 text-white hover:bg-green-500">
							<span class="leading-10 px-2 tracking-wide">Finish Review</span>
						</button>
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>
