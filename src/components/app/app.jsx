import React from 'react';
import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import Main from '../../pages/main/main';
import { useDispatch } from 'react-redux';
import { set } from '../../store/slices/data';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(set());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <AppHeader />
            <Main />
        </div>
    );
};

export default App;
