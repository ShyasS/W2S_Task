import authReducer, { setToken, logout } from '../features/authSlice';

describe('authSlice reducers', () => {
  it('should handle setToken', () => {
    const initialState = { token: null };
    const action = setToken('fake-token');
    const state = authReducer(initialState, action);
    expect(state.token).toBe('fake-token');
  });

  it('should handle logout', () => {
    const initialState = { token: 'fake-token' };
    const action = logout();
    const state = authReducer(initialState, action);
    expect(state.token).toBe(null);
  });
});
