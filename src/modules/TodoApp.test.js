

// Import the TodoApp class we want to test
import TodoApp from './TodoApp';

// Mock (fake) the Domloading module so it doesn't interfere with tests
jest.mock('./Domloading.js', () => ({}));

// Group all TodoApp tests together
describe('TodoApp - Adding and Displaying Tasks', () => {
  // Variables to hold our app and container for each test
  let todoApp;
  let container;

  // beforeEach runs before every test to set up a clean environment
  beforeEach(() => {
    // Create a fresh div with id="root" for each test
    document.body.innerHTML = '<div id="root"></div>';
    container = document.getElementById('root');
    
    // Clear all mocks from previous tests
    jest.clearAllMocks();
    
    // Create fake localStorage functions (mocks)
    // This prevents tests from actually saving data to browser storage
    localStorage.getItem = jest.fn(() => null);
    localStorage.setItem = jest.fn();
  });

  // afterEach runs after every test to clean up
  afterEach(() => {
    // Remove everything from the page
    document.body.innerHTML = '';
  });

  // afterEach runs after every test to clean up
  afterEach(() => {
    // Remove everything from the page
    document.body.innerHTML = '';
  });

  // ========================================
  // TEST GROUP 1: Creating the App
  // ========================================
  describe('Creating the TodoApp', () => {
    
    test('should create a TodoApp instance', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Check that todoApp is actually a TodoApp object
      expect(todoApp).toBeInstanceOf(TodoApp);
    });

    test('should start with an empty task list', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // When we create a new app, it should have no tasks
      expect(todoApp.tasks).toEqual([]);
      expect(todoApp.tasks.length).toBe(0);
    });
  });

  // ========================================
  // TEST GROUP 2: Adding Tasks
  // ========================================
  describe('Adding Tasks', () => {
    
    test('should add a single task', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Add a task with description "Buy milk"
      todoApp.addTask('Buy milk');
      
      // Check that we now have 1 task
      expect(todoApp.tasks.length).toBe(1);
      
      // Check that the task has the correct description
      expect(todoApp.tasks[0].description).toBe('Buy milk');
      
      // Check that the task starts as not completed
      expect(todoApp.tasks[0].completed).toBe(false);
      
      // Check that the task has an index of 1
      expect(todoApp.tasks[0].index).toBe(1);
    });

    test('should add multiple tasks', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Add three different tasks
      todoApp.addTask('Task 1');
      todoApp.addTask('Task 2');
      todoApp.addTask('Task 3');
      
      // Check that we have 3 tasks total
      expect(todoApp.tasks.length).toBe(3);
      
      // Check that each task has the correct description
      expect(todoApp.tasks[0].description).toBe('Task 1');
      expect(todoApp.tasks[1].description).toBe('Task 2');
      expect(todoApp.tasks[2].description).toBe('Task 3');
    });

    test('should assign correct index numbers to tasks', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Add three tasks
      todoApp.addTask('First task');
      todoApp.addTask('Second task');
      todoApp.addTask('Third task');
      
      // Check that each task has the correct index (1, 2, 3)
      expect(todoApp.tasks[0].index).toBe(1);
      expect(todoApp.tasks[1].index).toBe(2);
      expect(todoApp.tasks[2].index).toBe(3);
    });

    test('should NOT add a task with empty text', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Try to add an empty task
      todoApp.addTask('');
      
      // The task should not be added
      expect(todoApp.tasks.length).toBe(0);
    });

    test('should NOT add a task with only spaces', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Try to add a task with just spaces
      todoApp.addTask('   ');
      
      // The task should not be added
      expect(todoApp.tasks.length).toBe(0);
    });
  });

  // ========================================
  // TEST GROUP 3: Displaying Tasks
  // ========================================
  describe('Displaying Tasks on the Page', () => {
    
    test('should display the app title', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Look for the h1 heading on the page
      const header = container.querySelector('h1');
      
      // Check that it exists and has the correct text
      expect(header).toBeTruthy();
      expect(header.textContent).toBe("Today's To-Do App");
    });

    test('should display an input field', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Look for the input field
      const input = container.querySelector('.input-task');
      
      // Check that it exists
      expect(input).toBeTruthy();
      
      // Check that it's a text input
      expect(input.type).toBe('text');
      
      // Check the placeholder text
      expect(input.placeholder).toBe('Add to your list...');
    });

    test('should display an add button icon', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Look for the add icon
      const addIcon = container.querySelector('.add-icon');
      
      // Check that it exists
      expect(addIcon).toBeTruthy();
      
      // Check that it has the refresh/add symbol
      expect(addIcon.textContent).toBe('↻');
    });

    test('should display added tasks in a list', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Add two tasks
      todoApp.addTask('Buy groceries');
      todoApp.addTask('Walk the dog');
      
      // Look for all task items on the page
      const taskItems = container.querySelectorAll('.task-item');
      
      // Check that we have 2 task items displayed
      expect(taskItems.length).toBe(2);
    });

    test('should display the correct task descriptions', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Add two tasks
      todoApp.addTask('Buy groceries');
      todoApp.addTask('Walk the dog');
      
      // Get all the task description paragraphs
      const descriptions = container.querySelectorAll('.task-item p');
      
      // Check that the first task shows "Buy groceries"
      expect(descriptions[0].textContent).toBe('Buy groceries');
      
      // Check that the second task shows "Walk the dog"
      expect(descriptions[1].textContent).toBe('Walk the dog');
    });

    test('should display a checkbox for each task', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Add two tasks
      todoApp.addTask('Task 1');
      todoApp.addTask('Task 2');
      
      // Get all checkboxes
      const checkboxes = container.querySelectorAll('.task-checkbox');
      
      // Check that we have 2 checkboxes (one for each task)
      expect(checkboxes.length).toBe(2);
      
      // Check that they are checkbox inputs
      expect(checkboxes[0].type).toBe('checkbox');
      expect(checkboxes[1].type).toBe('checkbox');
    });

    test('should display a delete icon for each task', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Add a task
      todoApp.addTask('Task with delete button');
      
      // Look for the delete icon
      const deleteIcon = container.querySelector('.item-menu');
      
      // Check that it exists
      expect(deleteIcon).toBeTruthy();
      
      // Check that it shows the trash can emoji
      expect(deleteIcon.textContent).toBe('🗑');
    });

    test('should display a clear completed button', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Look for the clear button
      const clearButton = container.querySelector('.clear-button');
      
      // Check that it exists
      expect(clearButton).toBeTruthy();
      
      // Check that it has the correct text
      expect(clearButton.textContent).toBe('Clear all completed');
    });

    test('should display the task list container', () => {
      // Create a new TodoApp
      todoApp = new TodoApp('root');
      
      // Look for the ul element that holds tasks
      const taskList = container.querySelector('.task-list');
      
      // Check that it exists
      expect(taskList).toBeTruthy();
      
      // Check that it's a UL (unordered list) element
      expect(taskList.tagName).toBe('UL');
    });
  });
});
