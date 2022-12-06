import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from '../constants/userConstants';
import axios from 'axios';

// const url = 'http://localhost:4000';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      // `${url}/login`,
      `/api/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    // localStorage.setItem('users', JSON.stringify(getState().user));
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    console.log(name, email, password);

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `/register`,
      { name, email, password },
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    // localStorage.setItem('users', JSON.stringify(getState().user));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
    // localStorage.setItem('users', JSON.stringify(getState().user));
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    // localStorage.setItem('users', JSON.stringify(getState().user));
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
