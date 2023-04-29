import type { UserInterface } from "@/stores/userStore"
import type {
	QuestionFull,
	QuizPreview,
	QuizFull,
	QuestionPreview,
	QuizResponse,
	QuizAnswer,
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
	console.log("getUsers")
	let users: UserInterface[] = []

	await axios
		.get(userUrl, config)
		.then((response) => {
			users = response.data
		})
		.catch((error) => {
			const err_flag = "Get user error: "
			console.log(err_flag + error.response.data.message + " | " + error.message)
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
			user = response.data
		})
		.catch((error) => {
			const err_flag = "Create user error: "
			console.log(err_flag + error.response.data.message + " | " + error.message)
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
			console.log(err_flag + error.response.data.message + " | " + error.message)
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
			console.log(err_flag + error.response.data.message + " | " + error.message)
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
			console.log(err_flag + error.response.data.message + " | " + error.message)
		})

	return quiz
}

export async function submitQuizAnswer(
	quiz_id: number,
	response: QuizResponse
): Promise<QuizAnswer> {
	let answer: QuizAnswer = {} as QuizAnswer
	let data = response
	await axios
		.post(quizUrl + quiz_id + "/submit", { data }, config)
		.then((response) => {
			answer = response.data
		})
		.catch((error) => {
			const err_flag = "Submit quiz error: "
			console.log(err_flag + error.response.data.message + " | " + error.message)
		})

	return answer
}

export async function createQuiz(
	title: string,
	questions: QuestionFull[]
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
			console.log(err_flag + error.response.data.message + " | " + error.message)
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

export async function testAPI() {
	//? User API
	// const users = await getUsers()
	// console.log(users)

	// const user = await createUser("Ali", "Baba")
	// console.log(user)

	// await deleteUser(user.id)

	//? QuizAPI
	// const quizzes = await getQuizzes()
	// console.log(quizzes)

	// const quiz = await getQuiz(7)
	// console.log(quiz)

	// const questions: QuestionFull[] = [
	// 	{
	// 		question: "How many arms do Octopus have?",
	// 		answers: ["1", "2", "3", "4", "8"],
	// 		correct_answer: "8",
	// 	} as QuestionFull,
	// ]
	// const newQuiz = await createQuiz("Awesome Quiz 5", questions)
	// console.log(newQuiz)

	// await deleteQuiz(newQuiz.id)

	// const response: QuizResponse = {
	// 	question_id: 636,
	// 	answer: "8",
	// 	user_id: 287
	// }
	// const answer = await submitQuizAnswer(191, response)
	// console.log(answer)
}

// TODO delete the test above