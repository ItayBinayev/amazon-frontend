import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../Reducers/Actions";

export const searchPageReducer = (state , { type, payload }) => {
    switch (type) {
            case GET_REQUEST:
                return {
                  ...state,
                    loading: true,
                };
            case GET_SUCCESS:
                return {
                  ...state,
                    loading: false,
                    products: payload.products, page: payload.page, pages: payload.pages, countproducts: payload.countproducts
                };
                case GET_FAIL:
                    return {
                      ...state,
                        loading: false,
                        error: payload,
                    }
                    default: 
                        return state
                }}

export const prices = [
{name: '$1 to $50', value: '1-50'}, 
{name: '$51 to $200', value: '51-200'}, 
{name: '$201 to $1000', value: '201-1000'}
]

export const ratings = [
    {name: '4 stars and up', value: 4},
    {name: '3 stars and up', value: 3},
    {name: '2 stars and up', value: 2},
    {name: '1 stars and up', value: 1},

]
