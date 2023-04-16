<script lang="ts">
import type { Question } from "@/components/quiz/quiz-question.vue";

import QuizQuestion from "@/components/quiz/quiz-question.vue";
import IconBack from "@/components/icons/IconBack.vue";
import IconForward from "@/components/icons/IconForward.vue";

export default {
	data() {
		return {
			quizName: "On the life of penguins",
			mockQuestion: {
				body: "Where do penguins live?",
				answers: ["South pole", "North pole", "Madagascar"],
				correctAnswer: "South pole",
			} as Question,
		};
	},
	components: {
		QuizQuestion,
		IconBack,
		IconForward
	},
};
</script>

<template>
	<div class="min-h-screen py-20">
		<div class="mx-auto max-w-4xl">
			<h1 class="mx-auto w-fit px-4 py-1 mb-4 text-3xl border-b-2">Quiz: {{ quizName }} </h1>
			<div class="w-full bg-secondary p-4 space-y-4">
				<quiz-question :question="mockQuestion" :question-number="1" />
				<QuizQuestion :question="mockQuestion" :question-number="2" />
			</div>
			<div class="my-2 flex items-center">
				<button
					class="rounded-md py-2 pl-3 pr-1 bg-indigo-600 text-white hover:bg-indigo-500">
					<IconBack />
				</button>
				<button class="h-10 rounded-md p-2 ml-2 bg-indigo-600 text-white hover:bg-indigo-500">
					<IconForward />
				</button>
				<button class="ml-auto rounded-md my-2 font-bold bg-green-600 text-white hover:bg-green-500">
					<span class="leading-10 px-2 tracking-wide">Finish</span>
				</button>
			</div>
		</div>

	</div>
</template>