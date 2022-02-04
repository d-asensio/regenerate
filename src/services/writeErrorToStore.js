import helperEffects from "../effects/helpers";
import storeEffects from "../effects/store";

export function * writeErrorToStore () {
  try {
    yield helperEffects.throwErrorSometimes()
    yield storeEffects.set('errorMessage', 'No error :)')
  } catch {
    yield storeEffects.set('errorMessage', 'Oops! An error was found :(')
  }
}