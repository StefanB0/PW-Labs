<script lang="ts">
import Card from '@/components/quiz/quiz-card.vue';
import IconLogOut from '@/components/icons/IconLogOut.vue';
import type { QuizCard } from '@/components/quiz/quiz-card.vue'
import { RouterLink } from 'vue-router';

const mockQuestion = {
  id: 1,
  title: "On the life of penguins",
  questionCount: 10,
};

const mockUser = {
  id: 1,
  name: "John",
  surname: "Cena",
}

let mockItems = Array(10).fill(mockQuestion).map((item, index) => {
  return {
    ...item,
    id: index + 1,
  };
})
export default {
  data() {
    return {
      items: mockItems as QuizCard[],
      user: mockUser,
    };
  },
  components: {
    Card,
    IconLogOut
  },
};
</script>

<template>
  <main class="flex flex-col items-center">
    <div class="self-center flex items-center w-[50rem] mt-16">
      <img src="@/assets/img/mascot-round-3.png" alt="owl mascot image" class="h-[400px] m-4" />
      <div class="mx-4 ml-20 pt-8">
        <h1 class="text-4xl text-center">Sleepy Owl</h1>
        <h1 class="text-4xl text-center">Quizzes</h1>
      </div>
    </div>
    <div class="mt-10 flex items-center py-2 h-16">
      <h1 class="text-3xl font-bold"> User: {{ user.name }} {{ user.surname }} </h1>
      <router-link to="/log-in">
        <IconLogOut class="mt-1 ml-2 relative" />
      </router-link>
    </div>
    <div class="mt-8 mb-20 flex flex-col w-full items-center">
      <div v-for="item in items" class="py-3 bg-secondary w-full max-w-3xl">
        <Card :quiz-card="item" />
      </div>
    </div>
  </main>
</template>