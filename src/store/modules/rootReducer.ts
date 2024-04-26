import { combineReducers } from '@reduxjs/toolkit';

import contextSlice from './ContextModal/contextSlice';
import loadingSlice from './Loading/loadingSlice';
import ModalId from './ModalId/idSlice';
import ModalIdQuestion from './ModalIdQuestion/idSliceQuestion';
import notificationSlice from './Notification/notificationSlice';
import searchSlice from './Search/searchSlice';
import questionSlice from './Question/questionSlice';
import searchAdapter from './Search/searchAdapter';
import contextSliceQuestion from './ContextModalQuestion/contextSlice';
import questionAdapter from './Question/questionAdapter';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
	// modal: modalSlice,
	notification: notificationSlice,
	search: searchSlice,
	question: questionSlice,
	questions: questionAdapter,
	searches: searchAdapter,
	loading: loadingSlice,
	context: contextSlice,
	contextQuestion: contextSliceQuestion,
	id: ModalId,
	idQuestion: ModalIdQuestion,

	// modal: modalTarefasSlice,
});

export default rootReducer;
