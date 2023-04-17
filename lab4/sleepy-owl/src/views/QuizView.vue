<script lang="ts">
import { mapState } from "pinia";
import { quizStore } from "@/stores/quizStore";

import type { QuestionInterface } from "@/stores/quizStore";

import QuizQuestion from "@/components/quiz/quiz-question.vue";
import IconBack from "@/components/icons/IconBack.vue";
import IconForward from "@/components/icons/IconForward.vue";


export default {
	created() {		
		this.getQuiz();
	},
	props: ['quizId'],
	data() {
		return {
			quizName: "",
			questionArray: [] as QuestionInterface[],
			// mockQuestion: {
			// 	body: "Where do penguins live?",
			// 	answers: ["South pole", "North pole", "Madagascar"],
			// 	correctAnswer: "South pole",
			// } as QuestionInterface,
		};
	},
	computed: {
		...mapState(quizStore, ["quizzesGet", "getQuizById"]),
	},
	components: {
		QuizQuestion,
		IconBack,
		IconForward
	},
	methods: {
		getQuiz() {
			const qid = Number(this.quizId);
			const quiz = this.getQuizById(qid);
			this.quizName = quiz!.title;
			this.questionArray = quiz!.questions;
		}
	},
};
</script>

<template>
	<div class="min-h-screen py-20">
		<div class="mx-auto max-w-4xl">
			<h1 class="mx-auto w-fit px-4 py-1 mb-4 text-3xl border-b-2">Quiz: {{ quizName }} </h1>
			<div v-for="(question, index) in questionArray" class="w-full bg-secondary rounded-md p-4 space-y-4">
				<quiz-question :question="question" :question-number="index+1" />
			</div>
			<div class="my-1 pl-3 flex items-center">
				<button class="rounded-full py-2 pl-5 pr-3 bg-indigo-600 text-white hover:bg-indigo-500">
					<IconBack />
				</button>
				<button class="h-10 rounded-full py-2 px-4 ml-2 bg-indigo-600 text-white hover:bg-indigo-500">
					<IconForward />
				</button>
				<button class="ml-auto rounded-md my-2 font-bold bg-green-600 text-white hover:bg-green-500">
					<span class="leading-10 px-2 tracking-wide">Finish</span>
				</button>
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