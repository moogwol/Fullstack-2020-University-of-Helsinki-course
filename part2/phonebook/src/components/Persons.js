import React from 'react'

const Persons = (props) => {

  return(

    <div>
      <ul>
        {/*{namesToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}*/}
        {props.listFunc}
      </ul>
    </div>


  )
}


export default Persons
