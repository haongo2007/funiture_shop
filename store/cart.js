// Cart
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_CART = 'UPDATE_CART';

export const state = () => (
    {
        data: []
    }
);

export const getters = {
    cartList: state => {
        return state.data
    },
    priceTotal: state => {
        return state.data.reduce( ( acc, cur ) => {
            return acc + cur.sum
        }, 0 );
    },
    qtyTotal: state => {
        return state.data.reduce( ( acc, cur ) => {
            return acc + parseInt( cur.qty, 10 );
        }, 0 );
    },
    isInCart: state => ( product ) => {
        return state.data.find( item => item.id == product.id ) ? true : false;
    },
    canAddToCart: state => ( product, qty = 1 ) => {
        var find = state.data.find( item => item.id == product.id );
        if ( find ) {
            if ( product.stock == 0 || ( product.stock < ( find.qty + qty ) ) ) return false;
            else return true;
        } else {
            if ( product.stock == 0 || ( product.stock < qty ) ) return false;
            else return true;
        }
    }
}

export const actions = {
    addToCart: function ( { commit, getters }, payload ) {
        if ( !getters.canAddToCart( payload.product, payload.qty ) ) {
            this._vm.$vToastify.removeToast();
            this._vm.$vToastify.error( "Sorry, you can't add that amount to the cart." );
            return;
        }
        commit( ADD_TO_CART, payload );
        this._vm.$vToastify.success( "Product added to cart" );
    },
    removeFromCart: function ( { commit }, payload ) {
        commit( REMOVE_FROM_CART, payload );
        this._vm.$vToastify.success( "Product removed from cart" );
    },
    updateCart: function ( { commit }, payload ) {
        payload.cartItems.forEach((item,key)=>{
            if(item.qty == 0){
                commit( REMOVE_FROM_CART, {product : item} );
                delete payload.cartItems[key];
            }
        })
        commit( UPDATE_CART, payload );
        this._vm.$vToastify.success( "Cart successfully updated" );
    }
}

export const mutations = {
    [ ADD_TO_CART ] ( state, payload ) {
        var findIndex = state.data.findIndex( item => item.id == payload.product.id );
        let qty = payload.qty ? payload.qty : 1;
        let variants = payload.product.selectedVariant;
        variants.qty = qty;
        if ( findIndex !== -1 && payload.product.variants.length > 0 ) {
            findIndex = state.data.findIndex( item => item.name == payload.product.name );
        }

        if ( findIndex !== -1 ) {
            let sumVariant = 0;
            state.data = state.data.reduce( ( acc, product, index ) => {
                if ( findIndex == index ) {
                    let findIndexVariant = product.variants.findIndex((item) => item.color == variants.color && item.size == variants.size);
                    if (findIndexVariant !== -1) {// has
                        product.variants[findIndexVariant].qty += variants.qty;
                    } else {
                        product.variants.push(variants);
                    }
                    product.variants.forEach( function(element, index) {
                        sumVariant += (element.price_size + element.price_color) * element.qty;
                    });
                    acc.push( {
                        ...product,
                        qty: product.qty + qty,
                        sum: payload.product.price * ( product.qty + qty ) + sumVariant
                    } );
                } else {
                    acc.push( product );
                }
                return acc;
            }, [] );
        } else {
            variants = [variants];
            let sumVariant = 0;

            variants.forEach( function(element, index) {
                sumVariant += (element.price_size + element.price_color) * element.qty;
            });

            state.data = [
                ...state.data,
                {
                    ...payload.product,
                    qty: qty,
                    variants,
                    price: payload.product.price,
                    sum: qty * payload.product.price + sumVariant
                }
            ];
        }
    },

    [ REMOVE_FROM_CART ] ( state, payload ) {
        state.data = state.data.filter( item => {
            if ( item.id !== payload.product.id ) return true;
            if ( item.name !== payload.product.name ) return true;
            return false;
        } );
    },

    [ UPDATE_CART ] ( state, payload ) {
        state.data = payload.cartItems.reduce( ( acc, cur ) => {
            return [
                ...acc,
                {
                    ...cur,
                    sum: ( cur.sale_price ? cur.sale_price : cur.price ) * cur.qty
                }
            ]
        }, [] );
    },

    [ CLEAR_CART ] ( state ) {
        state.data = [];
    }
}