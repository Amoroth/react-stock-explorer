import React from 'react'
import { css } from 'emotion'

/* eslint-disable jsx-a11y/anchor-is-valid */

const header = (props) => {
  return (
    <nav className={style}>
      <div>
        <h6>Stock Explorer!</h6>
      </div>
      <div className={navStyle}>
        <a href="#" style={{ borderBottom: '5px solid #fff' }}>Place One</a>
        <a href="#">Place Two</a>
      </div>
    </nav>
  )
}

const style = css({
  alignItems: 'center',
  // backgroundColor: '#2f2f2f',
  backgroundColor: '#344955',
  display: 'flex',
  height: 62,
  justifyContent: 'space-between',
  position: 'fixed',
  top: 0,
  width: '100%',
  'h6': {
    color: '#fff',
    fontSize: 22,
    margin: '0 15px'
  },
})

const navStyle = css({
  height: '100%',
  margin: '0 15px',
  'a': {
    color: '#fff',
    display: 'inline-block',
    height: '100%',
    lineHeight: '60px',
    marginLeft: 15,
    position: 'relative',
    textDecoration: 'none'
  },
  '@media screen and (max-width: 640px)': {
    visibility: 'hidden',
  }
})

export default header