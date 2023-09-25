import React, { useState, useEffect } from 'react'
import personService from "./services/persons"
import "./index.css"

const Filter = (props) => {
  const {filter, handleFilterChange} = props
  return(
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange}/>
    </div>  
  )
}

const PersonForm = (props) => {
  const {addPerson, newName, handleNameChange, newNumber, handleNumberChange} = props
  return(
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = (props) => {
  const {id, name, phone, removePerson} = props
  return(
    <div>      
      <p>{name} {phone} <button type='summit' onClick={() => removePerson(id, name)}>delete</button></p>                  
    </div>
  )
}

const Persons = (props) => {
  const {persons, removePerson} = props
  return(
    <div>
      {persons.map(person => <Person key={person.id} id={person.id} name={person.name} phone={person.number} removePerson={removePerson}/>)}
    </div>
  )
}

const Notification = (props) => {
  const {message, className} = props
  if(message === null)
    return null

  return(
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewPhone ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    console.log("effect")
    personService
      .getAll()
      .then(response => {
        console.log("promise fulfilled")
        setPersons(response)
      })      
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const new_person = {name: newName, number: newNumber}
    const p = persons.find(person => person.name === new_person.name)
    if(p){
      personService
      .update(p.id, new_person)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.name !== new_person.name ? person : returnedPerson))
          setNewName('')
          setNewPhone('')
          setSuccessMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
        })
        .catch(error => {      
          setPersons(persons.filter(person => person.name !== new_person.name))
          setErrorMessage(`${new_person.name} was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
      })
    }else{
      personService
      .create(new_person)
      .then(returnedPerson => {
        const new_persons = persons.concat(returnedPerson)
        setPersons(new_persons)
        setNewName('')
        setNewPhone('')
        setSuccessMessage(`Added ${new_person.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
        console.log(`Se agrego la persona ${returnedPerson.name}`);
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    const text = event.target.value;
    console.log(text);   
    setNewFilter(text);
  }

  const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const removePerson = (id, nombre) => {
    const election = window.confirm(`Delete ${nombre}?`)
    if(election){
      personService.remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(`Se elimino la persona ${returnedPerson}`);
        })
        .catch(error => {
          setErrorMessage(`${nombre} hasn't been removed successfully`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className={"success"}/>
      <Notification message={errorMessage} className={"error"}/>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App