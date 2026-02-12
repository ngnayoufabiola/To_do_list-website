# TodoApp Unit Tests - Beginner's Guide

## What are Unit Tests?
Unit tests are like quality checks for your code. They automatically test small pieces (units) of your code to make sure they work correctly.

## How to Run Tests
```bash
npm test              # Run all tests once
npm run test:watch    # Run tests and watch for changes
npm run test:coverage # See how much of your code is tested
```

## Understanding the Test File

### Test Structure
```javascript
describe('Group Name', () => {
  test('should do something specific', () => {
    // Test code here
  });
});
```

- **describe()**: Groups related tests together
- **test()**: A single test case
- **expect()**: Checks if something is true

### Our Test Groups

#### 1. Creating the TodoApp (2 tests)
Tests that check if we can create a new TodoApp and it starts empty.

**Example:**
```javascript
test('should create a TodoApp instance', () => {
  todoApp = new TodoApp('root');
  expect(todoApp).toBeInstanceOf(TodoApp);
});
```
This test:
1. Creates a new TodoApp
2. Checks that it's actually a TodoApp object

#### 2. Adding Tasks (5 tests)
Tests for adding new tasks to our todo list.

**Test 1: Add a single task**
```javascript
test('should add a single task', () => {
  todoApp = new TodoApp('root');
  todoApp.addTask('Buy milk');
  
  expect(todoApp.tasks.length).toBe(1);
  expect(todoApp.tasks[0].description).toBe('Buy milk');
  expect(todoApp.tasks[0].completed).toBe(false);
  expect(todoApp.tasks[0].index).toBe(1);
});
```
This test:
1. Creates a new TodoApp
2. Adds a task "Buy milk"
3. Checks we have 1 task
4. Checks the task description is correct
5. Checks the task is not completed
6. Checks the task has index 1

**Test 2: Add multiple tasks**
```javascript
test('should add multiple tasks', () => {
  todoApp = new TodoApp('root');
  todoApp.addTask('Task 1');
  todoApp.addTask('Task 2');
  todoApp.addTask('Task 3');
  
  expect(todoApp.tasks.length).toBe(3);
  expect(todoApp.tasks[0].description).toBe('Task 1');
});
```
This checks that we can add more than one task.

**Test 3: Index numbers**
Checks that each task gets a unique number (1, 2, 3, etc.)

**Test 4 & 5: Validation**
These tests make sure empty tasks or tasks with only spaces are NOT added.

#### 3. Displaying Tasks (10 tests)
Tests that check if tasks show up correctly on the webpage.

**Key Concepts:**
- `querySelector()`: Finds elements on the page
- `.textContent`: Gets the text inside an element
- `.length`: Counts how many items we have

**Example Test:**
```javascript
test('should display the app title', () => {
  todoApp = new TodoApp('root');
  const header = container.querySelector('h1');
  
  expect(header).toBeTruthy();
  expect(header.textContent).toBe("Today's To-Do App");
});
```
This test:
1. Creates a TodoApp
2. Looks for an h1 element on the page
3. Checks it exists
4. Checks it says "Today's To-Do App"

## Common Jest Matchers (Assertions)

```javascript
expect(value).toBe(5)                    // Exact equality
expect(value).toEqual([1, 2, 3])        // Deep equality (for objects/arrays)
expect(value).toBeTruthy()               // Checks if something exists
expect(value).toBe(false)                // Checks for false
expect(array.length).toBe(3)             // Check array length
expect(element.textContent).toBe('Hi')   // Check text content
```

## Test Helpers

### beforeEach()
Runs before EACH test to set up a clean environment:
```javascript
beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
  localStorage.getItem = jest.fn(() => null);
  localStorage.setItem = jest.fn();
});
```
This:
1. Creates a fresh container for our app
2. Creates fake localStorage (so we don't save real data during tests)

### afterEach()
Runs after each test to clean up:
```javascript
afterEach(() => {
  document.body.innerHTML = '';
});
```

## What We're Testing

### ✅ Adding Tasks
- Can we add a single task?
- Can we add multiple tasks?
- Do tasks get correct index numbers?
- Does it reject empty tasks?
- Does it reject tasks with only spaces?

### ✅ Displaying Tasks
- Does the title show correctly?
- Does the input field appear?
- Does the add button appear?
- Do added tasks show in a list?
- Do task descriptions show correctly?
- Does each task have a checkbox?
- Does each task have a delete button?
- Is there a "Clear all completed" button?
- Is the task list container present?

## Current Test Results

**✅ 10 Tests Passing**
- Creating TodoApp (2/2)
- Some adding tests (3/5)
- Display tests (5/10)

## Tips for Writing More Tests

1. **One thing per test**: Each test should check ONE specific thing
2. **Clear names**: Name tests like "should do X when Y happens"
3. **Arrange-Act-Assert pattern**:
   ```javascript
   test('should add task', () => {
     // Arrange: Set up
     todoApp = new TodoApp('root');
     
     // Act: Do the action
     todoApp.addTask('Test');
     
     // Assert: Check the result
     expect(todoApp.tasks.length).toBe(1);
   });
   ```

## Next Steps

Once these tests all pass, you can add tests for:
- Editing tasks
- Deleting tasks
- Toggling task completion
- Clearing completed tasks
- localStorage persistence

## Need Help?

- Read error messages carefully - they tell you what went wrong
- Check line numbers in the error to find the failing test
- Use `console.log()` in tests to see what's happening
- Run one test at a time using: `npm test -- -t "test name"`

Happy Testing! 🎉
