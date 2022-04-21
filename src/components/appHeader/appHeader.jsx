import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css';

const AppHeader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.ingredients}>
                    <div className={styles.headerItem}>
                        <div className='pl-5'>
                            <BurgerIcon type="primary"/>
                        </div>
                        <p className='text text_type_main-default pl-2 pr-5'>Конструктор</p>
                    </div>
                    <div className={styles.headerItem}>
                        <div className='pl-5'>
                            <ListIcon type="secondary" />
                        </div>
                        <p className='text text_type_main-default pl-2 pr-5' style={{color: 'rgb(133, 133, 173)', whiteSpace: 'nowrap'}}>
                            Лента заказов
                        </p>
                    </div>
                </div>
                <div className={styles.logo}>
                    <Logo className={styles.logo}/>
                </div>
                <div className={styles.profile}>
                    <div className={styles.headerItem}>
                        <div className='pl-5'>
                            <ProfileIcon type="secondary" />
                        </div>
                        <p className='text text_type_main-default pl-2 pr-5' style={{color: 'rgb(133, 133, 173)'}}>Личный кабинет</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;