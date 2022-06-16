import createPersistedState from 'vuex-persistedstate';

export default ( { store } ) => {
    let storage = localStorage.getItem( 'yourkey' );

    // if ( storage && JSON.parse( storage ).demo.current != 1 ) {
    //     localStorage.clear();
    // }

    window.onNuxtReady( () => {
        createPersistedState( {
            key: 'yourkey',
            paths: []
        } )( store )
    } )
}