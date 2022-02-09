import { Box } from 'grommet'
import { Todo } from './Todo'

export function TodoList () {
  return (
    <Box fill="horizontal" align="center" flex="grow" gap="medium" pad="small">
      <Todo text={'Do thing'} editing/>
      <Todo text={'Do another thing'} completed/>
    </Box>
  )
}