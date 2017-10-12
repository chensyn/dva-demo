import * as usersService from '../services/users';
export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { list, total, page } }) {
      return {...state, list, total, page};
    },
  },
  effects: {
    //删除
    *remove({ payload: id }, { call, put }) {
      var result = yield call(usersService.remove, id);
      yield put({type: 'reload'});
    },
    //修改
    *patch({ payload: { id, values } }, { call, put }) {
      var result = yield call(usersService.patch, id, values);
      yield put({type: 'reload'});
    },
    //新增
    *create({ payload: values }, { call, put }) {
      var result = yield call(usersService.create, values);
      yield put({type: 'reload'});
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({type: 'fetch', payload: {page}});
    },
    *fetch({ payload: { page=1 } }, { call, put }) {
      const { list, headers } = yield call(usersService.fetch, {page});
      yield put({
        type: 'save',
        payload: {
          list,
          total: parseInt(headers['totalcount'], 10),
          page: parseInt(page, 10),
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type:'fetch',
            payload:{}
          })
        }
      });
    },
  },
}
