import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "./Actions";

export const initState = {
    loading: true,
    error: "",
    products: [],   
};
export const HomePageReducer = (state , { type, payload }) => {
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
                    products: payload,
                };
                case GET_FAIL:
                    return {
                      ...state,
                        loading: false,
                        error: payload,
                    }
                }}