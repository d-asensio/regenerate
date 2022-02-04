# regenerate.js

A tiny module to manage side effects in a declarative way, with testability and ergonomics in mind.

> **Warning:** At the moment, all the code here have been written to explore how the API would look like. Everything is a scratching and it is poorly tested, almost everything is subject to change, take it with a grain of salt.

## Project structure

##### `src/regenerate.js`
The main code, this executes effect descriptor streams, using the `effectRegistry`

##### `src/effectRegistry.js`
Where effects are stored, its main goal is to register effects and build their associated effect descriptors, and create their identifiers. (similar to reffect's `registerEffectHandler`)

##### `src/effects/`
Directory containing effect declaration and registration. (similar to reffect's `state.set` and company).

##### `src/matchers/toGenerateEffects.js`
Custom jest matcher that makes it very easy to test effect stream generators (a.k.a. `services`) in a declarative way.

##### `src/services/`
Services are like reffect handlers, except that they are generators instead of functions, and aimed to be bounded to an entity (counter, publisher, user, etc.). Here you can also see how a service test would look like.

##### `src/index.js`
Example code showing how to execute services.
