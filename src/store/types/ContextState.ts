interface ContextState {
	isOpen: boolean;
	context: 'create' | 'edit' | 'delete';
}

export default ContextState;
