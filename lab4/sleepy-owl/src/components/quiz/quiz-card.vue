<script lang="ts">
import { RouterLink } from 'vue-router';

import type { QuizInterfaceV2 } from '@/stores/quizStore'

export default {
	props: {
		quiz: {
			type: Object as () => QuizInterfaceV2,
			required: true,
		},
		index: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {}
	},
	computed: {
		quizPass() {
			return this.quiz.score / this.quiz.question_count >= 0.5;
		}
	},
	methods: {
		gotoQuiz() {
			if (this.quiz.finished !== true) {
				this.$router.push(`/quiz/${this.quiz.id}`);
			}
		}
	},
};
</script>

<template>
	<div @click="gotoQuiz"
		class="flex items-center transition-all ease-in-out duration-300 border mx-4 my-2 py-4 px-2 text-2xl rounded-md"
		:class="{ notFinished: !quiz.finished, group: !quiz.finished, finished: quiz.finished }">
		<p class="transition-all ease-in-out duration-300 group group-hover:border-indigo-500 w-12 h-12 text-3xl leading-10 mx-2 text-center border-2 rounded-full select-none"
			:class="{ finished: quiz.finished }">
			{{ index + 1 }}
		</p>
		<h2 class="transition-all ease-in-out duration-300 group mr-auto ml-2"> {{ quiz.title }} </h2>
		<div v-if="quiz.finished!" class="flex items-center mr-2">
			<p class="text-lg mx-2 text-white"> Score: </p>
			<p v-if="quizPass" class="text-lg text-green-500"> {{ quiz.score }}/{{ quiz.question_count }} </p>
			<p v-if="!quizPass" class="text-lg text-red-500"> {{ quiz.score }}/{{ quiz.question_count }} </p>
		</div>
		<p class="transition-all ease-in-out duration-300 group mr-2 text-lg"> N: {{ quiz.question_count }} </p>
	</div>
</template>

<style scoped>
.notFinished {
	@apply hover:border-indigo-500 hover:text-indigo-500 cursor-pointer select-auto;
}

.finished {
	@apply border-gray-400 text-gray-400;
}
</style>