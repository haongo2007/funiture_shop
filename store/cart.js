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
    priceTotal: (state,getters) => {
        return state.data.reduce( ( acc, cur ) => {
            return acc + cur.sum  + cur.sumVariantPrice + getters.priceTaxByProduct(cur)
        }, 0 );
    },
    priceTotalWithTax: state => {
        return state.data.reduce( ( acc, cur ) => {
            return acc + cur.sum + cur.tax
        }, 0 );
    },
    priceTotalWithVariant: (state,getters) => {
        return state.data.reduce( ( acc, cur ) => {
            return acc + cur.sum + cur.sumVariantPrice
        }, 0 );
    },
    priceTax: state => {
        return state.data.reduce( ( acc, cur ) => {
            return acc + ((cur.sum + cur.sumVariantPrice) * cur.tax / 100) 
        }, 0 );
    },
    priceTaxByProduct: state => (product) => {
        return ((product.sum + product.sumVariantPrice) * product.tax / 100) 
    },
    priceVariant: state => (product) => {
        return state.data.reduce( ( acc, cur ) => {
            return acc + cur.sumVariantPrice * cur.qty;
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
        let variants = {
            attributes: payload.product.selectedVariant,
            qty: qty,
        };
        let sumVariantPrice = 0;
        if ( findIndex !== -1 && payload.product.variants.length > 0 ) {
            findIndex = state.data.findIndex( item => item.name == payload.product.name );
        }

        if ( findIndex !== -1 ) {
            state.data = state.data.reduce( ( acc, product, index ) => {
                if ( findIndex == index ) {
                    let findVar = product.selectedVariant.findIndex((item) => { return JSON.stringify(item.attributes) === JSON.stringify(variants.attributes); });
                    if ( findVar !== -1 ){
                        product.selectedVariant[findVar].qty += variants.qty;
                    }else{
                        product.selectedVariant.push(variants);
                    }

                    for(let index in variants.attributes) {
                        let item = variants.attributes[index];
                        sumVariantPrice += product.variants[index][item.value_index].price * variants.qty;
                    };
                    
                    product.sumVariantPrice += sumVariantPrice;
                    acc.push( {
                        ...product,
                        qty: product.qty + qty,
                        sum: payload.product.price * ( product.qty + qty )
                    } );
                } else {
                    acc.push( product );
                }
                return acc;
            }, [] );
        } else {
            for(let index in variants.attributes) {
                let item = variants.attributes[index];
                sumVariantPrice += payload.product.variants[index][item.value_index].price * variants.qty;
            };

            variants = [variants];
            state.data = [
                ...state.data,
                {
                    ...payload.product,
                    qty: qty,
                    sumVariantPrice: sumVariantPrice,
                    selectedVariant:variants,
                    price: payload.product.price,
                    sum: qty * payload.product.price
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