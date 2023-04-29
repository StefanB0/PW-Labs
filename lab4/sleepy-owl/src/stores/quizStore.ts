import { defineStore } from "pinia"

export interface QuizInterfaceV2 {
	id: number
	title: string
	question_count: number
	question_array: QuestionPreview[]
	finished: boolean
	score: number
}

export interface QuizPreview {
	id: number
	title: string
	question_count: number
}

export interface QuizFull {
	id: number
	title: string
	questions: QuestionPreview[]
}

export interface QuestionPreview {
	id: number
	question: string
	answers: string[]
}

export interface QuestionPrototype {
	question: string
	answers: string[]
	correct_answer: string
}

export interface QuestionResponse {
	question_id: number
	answer: string
	user_id: number
}

export interface QuestionAnswer {
	id: number
	correct_answer: string
	correct: boolean
}

export interface Review {
	id: number
	title: string
	question_count: number
	question_array: ReviewQuestion[]
	score: number
}

export interface ReviewQuestion {
	id: number
	question: string
	answers: string[]
	correct_answer: string
	selected_answer: string
}

let localQuizzes: QuizInterfaceV2[] = []
if (localStorage.getItem("quizzes")) {
	localQuizzes = JSON.parse(localStorage.getItem("quizzes") || "")
}
let localQuizReviews: Review[] = []
if (localStorage.getItem("quizReviews")) {
	localQuizReviews = JSON.parse(localStorage.getItem("quizReviews") || "")
}

export const quizStoreV2 = defineStore("quizStoreV2", {
	state: () => ({
		quizzes: localQuizzes,
		quizReviews: localQuizReviews,
	}),
	actions: {
		addQuiz(quiz: QuizInterfaceV2) {
			if (this.quizzes.find((q) => q.id === quiz.id)) {
				return
			}
			this.quizzes.push(quiz)
		},
		addQuizReview(review: Review) {
			if (this.quizReviews.find((q) => q.id === review.id)) {
				return
			}
			this.quizReviews.push(review)
		},
		updateQuiz(quiz: QuizInterfaceV2) {
			const quizIndex = this.quizzes.findIndex((q) => q.id === quiz.id)
			if (quizIndex !== -1) {
				this.quizzes[quizIndex] = quiz
			}
		},
		finishQuiz(quizId: number, score: number) {
			const quizIndex = this.quizzes.findIndex((q) => q.id === quizId)
			if (quizIndex !== -1) {
				this.quizzes[quizIndex].finished = true
				this.quizzes[quizIndex].score = score
			}
		},
		resetQuizzes() {
			this.quizzes = this.quizzes.map((q) => {
				q.finished = false
				q.score = 0
				return q
			})
		},
		removeQuiz(quiz: QuizInterfaceV2) {
			const quizIndex = this.quizzes.findIndex((q) => q.id === quiz.id)
			if (quizIndex !== -1) {
				this.quizzes.splice(quizIndex, 1)
			}
		},
	},
})

