import { useReducer, createContext, useMemo } from "react";
import axios from 'axios';

export const UserContext = createContext(); 

export const ACTIONS = {
  UPDATE_INFOS: "update_infos",
  RESET_INFOS: "reset_infos",
  SAVE_INFOS: "save_infos"
};
const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_INFOS:
      localStorage.setItem('user', JSON.stringify( {
        ...state, ...action.payload
      }));
      return JSON.parse(localStorage.getItem('user'));
    case ACTIONS.RESET_INFOS:
      localStorage.removeItem('user');
      state = {};
      return state;
    case ACTIONS.SAVE_INFOS:
      axios.post('http://localhost:3001/users/new', action.payload);
      return state;
    default:
      return state;
  }
};
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};