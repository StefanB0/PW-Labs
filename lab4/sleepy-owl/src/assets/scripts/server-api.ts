import type { UserInterface } from "@/stores/userStore"
import type {
	QuestionPrototype,
	QuizPreview,
	QuizFull,
	QuestionPreview,
	QuestionResponse,
	QuestionAnswer,
} from "@/stores/quizStore"

import axios from "axios"

const accessToken: string = import.meta.env.VITE_ACCESS_TOKEN
const userUrl: string = "https://late-glitter-4431.fly.dev/api/v54/users/"
const quizUrl: string = "https://late-glitter-4431.fly.dev/api/v54/quizzes/"
const config = {
	headers: {
		"X-Access-Token": accessToken,
	},
}

export async function getUsers(): Promise<UserInterface[]> {
	let users: UserInterface[] = []

	await axios
		.get(userUrl, config)
		.then((response) => {
			users = response.data
		})
		.catch((error) => {
			const err_flag = "Get user error: "
			console.log(
				err_flag + error.response.data.message + " | " + error.message
			)
		})

	return users as UserInterface[]
}

export async function createUser(
	name: string,
	surname: string
): Promise<UserInterface> {
	let data = {
		name: name,
		surname: surname,
	}

	let user: UserInterface = {} as UserInterface

	await axios
		.post(userUrl, { data }, config)
		.then((response) => {
			if (response.data.message) {
				user = {} as UserInterface
			} else {
				user = response.data
			}
		})
		.catch((error) => {
			const err_flag = "Create user error: "
			console.log(
				err_flag + error.response.data.message + " | " + error.message
			)
		})

	return user
}

export async function deleteUser(userId: number) {
	await axios
		.delete(userUrl + userId, config)
		.then((response) => {
			console.log(response.data.message)
		})
		.catch((error) => {
			const err_flag = "Delete user error: "
			console.log(
				err_flag + error.response.data.message + " | " + error.message
			)
		})
}

export async function getQuizzes(): Promise<QuizPreview[]> {
	let quizzes: QuizPreview[] = []

	await axios
		.get(quizUrl, config)
		.then((response) => {
			quizzes = response.data
		})
		.catch((error) => {
			const err_flag = "Get quizzes error: "
			console.log(
				err_flag + error.response.data.message + " | " + error.message
			)
		})

	return quizzes
}

export async function getQuiz(quizId: number): Promise<QuizFull> {
	let quiz: QuizFull = {} as QuizFull
	await axios
		.get(quizUrl + quizId, config)
		.then((response) => {
			quiz = response.data
		})
		.catch((error) => {
			const err_flag = "Get quiz error: "
			console.log(
				err_flag + error.response.data.message + " | " + error.message
			)
		})

	return quiz
}

export async function submitQuizAnswer(
	quiz_id: number,
	response: QuestionResponse
): Promise<QuestionAnswer> {
	let answer: QuestionAnswer = {} as QuestionAnswer
	let data = response
	await axios
		.post(quizUrl + quiz_id + "/submit", { data }, config)
		.then((response) => {
			answer = response.data
		})
		.catch((error) => {
			const err_flag = "Submit quiz error: "
			console.log(
				err_flag + error.response.data.message + " | " + error.message
			)
		})

	return answer
}

export async function createQuiz(
	title: string,
	questions: QuestionPrototype[]
): Promise<QuizPreview> {
	let data = {
		title: title,
		questions: questions,
	}

	let quiz: QuizPreview = {} as QuizPreview

	await axios
		.post(quizUrl, { data }, config)
		.then((response) => {
			quiz = response.data
		})
		.catch((error) => {
			const err_flag = "Create quiz error: "
			console.log(
				err_flag + error.response.data.message + " | " + error.message
			)
		})

	return quiz
}

export async function deleteQuiz(quizId: number) {
	await axios
		.delete(quizUrl + quizId, config)
		.then((response) => {
			console.log(response.data.message)
		})
		.catch((error) => {
			const err_flag = "Delete quiz error: "
			console.log(
				err_flag + error.response.data.message + " | " + error.message
			)
		})
}
