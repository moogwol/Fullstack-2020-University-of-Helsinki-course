import React, { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')

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
