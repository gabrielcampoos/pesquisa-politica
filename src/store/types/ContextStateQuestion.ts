interface ContextStateQuestion {
	isOpen: boolean;
	context: 'create' | 'edit' | 'delete';
}

export default ContextStateQuestion;
