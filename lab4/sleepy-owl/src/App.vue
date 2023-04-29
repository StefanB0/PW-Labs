<script setup lang="ts">
import { RouterView } from 'vue-router';
import { userStore, type UserInterface } from './stores/userStore';
import { getUsers } from './assets/scripts/server-api';
import { onBeforeMount, watch } from 'vue';
import router from './router/index';
import { quizStoreV2 } from './stores/quizStore';

const quizStorage = quizStoreV2();
const userStorage = userStore();

watch(() => userStorage.currentUser, (newUser: UserInterface) => {
	localStorage.setItem('currentUser', JSON.stringify(newUser));
});
watch(() => userStorage.isAuth, (newAuth: boolean) => {
	localStorage.setItem('isAuth', JSON.stringify(newAuth));
});
watch(() => quizStorage.quizzes, (newQuizzes) => {
	localStorage.setItem('quizzes', JSON.stringify(newQuizzes));
}, { deep: true });
watch(() => quizStorage.quizReviews, (newReviews) => {
	localStorage.setItem('quizReviews', JSON.stringify(newReviews));
}, { deep: true });

onBeforeMount(async () => {
	let users = await getUsers();
	users.forEach((user) => {
		userStorage.addUser(user);
	});
});

router.beforeEach((to, _from) => {
	if (!userStorage.isAuth) {
		if (to.name !== 'LogIn' && to.name !== 'SignUp') {
			return 'log-in';
		}
	}

	if (router.hasRoute(to.name as string)) {
		return true;
	}

	return '/';
})
</script>

<template>
	<RouterView />
</template>