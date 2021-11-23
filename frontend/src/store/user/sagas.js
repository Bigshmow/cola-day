import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../core/api";

import {
  USER_AUTH,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from ".";

import { setToken } from "../../core/token";

function* checkSession() {
  try {
    yield put({ type: USER_AUTH.START });
    const { data } = yield call(api.get, "/auth/session");
    yield put({ type: USER_AUTH.SUCCESS, data });
  } catch (error) {
    yield put({ type: USER_AUTH.FAILURE, error });
  }
}

function* registerUser({ userData }) {
  try {
    yield put({ type: USER_REGISTER.START });
    const { data } = yield call(api.post, "/auth/register", userData);
    yield put({ type: USER_REGISTER.SUCCESS, data: data.user });
    setToken(data.token);
  } catch (error) {
    yield put({ type: USER_REGISTER.FAILURE, error });
  }
}
function* loginUser({ userData }) {
  try {
    yield put({ type: USER_LOGIN.START });
    const { data } = yield call(api.post, "/auth/login", userData);
    yield put({ type: USER_LOGIN.SUCCESS, data: data.user });
    setToken(data.token);
    // checkIntercom(data.user);
    // yield put(getSites());
  } catch (error) {
    yield put({ type: USER_LOGIN.FAILURE, error });
  }
}
function* logoutUser() {
  try {
    yield put({ type: USER_LOGOUT.START });
    const { data } = yield call(api.delete, "/auth/logout");
    yield put({ type: USER_LOGOUT.SUCCESS, data });
  } catch (error) {
    yield put({ type: USER_LOGOUT.FAILURE, error });
  }
}

export default function* mainSaga() {
  yield takeLatest(USER_AUTH.MAIN, checkSession);
  yield takeLatest(USER_REGISTER.MAIN, registerUser);
  yield takeLatest(USER_LOGIN.MAIN, loginUser);
  yield takeLatest(USER_LOGOUT.MAIN, logoutUser);
}
