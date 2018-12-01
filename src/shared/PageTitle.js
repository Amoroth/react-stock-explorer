import React from 'react'
import { withRouter } from 'react-router-dom'

import SmallSpinner from './SmallSpinner'
import styles from './shared.module.css'

const pageTitle = (props) => {
  const onTitleClick = () => {
    if (props.link) {
      props.history.push(`/company?cmp=${props.symbol}`)
    }
  }

  const onBackClick = () => {
    if (props.link) {
      props.history.push('/')
    } else {
      props.history.goBack()
    }
  }

  return (
    <div className={styles['title-bar']}>
      <div style={{ display: 'flex' }}>
        {props.logo ? 
        <img
          src={props.logo}
          height={56}
          alt={`${props.name}'s logo`}
          style={{ maxWidth: '100px' }}
        /> :
        <SmallSpinner />}
        <div>
          <h6
            onClick={ onTitleClick }
            className={ props.link ? styles['title-link'] : null }
            style={{ cursor: props.link ? 'pointer' : 'default' }}
          >
            { props.name }
            { props.link
              ? <i className={'material-icons'} style={{color: 'gray', marginLeft: 10}}>info</i>
              : null }
          </h6>
          <span>{ props.exchange }: { props.symbol }</span>
        </div>
      </div>
      <button onClick={ onBackClick }>
        <i className="material-icons md-48">arrow_back</i>
      </button>
    </div>
  )
}

export default withRouter(pageTitle)
