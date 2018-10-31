import React from 'react'
import { css } from 'emotion'

const panel = (props) => {
  return (
    <div className={style}>
      <h6>Title</h6>
      <p>Some content</p>
    </div>
  )
}

const style = css({
  backgroundColor: '#fff',
  boxShadow: '2px 4px 10px rgba(0,0,0,.0125)',
  padding: 16,
  width: '48%',
  maxWidth: 720,
  margin: '4px 4px 4px 4px',
  transition: 'box-shadow .1s ease-in-out',
  borderRadius: '5px',
  'h6': {
    margin: 0,
    fontSize: 21,
    fontWeight: 'bold',
  },
  'p': {
    margin: '10px 0 0 0',
    fontSize: 15
  },
  '&:hover': {
    boxShadow: '2px 4px 10px rgba(0,0,0,.1)',
  },
  '@media screen and (max-width: 620px)': {
    width: '100%',
    maxWidth: '97%'
  }
})

export default panel