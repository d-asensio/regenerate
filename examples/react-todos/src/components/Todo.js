import { Box, Button, Card, CheckBox, TextInput } from 'grommet'
import { Edit, Save, Trash } from 'grommet-icons'

import { useSelector } from '../store'
import { todoSelector } from '../selectors/todos'
import { useCallback } from 'react'
import { run } from '@regenerate/core'
import { todosService } from '../services/todosService'

export function Todo ({ id }) {
  const todo = useSelector(
    state => todoSelector(state, id)
  )

  const handleCheckboxClick = useCallback(() =>
    run(
      todosService.toggleTodo(id)
    )
  , [id])

  const handleDeleteClick = useCallback(() =>
    run(
      todosService.deleteTodo(id)
    )
  , [id])

  if (!todo) return null

  const { title, completed, editing = false } = todo

  return (
    <Card direction="row" pad="medium" gap="medium" fill="horizontal" justify="between" align="center">
      <Box align="center" justify="center" direction="row" gap="small">
        <CheckBox checked={completed} onClick={handleCheckboxClick}/>
        <TextInput value={title} plain={!editing} focusIndicator={!!editing}/>
      </Box>
      <Box align="center" justify="center" direction="row" gap="xxsmall">
        <Button icon={editing ? <Save/> : <Edit/>}/>
        <Button icon={<Trash/>} disabled={editing} onClick={handleDeleteClick}/>
      </Box>
    </Card>
  )
}