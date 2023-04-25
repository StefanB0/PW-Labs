<script lang="ts">
import { quizStore, type AnswerInterface, type QuestionInterface } from '@/stores/quizStore';
import { mapActions, mapState } from 'pinia';
import type { QuestionReviewInterface } from '../stores/quizStore';


export default {
	created() {
		this.loadQuiz();
	},
	data() {
		return {
			quizId: Number(this.$route.params.quizId),
			quizName: "",
			questionArray: [] as QuestionReviewInterface[],
		};
	},
	computed: {
		getQuiz() {
			return this.answeredQuizzes.find((quiz) => quiz.id === this.quizId);
		},
		...mapState(quizStore, ["answeredQuizzes"]),
	},
	methods: {
		loadQuiz() {
			// this.quizName = this.getQuiz?.title || "";
			this.quizName = this.getQuiz?.title || "";
			this.questionArray = this.getQuiz?.questions || [];
		},
		createName(questionNumber: number) {
			return `q${questionNumber}`;
		},
	}
}
</script>

<template>
	<div v-if="questionArray.length !== 0">
		<div class="min-h-screen py-20">
			<div class="mx-auto max-w-4xl">
				<h1 class="mx-auto w-fit px-4 py-1 mb-4 text-3xl border-b-2">Quiz: {{ quizName }} </h1>
				<div class="bg-secondary rounded-md">
					<div v-for="(question, index) in questionArray" class="w-full p-4 space-y-4">
						<div class="bg-primary border-2 w-full px-5 py-2 rounded-lg">
							<p> Question {{ index + 1 }}</p>
							<p>{{ question.question }}</p>
							<div v-for="(answer, index) in question.answers" class="m-2">
								<div class="flex items-center" :class="{}">
									<div v-if="answer === question.selectedAnswer">
										<input class="hover:cursor-pointer mr-1 h-4 w-4" disabled checked type="radio" />
									</div>
									<div v-else>
										<input class="hover:cursor-pointer mr-1 h-4 w-4" disabled type="radio" />
									</div>
									<div v-if="answer === question.correctAnswer" class="hover:cursor-pointer pl-1 w-full bg-green-500/60">
										<label class="hover:cursor-pointer">{{ answer }}</label>
									</div>
									<div v-else-if="answer === question.selectedAnswer && answer !== question.correctAnswer"
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
				<div class="my-1">
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

<!-- TODO Make a finished quiz view component -->
<!-- TODO Add a sound effect on transition -->
<!-- TODO Display all questions in a scroll bar -->
<!-- TODO Add leave button at the bottom -->
<!-- TODO Highlight correct answers with green -->
<!-- TODO Highlight wrong answers with red -->
<!-- TODO Put an absolute checkmark or cross on the right end of the card depending if the answer is right or wrong -->
<!-- TODO Display the total amount of points where the navigation buttons were -->