import { ref, computed, type Ref } from "vue"
import { defineStore } from "pinia"

export interface QuizInterface {
	id: number
	title: string
	questions: QuestionInterface[]
	answers?: string[]
	finished?: boolean
}

export interface QuizReviewInterface {
	id: number
	title: string
	questions: QuestionReviewInterface[]
}

export interface QuestionReviewInterface {
	id: number
	question: string
	answers: string[]
	correctAnswer: string
	selectedAnswer: string
}

export interface QuestionInterface {
	id: number
	question: string
	answers: string[]
	correctAnswer?: string
}

export interface AnswerInterface {
	question_id: number
	answer: string
	user_id: number
	correct?: boolean
}

export interface QuizCardInterface {
	id: number
	title: string
	questionCount: number
	finished?: boolean
	score?: number
	maxScore?: number
}

export const quizStore = defineStore("quizStore", {
	state: () => ({
		quizzes: [] as QuizInterface[],
		answeredQuizzes: [] as QuizReviewInterface[],
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
		},
	},
	actions: {
		addQuiz(quiz: QuizInterface) {
			if (this.quizzesGet.find((q) => q.id === quiz.id)) {
				return
			}
			this.quizzesGet.push(quiz)
			const quizcard: QuizCardInterface = {
				id: quiz.id,
				title: quiz.title,
				questionCount: quiz.questions.length,
				finished: quiz.finished,
			}
			this.quizCardsGet.push(quizcard)
		},
		addAnsweredQuiz(quiz: QuizReviewInterface) {
			if (this.answeredQuizzes.find((q) => q.id === quiz.id)) {
				return
			}
			this.answeredQuizzes.push(quiz)
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
		updateQuizScore(id: number, score: number, maxScore: number) {
			const quizCardIndex = this.quizCards.findIndex((q) => q.id === id)
			if (quizCardIndex !== -1) {
				this.quizCards[quizCardIndex].score = score
				this.quizCards[quizCardIndex].maxScore = maxScore
			}
		},
	},
})

// export const quizStore = defineStore("quizStore", () => {
// 	const quizStore: Ref<QuizInterface[]> = ref([])
// 	const quizCardStore: Ref<QuizCardInterface[]> = ref([])

// 	return { quizStore, quizCardStore }
// })
