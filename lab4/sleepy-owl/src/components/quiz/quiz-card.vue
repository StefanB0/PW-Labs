<script lang="ts">
import { RouterLink } from 'vue-router';

import type { QuizCardInterface } from '@/stores/quizStore'

export default {
	props: {
		quizCard: {
			type: Object as () => QuizCardInterface,
			required: true,
		},
	},
	data() {
		return {}
	},
};
</script>

<template>
	<router-link to="/quiz/1">
		<div
			class="flex items-center transition-all ease-in-out duration-300 group hover:border-indigo-500 border mx-4 my-2 py-4 px-2 text-2xl rounded-md">
			<p
				class="transition-all ease-in-out duration-300 group group-hover:border-indigo-500 group-hover:text-indigo-500 w-12 h-12 text-3xl leading-10 mx-2 text-center border-2 rounded-full select-none">
				{{ quizCard.id }} </p>
			<h2 class="transition-all ease-in-out duration-300 group group-hover:text-indigo-500 mr-auto ml-2"> {{
				quizCard.title }} </h2>
			<div class="flex items-center">
				<p v-if="[2, 3].includes(quizCard.id)" class="text-lg mx-2"> Score: </p>
				<p v-if="quizCard.id === 2" class="text-lg mr-4 text-green-500"> 7.6 </p>
				<p v-if="quizCard.id === 3" class="text-lg mr-4 text-red-500"> 2.2 </p>
			</div>
			<p class="transition-all ease-in-out duration-300 group group-hover:text-indigo-500 mr-2 text-lg"> N: {{
				quizCard.questionCount }} </p>
		</div>
	</router-link>
</template>