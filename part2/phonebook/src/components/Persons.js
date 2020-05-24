import React from 'react'

const Persons = (props) => {

  return(

    <div>
      <ul>
        {props.listFunc}
      </ul>
    </div>


  )
}


export default Persons
