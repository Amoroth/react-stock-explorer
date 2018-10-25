import React from 'react'
import { css } from 'emotion'

/* eslint-disable jsx-a11y/anchor-is-valid */

const header = (props) => {
  return (
    <nav className={style}>
      <div>
        <h6>Stock Explorer Header!</h6>
      </div>
      <div className={navStyle}>
        <a href="#">Place One</a>
        <a href="#">Place Two</a>
      </div>
    </nav>
  )
}

const style = css({
  alignItems: 'center',
  backgroundColor: '#2f2f2f',
  boxSizing: 'border-box',
  display: 'flex',
  height: 60,
  justifyContent: 'space-between',
  position: 'fixed',
  top: 0,
  width: '100%',
  'h6': {
    color: '#fff',
    fontSize: 22,
    margin: '0 15px'
  },
  'a': {
  }
})

const navStyle = css({
  boxSizing: 'border-box',
  margin: '0 15px',
  'a': {
    marginLeft: 15,
    position: 'relative',
    color: '#fff',
    textDecoration: 'none'
  }
})

export default header