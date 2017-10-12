import {routerRedux} from 'dva/router';
import * as usersService from '../services/users';
export default {
  namespace: 'login',
  state: {
    status: false,
    username: null,
    menu:[]
  },
  reducers: {
    save(state, {payload:{status,username,data:menu}}){
      return {...state, status, username,menu}
    }
  },
  effects: {
    *login({payload:values}, {put}){
      if (values.username == 'guest' && values.password == 'guest') {
        sessionStorage.setItem('username', values.username);
        sessionStorage.setItem('status', true);
        yield put(routerRedux.push('/index'));
      }
    },
    *unlogin({}, {put}){
      yield put(routerRedux.push('/login'));
    },
    *logout({}, {put}){
      sessionStorage.clear();
      yield put(routerRedux.push('/login'));
    },
    *menu({payload:{}}, {call,put}){
      const { data, headers } = yield call(usersService.getMenu);
      var status=sessionStorage.getItem('status');
      var username=sessionStorage.getItem('username');
      yield put({
        type: 'save',
        payload: { status, username,data}
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/index'||pathname === '/users') {
          dispatch({
            type: 'menu',
            payload: {}
          })
        }
      });
    },
  },
}
