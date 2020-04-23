import {createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../src/reducers/index'

export default createStore(reducer,applyMiddleware(thunk))

// import { createStore,  applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

// import rootReducer from './reducers'

// export default createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// )