export const auth = {
    state: () => ({
        token: null
    }),

    actions: {
        login( { commit }, authData ){
            commit( 'loginUser', authData );
        }
    },

    mutations: {
        
    },

    getters: {
       
    }
}