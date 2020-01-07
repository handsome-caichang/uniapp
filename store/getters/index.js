export default {
    getsysinfo: (state ) => (codename) => {
        let sysinfo = {};
        state.sysinfolist.forEach(el => {
            if (el.code == codename) {
                sysinfo = el;
            }
        });
        return sysinfo.value;
    }
}