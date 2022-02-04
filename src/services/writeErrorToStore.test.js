import storeEffects from "../effects/store";
import helperEffects from "../effects/helpers";

import {writeErrorToStore} from './writeErrorToStore'

it('should work (error path)', () => {
  expect(
    writeErrorToStore()
  ).toGenerateEffects([
    {
      effect: helperEffects.throwErrorSometimes(),
      throws: new Error()
    },
    {
      effect: storeEffects.set('errorMessage', 'Oops! An error was found :(')
    }
  ])
})

it('should work (success path)', () => {
  expect(
    writeErrorToStore()
  ).toGenerateEffects([
    {
      effect: helperEffects.throwErrorSometimes(),
    },
    {
      effect: storeEffects.set('errorMessage', 'No error :)')
    }
  ])
})

