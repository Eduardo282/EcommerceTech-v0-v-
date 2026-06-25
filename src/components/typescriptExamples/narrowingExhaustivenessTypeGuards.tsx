type AppState = { user: string | null; error: string | null; loading: boolean };

// Unión discriminada: cada acción tiene un 'type' literal único
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: string }
  | { type: 'LOGIN_ERROR'; error: string };

function authReducer(state: AppState, action: AuthAction): AppState {
  switch (action.type) {
    case 'LOGIN_START': 
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS': 
      // TS sabe que aquí existe 'action.payload' (y no action.error)
      return { ...state, loading: false, user: action.payload };
    case 'LOGIN_ERROR': 
      // TS sabe que aquí existe 'action.error'
      return { ...state, loading: false, error: action.error };
    default:
      // Exhaustiveness check: Si mañana agregas { type: 'LOGOUT' } a AuthAction
      // y olvidas poner su 'case' aquí, TypeScript te marcará un error de compilación.
      const _exhaustiveCheck: never = action;
      return state;
  }
}