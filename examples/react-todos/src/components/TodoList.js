import { useEffect } from 'react'
import { Box } from 'grommet'
import { run } from '@regenerate/core'

import { Todo } from './Todo'

import { useSelector } from '../store'
import { todoIdListSelector } from '../selectors/todos'
import { todosService } from '../services/todosService'

export function TodoList () {
  useEffect(() => {
    run(
      todosService.fetchTodos()
    )
  }, [])

  const todoIdList = useSelector(todoIdListSelector)

  return (
    <Box fill="horizontal" align="center" flex="grow" gap="medium" pad="small">
      {todoIdList.map(todoId => (
        <Todo key={todoId} id={todoId} />
      ))}
    </Box>
  )
}