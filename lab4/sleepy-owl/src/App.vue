<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { quizStore, type QuizInterface } from './stores/quizStore';
import { onMounted } from 'vue';

const quizzes = quizStore();

onMounted(async () => {
	let res = await fetch('/mockQuiz.json');
	let data = await res.json() as QuizInterface[];
	
	console.log(data);
	data.forEach((quiz) => {
		console.log(quiz);
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