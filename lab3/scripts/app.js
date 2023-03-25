"use strict";

// Handle state
var notificationPermission = Notification.permission;
console.log(notificationPermission);

if (localStorage.getItem("appMemory") == null) {
	var globalId = 0;
	var appMemory = [];
	var tab = "#display-all";
	console.log(appMemory);
	console.log(globalId);
} else {
	var appMemory = JSON.parse(localStorage.getItem("appMemory"));
	var globalId = localStorage.getItem("globalId");
	var tab = localStorage.getItem("tab");
	
	appMemory.forEach((task) => {
		renderTask(task);
	});
	
	selectCategory(tab);
	
	console.log(appMemory);
	console.log(globalId);
	console.log(tab);
}

function setAppMemory() {
	localStorage.setItem("appMemory", JSON.stringify(appMemory));
	localStorage.setItem("globalId", globalId);
	localStorage.setItem("tab", tab);
}

setInterval(() => {
	setAppMemory();
}, 1000);

// Load page elements

function createTask(userText = "Grind", checked = false) {
	globalId++;
	var taskId = "task-" + globalId;
	var task = {id: taskId, text: userText, checked: checked}
	appMemory.push(task);
	if (tab != "#display-finished") {
		renderTask(task);
	}
}

function renderTask(task) {
	var taskObject = createTaskObject(task.id, task.text, task.checked);
	document.querySelector(".app-list").appendChild(taskObject);
}

function createTaskObject(taskId, userText = "Grind", checked = false) {
	var task = document.createElement("div");
	task.setAttribute("class", "item bg-white");
	
	task.setAttribute("id", taskId);
	
	var checkbox = document.createElement("div");
	checkbox.setAttribute("class", "checkbox");
	task.appendChild(checkbox);

	checkbox.addEventListener("click", () => {
		console.log("Checkbox clicked");
		if (task.classList.contains("checked")) {
			uncheckTask(task);
		} else {
			checkTask(task);
		}
	});

	var text = document.createElement("div");
	text.setAttribute("class", "text");
	text.textContent = userText;
	task.appendChild(text);

	var bellButton = document.createElement("button");
	bellButton.setAttribute("class", "clear-button");

	bellButton.addEventListener("click", () => {
		createNotification(userText);
		console.log("Bell button clicked");
	});
	
	var bellIcon = document.createElement("img");
	bellIcon.setAttribute("class", "icon");
	bellIcon.setAttribute("src", "assets/icons/bell-icon.svg");
	bellButton.appendChild(bellIcon);
	
	task.appendChild(bellButton);

	var deleteButton = document.createElement("button");
	deleteButton.setAttribute("class", "clear-button");

	deleteButton.addEventListener("click", () => {
		console.log("Delete button clicked");
		appMemory.forEach((task) => {
			if (task.id == taskId) {
				appMemory.splice(appMemory.indexOf(task), 1);
			}
		});
		task.remove();
	});
	
	var deleteIcon = document.createElement("img");
	deleteIcon.setAttribute("class", "icon danger");
	deleteIcon.setAttribute("src", "assets/icons/delete-icon.svg");
	deleteButton.appendChild(deleteIcon);
	
	task.appendChild(deleteButton);

	if (checked) {
		checkTask(task);
	}

	return task;
}

function checkTask(task) {
	appMemory.forEach((taskMemory) => {
		if (taskMemory.id == task.id) {
			taskMemory.checked = true;
		}
	});

	var img = document.createElement("img");
	img.setAttribute("class", "icon");
	img.setAttribute("src", "assets/icons/done_thick-icon.svg");
	
	task.setAttribute("class", "item bg-white checked");
	task.querySelector(".checkbox").appendChild(img);
	if (tab == "#display-unfinished") {
		task.remove();
	}
}

function uncheckTask(task) {
	appMemory.forEach((taskMemory) => {
		if (taskMemory.id == task.id) {
			taskMemory.checked = false;
		}
	});

	task.setAttribute("class", "item bg-white");
	task.querySelector(".checkbox").querySelector("img").remove();
	if (tab == "#display-finished") {
		task.remove();
	}
}

