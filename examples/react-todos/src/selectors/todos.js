import { createSelector } from 'reselect'
import { createCachedSelector } from 're-reselect'

const todosByIdSelector = ({ todosById }) => todosById

export const todoIdListSelector = createSelector(
  todosByIdSelector,
  todosById => Object.keys(todosById ?? {}),

)

const todoIdParameter = (_, id) => id

export const todoSelector = createCachedSelector(
  todosByIdSelector,
  todoIdParameter,
  (todosById, id) => todosById[id]
)(
  todoIdParameter
)