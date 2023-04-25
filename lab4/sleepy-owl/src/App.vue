<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { quizStore, type QuizInterface } from './stores/quizStore';
import { onMounted, watch } from 'vue';

const quizzes = quizStore();
const access_token = import.meta.env.VITE_ACCESS_TOKEN;
console.log("access_token");
console.log(access_token);

onMounted(async () => {
	let res = await fetch('/mockQuiz.json');
	let data = await res.json() as QuizInterface[];
	
	data.forEach((quiz) => {
		quizzes.addQuiz({
			id: quiz.id,
			title: quiz.title,
			questions: quiz.questions,
			finished: false,
		});
	});
});

</script>

<template>
	<RouterView />
</template>