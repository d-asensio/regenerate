import createStore from 'zustand/vanilla'
import createZustandEffect from '@regenerate/effect-zustand-store'

export const store = createStore(() => ({}))

export default createZustandEffect({ store })
