import createPersistedState from 'vuex-persistedstate';
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export default ( { store } ) => {
    let storage = localStorage.getItem( 'yourkey' );

    // if ( storage && JSON.parse( storage ).demo.current != 1 ) {
    //     localStorage.clear();
    // }

    window.onNuxtReady( () => {
        createPersistedState( {
            key: 'yourkey',
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key)
            },
            paths: []
        } )( store )
    } )
}