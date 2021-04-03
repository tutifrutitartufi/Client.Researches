import React, { useState } from 'react';
import Context, { ContextDefinition } from './AuthContext';

const isAuthLS = !!localStorage.getItem('user');

const State = (props) => {
    const [isAuth, setAuth] = useState(isAuthLS);

    const setToken = (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        setAuth(!!user);
    };

    return (
        <ContextDefinition.Provider
            value={{
                isAuth,
                setAuth: setToken,
            }}
        >
            {props.children}
        </ContextDefinition.Provider>
    );
};

export {
    State,
    Context,
};
