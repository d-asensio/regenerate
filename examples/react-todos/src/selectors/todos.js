import { createCachedSelector } from 're-reselect'

export const todosByIdSelector = ({ todosById }) => todosById ?? {}

export const todoIdListSelector = ({ todoIdList }) => todoIdList ?? []

const todoIdParameter = (_, id) => id

export const todoSelector = createCachedSelector(
  todosByIdSelector,
  todoIdParameter,
  (todosById, id) => todosById[id] ?? null
)(
  todoIdParameter
)