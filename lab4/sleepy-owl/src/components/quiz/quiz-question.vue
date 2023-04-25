<script lang="ts">
import type { QuestionInterface } from '@/stores/quizStore';

export default {
	emits: ["answerSelected"],
	data() {
		return {
			qAnswer: ""
		};
	},
	props: {
		question: {
			type: Object as () => QuestionInterface,
			required: true,
		},
		questionIndex: {
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
		answerSelected(answer: string) {
			this.qAnswer = answer;
			this.$emit("answerSelected", this.qAnswer, this.question.id);
		}
	},
};
</script>

<template>
	<div class="bg-primary border-2 w-full px-5 py-2 rounded-lg">
		<p> Question {{ questionIndex }}</p>
		<p>{{ question.question }}</p>
		<div v-for="(answer, index) in question.answers" class="m-2">
			<div class="flex items-center">
				<input class="hover:cursor-pointer mr-1 h-4 w-4" type="radio" :name="createName(questionIndex)"
					:id="createId(questionIndex, index)" @click="qAnswer = answer" />
				<label class="hover:cursor-pointer" :for="createId(questionIndex, index)" @click="answerSelected(answer)">{{ answer
				}}</label>
			</div>
		</div>
	</div>
</template>