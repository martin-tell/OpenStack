import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()
      
  const style = {
    marginBottom: 20
  }
    
  return (
    <div style={style}>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(setFilter('ALL'))}
      />
      no votes
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(setFilter('NO_VOTES'))}
      />
      most voted
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(setFilter('MOST_VOTED'))}
      />
    </div>
  )
}

export default Filter