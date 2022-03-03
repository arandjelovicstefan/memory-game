import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cardReducer from './card/card.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['card', 'user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  card: cardReducer,
});

export default persistReducer(persistConfig, rootReducer);