function selectCategory(id) {
	document.querySelector(".app-header").querySelector(".menu").querySelectorAll("button").forEach((button) => {
		button.setAttribute("class", "clear-button");
	});
	document.querySelector(".app-header").querySelector(".menu").querySelector(id).setAttribute("class", "clear-button selected");
	
	document.querySelector(".app-list").querySelectorAll(".item").forEach((task) => {
		task.remove();
	});


	var taskSubset = [];
	switch (id) {
		case "#display-all":
			tab = "#display-all";
			taskSubset = appMemory;
		break;
		case "#display-unfinished":
			tab = "#display-unfinished";
			appMemory.forEach((task) => {
				if (!task.checked) {
					taskSubset.push(task);
				}
			});
		break;
		case "#display-finished":
			tab = "#display-finished";
			appMemory.forEach((task) => {
				if (task.checked) {
					taskSubset.push(task);
				}
			});
		break;
	
		default:
			break;
	}

	taskSubset.forEach((task) => {
		renderTask(task);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM loaded");
});



// Handle input
const buttonExport = document.querySelector("#export");
const buttonImport = document.querySelector("#import");
const buttonDeleteAll = document.querySelector("#delete-all");
const buttonAll = document.querySelector("#display-all");
const buttonUnfinished = document.querySelector("#display-unfinished");
const buttonFinished = document.querySelector("#display-finished");
const buttonAddTask = document.querySelector("#add-task");

buttonExport.addEventListener("click", () => {
	// save appmemory as a json file
	var json = JSON.stringify(appMemory);
	var blob = new Blob([json], {type: "application/json"});
	var url  = URL.createObjectURL(blob);
	var link = document.createElement("a");
	link.href = url;
	link.download = "appMemory.json";
	link.click();

	URL.revokeObjectURL(url);
	console.log("Export button clicked");
});

buttonImport.addEventListener("click", () => {
	var input = document.createElement("input");
	input.type = "file";
	input.accept = "application/json";
	input.addEventListener("change", () => {
		var file = input.files[0];
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			var newItems = JSON.parse(reader.result);
			newItems.forEach((item) => {
				item.id = "task-" + globalId;
				globalId++;
				appMemory.push(item);
				renderTask(item);
				selectCategory(tab);
			});
		};
	});
	input.click();
	console.log("Import button clicked");
});

buttonDeleteAll.addEventListener("click", () => {
	var confirmed = window.confirm("Are you sure you want to delete all items?");
	if (confirmed) {
		appMemory = [];
		globalId = 0;
		selectCategory(tab);
	}
	console.log("Delete all button clicked");
});

buttonAll.addEventListener("click", () => {
	selectCategory("#display-all")
	console.log("Display all button clicked");
});

buttonUnfinished.addEventListener("click", () => {
	selectCategory("#display-unfinished")
	document.querySelector(".app-list").querySelectorAll(".item").forEach((task) => {
		task.remove();
	});

	appMemory.forEach((task) => {
		if (!task.checked) {
			renderTask(task);
		}
	});

	console.log("Display unfinished button clicked");
});

buttonFinished.addEventListener("click", () => {
	selectCategory("#display-finished")
	document.querySelector(".app-list").querySelectorAll(".item").forEach((task) => {
		task.remove();
	});

	appMemory.forEach((task) => {
		if (task.checked) {
			renderTask(task);
		}
	});

	console.log("Display finished button clicked");
});

buttonAddTask.addEventListener("click", () => {
	console.log("Add task button clicked");
	var inputText = document.getElementById("new-task-input").value;
	var newTask;
	if (inputText != "") {
		createTask(inputText);
		document.getElementById("new-task-input").value = "";
	}
});

document.getElementById("new-task-input").addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		buttonAddTask.click();
	}
});

// Handle notifications
function createNotification(userText) {
	var delay = getDelay();
	if (Notification.permission !== "granted" && Notification.permission !== "denied") {
		Notification.requestPermission()
	}
	
	if (Notification.permission === "granted") {
		setTimeout(
			() => {
				var notification = new Notification("Task reminder", {
					body: userText,
					icon: "assets/icons/bell-icon.svg"
				});
				setTimeout(notification.close.bind(notification), delay + 5000);
			}, delay
		);
	}
}

function getDelay() {
	var delay = window.prompt("Enter delay in minutes");
	return delay * 60000;
}