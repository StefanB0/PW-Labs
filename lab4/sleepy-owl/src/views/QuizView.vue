<script lang="ts">
import { mapActions, mapState } from "pinia";
import { quizStore } from "@/stores/quizStore";

import type { QuizInterface, QuestionInterface, AnswerInterface, QuizReviewInterface, QuestionReviewInterface } from "@/stores/quizStore";

import QuizQuestion from "@/components/quiz/quiz-question.vue";
import IconBack from "@/components/icons/IconBack.vue";
import IconForward from "@/components/icons/IconForward.vue";
import {  } from '../stores/quizStore';

export default {
	created() {
		this.loadQuiz();
		// if (this.quizId == 1) {
		// 	console.log("Quiz 1");
		// }
	},
	data() {
		return {
			quizId: Number(this.$route.params.quizId),
			quizName: "",
			questionArray: [] as QuestionInterface[],
			answerArray: [] as AnswerInterface[],
		};
	},
	computed: {
		...mapState(quizStore, ["quizzesGet", "getQuizById"]),
		// quizName(): string | undefined {
		// 	return this.getQuizById(this.quizId)?.title;
		// },
		// questionArray(): QuestionInterface[] {
		// 	return this.getQuizById(this.quizId)?.questions || [];
		// },
	},
	components: {
		QuizQuestion,
		IconBack,
		IconForward
	},
	methods: {
		async loadQuiz() {
			const res = await fetch('/mockQuiz.json');
			const data = await res.json() as QuizInterface[];
			const quiz = data.find((quiz) => quiz.id === this.quizId);
			if (quiz) {
				this.quizName = quiz.title;
				this.questionArray = quiz.questions;
				this.answerArray = quiz.questions.map((question) => {
					return {
						question_id: question.id,
						answer: "",
						user_id: 1,
					};
				});
			}
		},
		updateAnswerArray(answer: string, questionId: number) {
			console.log(answer, questionId);
			this.answerArray.find((answer) => answer.question_id === questionId)!.answer = answer;
		},
		submitQuiz() {
			// submit the answers to the database
			console.log(this.answerArray);
			// process the response
			const quizReview: QuizReviewInterface = {
				id: this.quizId,
				title: this.quizName,
				questions: this.questionArray.map((question) => {
					const questionReview: QuestionReviewInterface = {
						id: question.id,
						question: question.question,
						answers: this.questionArray.find((q) => q.id === question.id)!.answers,
						correctAnswer: question.correctAnswer || "",
						selectedAnswer: this.answerArray.find((answer) => answer.question_id === question.id)!.answer
					};
					return questionReview;
				}),
			}

			console.log(quizReview);
			this.addAnsweredQuiz(quizReview);
			this.markQuizAsFinished(this.quizId);

			const score = quizReview.questions.filter((question) => question.selectedAnswer === question.correctAnswer).length;
			const maxScore = quizReview.questions.length;
			this.updateQuizScore(this.quizId, score, maxScore);


			// redirect to the results page
			this.$router.push(`/quiz/${this.quizId}/results`);
		},
		...mapActions(quizStore, ["addAnsweredQuiz", "markQuizAsFinished", "updateQuizScore"]),
	},
};
</script>

<template>
	<div v-if="quizName != ''">
		<div class="min-h-screen py-20">
			<div class="mx-auto max-w-4xl">
				<h1 class="mx-auto w-fit px-4 py-1 mb-4 text-3xl border-b-2">Quiz: {{ quizName }} </h1>
				<div class="bg-secondary rounded-md">
					<div v-for="(question, index) in questionArray" class="w-full p-4 space-y-4">
						<quiz-question :question="question" :question-index="index + 1" @answer-selected="updateAnswerArray" />
					</div>
				</div>
				<div class="my-1 pl-3 flex items-center">
					<button class="rounded-full py-2 pl-5 pr-3 bg-indigo-600 text-white hover:bg-indigo-500">
						<IconBack />
					</button>
					<button class="h-10 rounded-full py-2 px-4 ml-2 bg-indigo-600 text-white hover:bg-indigo-500">
						<IconForward />
					</button>
					<button class="ml-auto rounded-md my-2 font-bold bg-green-600 text-white hover:bg-green-500"
						@click="submitQuiz">
						<span class="leading-10 px-2 tracking-wide">Finish</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- TODO Make dynamic routes for each quiz subsection /user/quiz-name/1 -->
<!-- TODO Split quizzes in groups of five questions -->
<!-- TODO Navigate groups with arrow buttons -->
<!-- TODO Disable left and write button when at the end -->
<!-- TODO Disable finish button unless all questions are answered -->
<!-- TODO Add button to leave quiz -->