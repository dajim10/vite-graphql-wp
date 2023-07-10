import React from 'react'

const Arit = ({endPoint}) => {
  return (
      <div>
      <iframe src={endPoint} frameBorder="0" style={{width:'100vw',height:'100vh'}}></iframe>
      </div>
  )
}

export default Arit