// Academic Planner Core Array State
let academicTasks = [
    { id: 1, name: "Review Java Syntax Logic Loops", completed: true },
    { id: 2, name: "Build HTML Portfolio Semantic Outlines", completed: false }
];

// 1. Task Planner Logic
function addTask() {
    const inputField = document.getElementById("taskInput");
    const taskName = inputField.value.trim();

    if (taskName === "") {
        alert("Input validation rule: Task field cannot stand empty!");
        return;
    }

    const newTaskInstance = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    academicTasks.push(newTaskInstance);
    inputField.value = "";
    refreshUiView();
}

function toggleTaskState(id) {
    academicTasks = academicTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    refreshUiView();
}

function removeTaskItem(id) {
    academicTasks = academicTasks.filter(t => t.id !== id);
    refreshUiView();
}

function refreshUiView() {
    const bodyContainer = document.getElementById("taskTableBody");
    if (!bodyContainer) return;

    bodyContainer.innerHTML = "";

    academicTasks.forEach(task => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = task.name;
        if (task.completed) nameCell.classList.add("completed-text");

        const statusCell = document.createElement("td");
        statusCell.textContent = task.completed ? "Completed" : "Pending";
        statusCell.style.color = task.completed ? "var(--success)" : "var(--danger)";

        const controlsCell = document.createElement("td");

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = task.completed ? "Undo" : "Finish";
        toggleBtn.className = "btn";
        toggleBtn.style.margin = "0 6px 0 0";
        toggleBtn.style.padding = "4px 8px";
        toggleBtn.onclick = () => toggleTaskState(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.className = "btn";
        deleteBtn.style.padding = "4px 8px";
        deleteBtn.style.background = "var(--danger)";
        deleteBtn.onclick = () => removeTaskItem(task.id);

        controlsCell.appendChild(toggleBtn);
        controlsCell.appendChild(deleteBtn);

        row.appendChild(nameCell);
        row.appendChild(statusCell);
        row.appendChild(controlsCell);

        bodyContainer.appendChild(row);
    });
}

// 2. Client-Side Contact Verification Logic
function validateContactForm(event) {
    event.preventDefault();

    const nameValue = document.getElementById("fullName").value.trim();
    const emailValue = document.getElementById("emailAddress").value.trim();
    const phoneValue = document.getElementById("phoneNumber").value.trim();
    const messageValue = document.getElementById("message").value.trim();

    if (!nameValue || !emailValue || !phoneValue || !messageValue) {
        renderFeedbackBox("Form processing halted: Please verify all blank areas are completed.", "var(--danger)");
        return;
    }

    const targetEmailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!targetEmailRx.test(emailValue)) {
        renderFeedbackBox("Invalid input structure: Please type an authentic, structured email.", "var(--danger)");
        return;
    }

    const digitRegexCheck = /^\d+$/;
    if (!digitRegexCheck.test(phoneValue)) {
        renderFeedbackBox("Configuration mistake: Telephone sequences must only consist of numbers.", "var(--danger)");
        return;
    }

    renderFeedbackBox("Success! Validation checks passed seamlessly.", "var(--success)");
    document.getElementById("contactForm").reset();
}

function renderFeedbackBox(msgText, styleBg) {
    const box = document.getElementById("formFeedback");
    if (!box) return;

    box.textContent = msgText;
    box.style.backgroundColor = styleBg;
    box.style.color = "white";
    box.style.display = "block";
}

// Initial script context initialization
document.addEventListener("DOMContentLoaded", () => {
    refreshUiView();
});