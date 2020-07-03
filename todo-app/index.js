const todos = [{
    text: 'todo 1',
    completed: false
},{
    text: 'todo 2',
    completed: true
},{
    text: 'todo 3',
    completed: true
},{
    text: 'todo 4',
    completed: false
},{
    text: 'todo 5',
    completed: true
}]

const filters = {
    searchText: '',
    hideCompleted: false,
};

const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch;
    });

    const incompleteTodos = filteredTodos.filter((todo) => {
        return !todo.completed;
    })
    
    document.querySelector('#todos').innerHTML = '';

    const summary = document.createElement('h2');
    summary.textContent = `You have ${incompleteTodos.length} todos left.`
    document.querySelector('#todos').appendChild(summary);

    filteredTodos.forEach((todo) => {
        const todoEl = document.createElement('p');
        todoEl.textContent = todo.text;
        document.querySelector('#todos').appendChild(todoEl);
    });
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', (e)=>{
    filters.searchText = e.target.value;
    renderTodos(todos,filters);
});

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let newTodo = {
        text: e.target.elements.todoInput.value,
        completed: false
    };
    todos.push(newTodo);
    e.target.elements.todoInput.value = '';
    renderTodos(todos, filters);
});

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos,filters);
});
