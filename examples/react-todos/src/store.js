import createStoreHook from 'zustand'
import createStore from 'zustand/vanilla'

const initialState = {
  todosById: {
    'todo-1': {
      id: 'todo-1',
      title: 'Todo 1',
      completed: false
    },
    'todo-2': {
      id: 'todo-2',
      title: 'Todo 2',
      completed: true
    }
  }
}

export const store = createStore(
  () => initialState
)

export const useSelector = createStoreHook(store)
