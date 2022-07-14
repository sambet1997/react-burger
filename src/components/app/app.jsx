import React from 'react';
import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import Main from '../../pages/main/main';
import { useDispatch } from 'react-redux';
import { set } from '../../store/slices/data';

const App = () => {
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(set());
    }, []);

    return (
        <div className={styles.container}>
            {isError && (
                <p className={`text text_type_main-large ${styles.noContent}`}>
                    Межгалактическая ошибка, обновите страницу
                </p>
            )}
            {!isError && (
                <>
                    <AppHeader />
                    <Main />
                </>
            )}
        </div>
    );
};

export default App;
