import React from 'react'

const Courses = ({ courses }) => {

  return (
    courses.map(course =>
      <div key={course.id}>
        <h1>{course.name}</h1>
        <ul style={{listStyleType: "none"}}>
            {course.parts.map(part =>
            <li key={part.id}>{part.name} {part.exercises}</li>)}
        </ul>
        <strong>total of {course.parts.map(part => part.exercises).reduce((a,b) => a +b)} exercises</strong>
      </div>
    )
  )
}


export default Courses
