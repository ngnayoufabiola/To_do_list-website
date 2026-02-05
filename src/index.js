import './style.css';

class TodoApp {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.render();
  }

  // ---------- LOCAL STORAGE ----------
  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // ---------- CREATE ----------
  addTask(description) {
    if (!description.trim()) return;

    const newTask = {
      index: this.tasks.length + 1,
      description,
      completed: false,
    };

    this.tasks.push(newTask);
    this.saveToLocalStorage();
    this.render();
  }

  // ---------- READ ----------
  render() {
    this.root.innerHTML = '';

    const header = document.createElement('h1');
    header.textContent = "Today's To-Do App";
    this.root.appendChild(header);

    this.renderInput();
    this.renderTaskList();
    this.renderClearButton();
  }

  renderInput() {
    const addContainer = document.createElement('span');
    addContainer.classList.add('add-container');

    const addedTask = document.createElement('div');
    addedTask.classList.add('added-task');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add to your list...';
    input.classList.add('input-task');

    const addIcon = document.createElement('span');
    addIcon.innerHTML = '&#x21bb;';
    addIcon.classList.add('add-icon');

    addIcon.addEventListener('click', () => {
      this.addTask(input.value);
      input.value = '';
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTask(input.value);
        input.value = '';
      }
    });

    addedTask.append(input, addIcon);
    addContainer.appendChild(addedTask);
    this.root.appendChild(addContainer);
  }

  renderTaskList() {
    const taskList = document.createElement('ul');
    taskList.classList.add('task-list');

    this.tasks.forEach((task) => {
      const listItem = document.createElement('li');
      listItem.classList.add('task-item');

      const group = document.createElement('span');
      group.classList.add('task-group');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.classList.add('task-checkbox');

      checkbox.addEventListener('change', () => {
        this.toggleTask(task.index);
      });

      const description = document.createElement('p');
      description.textContent = task.description;
      description.contentEditable = true;

      if (task.completed) {
        description.classList.add('completed');
      }

      description.addEventListener('blur', () => {
        this.editTask(task.index, description.textContent);
      });

      const deleteIcon = document.createElement('span');
      deleteIcon.innerHTML = '&#128465;';
      deleteIcon.classList.add('item-menu');

      deleteIcon.addEventListener('click', () => {
        this.deleteTask(task.index);
      });

      group.append(checkbox, description);
      listItem.append(group, deleteIcon);
      taskList.appendChild(listItem);
    });

    this.root.appendChild(taskList);
  }

  // ---------- UPDATE ----------
  toggleTask(index) {
    this.tasks = this.tasks.map((task) => (task.index === index
      ? { ...task, completed: !task.completed }
      : task));

    this.saveToLocalStorage();
    this.render();
  }

  editTask(index, newText) {
    this.tasks = this.tasks.map((task) => (task.index === index
      ? { ...task, description: newText }
      : task));

    this.saveToLocalStorage();
    this.render();
  }

  // ---------- DELETE ----------
  deleteTask(index) {
    this.tasks = this.tasks
      .filter((task) => task.index !== index)
      .map((task, i) => ({ ...task, index: i + 1 }));

    this.saveToLocalStorage();
    this.render();
  }

  clearCompleted() {
    this.tasks = this.tasks
      .filter((task) => !task.completed)
      .map((task, i) => ({ ...task, index: i + 1 }));

    this.saveToLocalStorage();
    this.render();
  }

  renderClearButton() {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear all completed';
    clearButton.classList.add('clear-button');

    clearButton.addEventListener('click', () => {
      this.clearCompleted();
    });

    this.root.appendChild(clearButton);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const App = new TodoApp('root');
});
