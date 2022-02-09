import { createSelector } from 'reselect'

export const todoIdListSelector =
  ({ todosById }) => Object.keys(todosById ?? {})