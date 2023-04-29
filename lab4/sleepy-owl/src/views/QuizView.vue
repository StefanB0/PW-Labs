<script lang="ts">
import { getQuiz, submitQuizAnswer } from "@/assets/scripts/server-api";
import QuizQuestion from "@/components/quiz/quiz-question.vue";
import { quizStoreV2, type QuestionAnswer, type QuestionResponse, type QuizFull, type QuizInterfaceV2, type Review, type ReviewQuestion } from "@/stores/quizStore";
import { userStore } from "@/stores/userStore";
import { mapState, mapStores } from "pinia";

export default {
	created() {
		this.fetchQuiz();
	},
	data() {
		return {
			quiz: {} as QuizInterfaceV2,
			quizId: Number(this.$route.params.quizId),
			answerArray: [] as QuestionResponse[],
		};
	},
	computed: {
		...mapStores(quizStoreV2),
		...mapStores(userStore),
	},
	components: {
		QuizQuestion,
	},
	methods: {
		loadQuiz() {
			const quiz: QuizInterfaceV2 = this.quizStoreV2Store.quizzes.find((quiz) => quiz.id === this.quizId) as QuizInterfaceV2;
			this.quiz = quiz;
			this.answerArray = quiz.question_array.map((question) => {
				return {
					question_id: question.id,
					answer: "",
					user_id: this.userStoreStore.currentUser.id,
				} as QuestionResponse;
			});
		},
		async fetchQuiz() {
			let quizFull: QuizFull = await getQuiz(this.quizId);

			this.quiz = {
				id: quizFull.id,
				title: quizFull.title,
				question_count: quizFull.questions.length,
				question_array: quizFull.questions,
				finished: false,
				score: 0,
			} as QuizInterfaceV2;

			this.answerArray = this.quiz.question_array.map((question) => {
				return {
					question_id: question.id,
					answer: "",
					user_id: this.userStoreStore.currentUser.id,
				} as QuestionResponse;
			});

		},
		updateAnswerArray(answer: string, questionId: number) {
			let answerIndex = this.answerArray.findIndex((a) => a.question_id === questionId);
			this.answerArray[answerIndex].answer = answer;
			console.log(answer, questionId, answerIndex);
		},
		async submitQuiz() {
			let markedAnswers: QuestionAnswer[];
			let markedAnswersPromise = this.answerArray.map(async (answer) => {
				const response = await submitQuizAnswer(this.quiz.id, answer);
				return response;
			});
			markedAnswers = await Promise.all(markedAnswersPromise);

			let score = markedAnswers.filter((answer) => answer.correct).length;
			this.quizStoreV2Store.finishQuiz(this.quizId, score)

			let reviewAnswers: ReviewQuestion[] = markedAnswers.map((answer, index) => {
				return {
					id: answer.id,
					question: this.quiz.question_array[index].question,
					answers: this.quiz.question_array[index].answers,
					correct_answer: answer.correct_answer,
					selected_answer: this.answerArray[index].answer
				}
			});
			let review: Review = {
				id: this.quizId,
				title: this.quiz.title,
				question_count: this.quiz.question_count,
				question_array: reviewAnswers,
				score: score,
			}

			this.quizStoreV2Store.addQuizReview(review);

			// redirect to the results page
			this.$router.push(`/quiz/${this.quizId}/results`);

			console.log(markedAnswers);
		},
	},
};
</script>

<template>
	<div v-if="quiz.title != ''">
		<div class="min-h-screen py-20">
			<div class="mx-auto max-w-4xl">
				<h1 class="mx-auto w-fit px-4 py-1 mb-4 text-3xl border-b-2">Quiz: {{ quiz.title }} </h1>
				<div class="bg-secondary rounded-md">
					<div v-for="(question, index) in quiz.question_array" class="w-full p-4 space-y-4">
						<quiz-question :question="question" :question-index="index + 1" @answer-selected="updateAnswerArray" />
					</div>
				</div>
				<div class="my-1 pl-3 flex items-center">
					<button class="ml-auto rounded-md my-2 font-bold bg-green-600 text-white hover:bg-green-500"
						@click="submitQuiz">
						<span class="leading-10 px-2 tracking-wide">Finish</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>