import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Hello = props => {
  const [number, setNumber] = useState(0);
  const [textLength, setTextLength] = useState(0);

  return (
    <>
      <div>Hello {props.name}! {props.age} {number}</div>
      <button onClick={() => setNumber(number + 1)}>+1</button>
      <button onClick={() => setNumber(number - 1)}>-1</button>
      <br />
      <p>{textLength}</p>
      <textarea onChange={e => setTextLength(e.target.value.length)}></textarea>
    </>
  );
}

Hello.defaultProps = {
  name: 'David',
  age: 20,
}

Hello.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
