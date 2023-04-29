<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { quizStore, type QuizInterface } from './stores/quizStore';

const quizzes = quizStore();

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