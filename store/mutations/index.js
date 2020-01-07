export default {
    login(state, userName) {
        state.userName = userName || '新用户';
        state.hasLogin = true;
    },
    setlocation(state, userName) {
        state.location = location;
    },
    logout(state) {
        state.userName = "";
        state.hasLogin = false;
    }
}