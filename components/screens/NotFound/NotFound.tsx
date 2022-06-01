import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import styles from './NotFound.module.scss'

export const NotFound = () => {
  return (
    <section className="not-found">
        <div className={classNames('container', styles.container)}>
            <h1 className={classNames('g-title', styles.title)}>404. Страница не найдена</h1>
            <p className={styles.desc}>Возможно, она была перемещена, или вы просто неверно указали адрес страницы.</p>
            <Link href='/'>
                <a className={classNames('g-btn g-btn--dark', styles.link)}>Вернуться на главную</a>
            </Link>
        </div>
    </section>
  )
}