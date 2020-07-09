'use strict'

const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos')

  try {
    return todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    return []
  }
}

const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id)

  if(todo){
    todo.completed = !todo.completed 
  }
}

const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id)

  if(todoIndex > -1){
    todos.splice(todoIndex, 1)
  }
}

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
      const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) 
      const hideCompletedMatch = !filters.hideCompleted || !todo.completed 
      return searchTextMatch && hideCompletedMatch
  }) 

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
  
  document.querySelector('#todos').innerHTML = ''
  document.querySelector('#todos').appendChild(generateSummaryDom(incompleteTodos)) 

  filteredTodos.forEach((todo) => {
    document.querySelector('#todos').appendChild(generateTodoDom(todo)) 
  }) 
} 

const generateTodoDom = (todo) => {
  const todoEl = document.createElement('div')
  const checkBox = document.createElement('input') 
  const text = document.createElement('span') 
  const button = document.createElement('button') 

  text.textContent = todo.text 
  button.textContent = 'x' 
  checkBox.type = 'checkbox' 
  checkBox.checked = todo.completed 

  button.addEventListener('click', () => {
    removeTodo(todo.id) 
    saveTodos(todos) 
    renderTodos(todos, filters) 
  })

  checkBox.addEventListener('change', () => {
    toggleTodo(todo.id) 
    saveTodos(todos) 
    renderTodos(todos, filters) 
  })

  todoEl.appendChild(checkBox) 
  todoEl.appendChild(text) 
  todoEl.appendChild(button) 

  return todoEl
}

const generateSummaryDom = (incompleteTodos) => {
  const summary = document.createElement('h2') 
  summary.textContent = `You have ${incompleteTodos.length} todos left.`
  return summary 
}