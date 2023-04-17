<script lang="ts">
export interface Question {
	body: string;
	answers: string[];
	correctAnswer: string;
}

export default {
	data() {
		return {
			quizName: "On the life of penguins",
		};
	},
	props: {
		question: {
			type: Object as () => Question,
			required: true,
		},
		questionNumber: {
			type: Number,
			default: 1,
		},
	},
	methods: {
		createId(questionNumber: number, answerNumber: number) {
			return `q${questionNumber}a${answerNumber}`;
		},
		createName(questionNumber: number) {
			return `q${questionNumber}`;
		},
	},
};
</script>

<template>
	<div class="bg-primary border-2 w-full px-5 py-2 rounded-lg">
		<p> Question {{ questionNumber }}</p>
		<p>{{ question.body }}</p>
		<div v-for="(answer, index) in question.answers" class="m-2">
			<div class="flex items-center">
				<input class="hover:cursor-pointer mr-1 h-4 w-4" type="radio" :name="createName(questionNumber)" :id="createId(questionNumber, index)" />
				<label class="hover:cursor-pointer" :for="createId(questionNumber, index)">{{ answer }}</label>
			</div>
		</div>
	</div>
</template>