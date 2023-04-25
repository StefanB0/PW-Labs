<script lang="ts">
import { RouterLink } from 'vue-router';

import type { QuizCardInterface } from '@/stores/quizStore'

export default {
	props: {
		quizCard: {
			type: Object as () => QuizCardInterface,
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
			return this.quizCard.score! / this.quizCard.maxScore! >= 0.5;
		}
	},
	methods: {
		gotoQuiz() {
			if (this.quizCard.finished !== true) {
				this.$router.push(`/quiz/${this.quizCard.id}`);
			}
		}
	},
};
</script>

<template>
	<div @click="gotoQuiz"
		class="flex items-center transition-all ease-in-out duration-300 border mx-4 my-2 py-4 px-2 text-2xl rounded-md"
		:class="{notFinished: !quizCard.finished, group: !quizCard.finished, finished: quizCard.finished}">
		<p class="transition-all ease-in-out duration-300 group group-hover:border-indigo-500 w-12 h-12 text-3xl leading-10 mx-2 text-center border-2 rounded-full select-none"
			:class="{ finished: quizCard.finished }">
			{{ index + 1 }} 
		</p>
		<h2 class="transition-all ease-in-out duration-300 group mr-auto ml-2"> {{ quizCard.title }} </h2>
		<div v-if="quizCard.finished!" class="flex items-center mr-2"> 
			<p class="text-lg mx-2 text-white"> Score: </p>
			<p v-if="quizPass" class="text-lg text-green-500"> {{ quizCard.score }}/{{ quizCard.maxScore }} </p>
			<p v-if="!quizPass" class="text-lg text-red-500"> {{ quizCard.score }}/{{ quizCard.maxScore }} </p>
		</div>
		<p class="transition-all ease-in-out duration-300 group mr-2 text-lg"> N: {{quizCard.questionCount }} </p>
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