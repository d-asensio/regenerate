import { Box } from 'grommet'
import { Todo } from './Todo'
import { useSelector } from '../store'
import { todoIdListSelector } from '../selectors/todos'

export function TodoList () {
  const todoIdList = useSelector(todoIdListSelector)

  return (
    <Box fill="horizontal" align="center" flex="grow" gap="medium" pad="small">
      {todoIdList.map(todoId => (
        <Todo key={todoId} id={todoId} />
      ))}
    </Box>
  )
}