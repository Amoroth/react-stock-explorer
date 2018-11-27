import React from 'react'
import { withRouter } from 'react-router-dom'

import styles from './shared.module.css'

const pageTitle = (props) => {
  return (
    <div className={styles['title-bar']}>
      <div style={{ display: 'flex' }}>
        <img
          src={props.logo}
          height={56}
          alt={`${props.name}'s logo`}
          style={{ maxWidth: '100px' }}
        />
        <div>
          <h6>{ props.name }</h6>
          <span>{ props.exchange }: { props.symbol }</span>
        </div>
      </div>
      <button onClick={ () => props.history.push('/') }>
        <i className="material-icons md-48">arrow_back</i>
      </button>
    </div>
  )
}

export default withRouter(pageTitle)
