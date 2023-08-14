const Header = (props) => {
    return(  
        <div>
            <h2>{props.course}</h2>
        </div>
    )
}
  
const Part = (props) => {
    return(
        <div>
            <p>
                {props.parts.name} {props.parts.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    const {parts} = props
    return(
        <div>            
            {parts.map(part => <Part parts={part} />)}
        </div>
    )
}

const Total = (props) => {
    const {parts} = props
    const total = parts.reduce((acumulator, part) => acumulator + part.exercises, 0)
    return(
        <div>
            <strong>total of exercises {total}</strong>
        </div>
    )
}

const Course = (props) => {
    const {course} = props
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course