import axios from "axios";
import { useReducer, createContext, useEffect } from "react";

const initialState = {
    user: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    useEffect(() => {
        const storedUser = JSON.parse(window.localStorage.getItem("user"));
        if (storedUser) {
            dispatch({
                type: "LOGIN",
                payload: storedUser,
            });
        }
    }, []);

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`);
                console.log("/402 err > logout");
                dispatch({ type: "LOGOUT" });
                window.localStorage.removeItem("user");
                window.location = "/#/login";
            } catch (err) {
                console.log("AXIOS INTERCEPTORS ERROR:", err);
                return Promise.reject(err);
            }
        };

        const fetchCsrfToken = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/csrf-token`,
                    {
                        withCredentials: true,
                    }
                );
                //console.log("1-XCSRF:", axios.defaults.headers.common["X-CSRF-Token"]);
                axios.defaults.headers.common["X-CSRF-Token"] = data.csrfToken;
                // console.log("2-XCSRF:", axios.defaults.headers.common["X-CSRF-Token"]);
            } catch (err) {
                console.log("CSRF TOKEN REQUEST ERROR:", err);
            }
        };

        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                let res = error.response;
                if (
                    res &&
                    res.status === 401 &&
                    res.config &&
                    !res.config.__isRetryRequest
                ) {
                    handleLogout();
                }
                return Promise.reject(error);
            }
        );

        fetchCsrfToken();
    }, []);

    return (
        <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
};

export { Context, Provider };
