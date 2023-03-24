"use strict";

// ADD YOUR CODE HERE

// Load page elements

document.addEventListener("DOMContentLoaded", () => {

});

// Handle input

// Handle button clicks
const buttonExport = document.querySelector("#export");
const buttonImport = document.querySelector("#import");
const buttonAll = document.querySelector("#display-all");
const buttonUnfinished = document.querySelector("#display-unfinished");
const buttonFinished = document.querySelector("#display-finished");
const buttonAddTask = document.querySelector("#add-task");

buttonExport.addEventListener("click", () => {
	console.log("Export button clicked");
});

buttonImport.addEventListener("click", () => {
	console.log("Import button clicked");
});

buttonAll.addEventListener("click", () => {
	console.log("Display all button clicked");
});

buttonUnfinished.addEventListener("click", () => {
	console.log("Display unfinished button clicked");
});

buttonFinished.addEventListener("click", () => {
	console.log("Display finished button clicked");
});

buttonAddTask.addEventListener("click", () => {
	console.log("Add task button clicked");
	document.body.appendChild(taskFragment);
});

// Handle state

// Handle notifications

// Template html elements
const taskHtml = `<div class="item bg-white">
<div class="checkbox"></div>
<div class="text"></div>
<button class="clear-button"><img class="icon" src="assets/icons/bell-icon.svg"></button>
<button class="clear-button"><img class="icon danger" src="assets/icons/delete-icon.svg"></button>
</div>`;

var taskFragment = document.createRange().createContextualFragment(taskHtml);