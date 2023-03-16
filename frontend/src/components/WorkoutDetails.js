const WorkoutDetails = ({ workout }) => {

    const handleClick = async () => {
        const res=await fetch('/api/workouts/'+workout._id,{
            method:'DELETE'
        })
        const json=await res.json()
        if(!res.ok){

        }else{
            dispatchEvent({type:'DELETE_WORKOUT',payload:json})
        }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>DEL</span>
        </div>
    )
}

export default WorkoutDetails