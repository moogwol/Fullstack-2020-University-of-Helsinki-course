import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/Persons'

import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')

  // Get persons json from the server
  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      // set the initial state of the persons list
      setPersons(response.data)
    })
  }


  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    // Create a new person Object
    const personObject = {
      name: newName,
      number: newNumber
    }
    // Check to see if the newName is already in the persons list
    if (persons.some(person => person.name === personObject.name)) {
      alert(`${personObject.name} is already in the phonebook`)
    }
    else {
      // Add the newName to the phonebook
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }
  // Updates newName as the form data changes
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    console.log(event.target.value)
    setNameSearch(event.target.value)
  }
  // Filter the names according to the input
  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(nameSearch))
  const showPhonebook = () => namesToShow.map(person =>
     <li key={person.name}>{person.name} {person.number}</li>
   )



  console.log('new name:', newName)
  console.log('new number:', newNumber)
  console.log('namesToShow', namesToShow)
  console.log('search:', nameSearch)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={nameSearch} handle={handleNameSearch}/>

      <h3>Add New</h3>
      <PersonForm onSubmit={addName}
                  nameValue={newName}
                  nameOnChange={handleNewName}
                  numberValue={newNumber}
                  numberOnChange={handleNewNumber}
      />

      <h3>Numbers</h3>

      <Persons listFunc={showPhonebook()} />

    </div>
  )
}

export default App
