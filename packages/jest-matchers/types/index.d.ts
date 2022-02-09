/// <reference types="jest" />

declare namespace jest {
    // noinspection JSUnusedGlobalSymbols
    interface Matchers<R> {
        /**
         * Note: Currently unimplemented
         * Passing assertion
         *
         * @param {any} executionPlan
         */
        toGenerateEffects(executionPlan: any): R;
    }
}
