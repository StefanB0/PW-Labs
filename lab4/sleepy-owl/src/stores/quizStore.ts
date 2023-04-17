import { ref, computed, type Ref } from "vue"
import { defineStore } from "pinia"

export interface QuizInterface {
	id: number
	title: string
	questions: QuestionInterface[]
	finished?: boolean
}

export interface QuestionInterface {
	question: string
	answers: string[]
	correctAnswer: string
}

export interface QuizCardInterface {
	id: number
	title: string
	questionCount: number
	finished?: boolean
}

export const quizStore = defineStore("quizStore", {
	state: () => ({
		quizzes: [] as QuizInterface[],
		quizCards: [] as QuizCardInterface[],
	}),
	getters: {
		quizzesGet: (state) => {
			return state.quizzes
		},
		quizCardsGet: (state) => {
			return state.quizCards
		},
		getQuizById: (state) => (id: number) => {
			return state.quizzes.find((q) => q.id === id)
		}
	},
	actions: {
		addQuiz(quiz: QuizInterface) {
			this.quizzesGet.push(quiz)
			const quizcard: QuizCardInterface = {
				id: quiz.id,
				title: quiz.title,
				questionCount: quiz.questions.length,
				finished: quiz.finished,
			}
			this.quizCardsGet.push(quizcard)
		},
		markQuizAsFinished(id: number) {
			const quizIndex = this.quizzesGet.findIndex((q) => q.id === id)
			if (quizIndex !== -1) {
				this.quizzesGet[quizIndex].finished = true
			}
			const quizCardIndex = this.quizCardsGet.findIndex((q) => q.id === id)
			if (quizCardIndex !== -1) {
				this.quizCardsGet[quizCardIndex].finished = true
			}
		},
	},
})

// export const quizStore = defineStore("quizStore", () => {
// 	const quizStore: Ref<QuizInterface[]> = ref([])
// 	const quizCardStore: Ref<QuizCardInterface[]> = ref([])

// 	return { quizStore, quizCardStore }
// })
