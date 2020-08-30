const INITIAL_STATE = {
    usuarioNome: '',
    usuarioLogado: 0,
    usuarioId: '',
    usuarioControle: '',
};

function usuarioReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'LOG_IN':
            return {...state, usuarioLogado: 1, usuarioNome: action.usuarioNome, usuarioId: action.usuarioId, usuarioControle: action.usuarioControle}
        case 'LOG_OUT':
            return {...state, usuarioLogado: 0, usuarioNome: null, usuarioId: null, usuarioControle: null}
        default:
            return state;
    }
}

export default usuarioReducer;