function Activity({ activity, onAdd }) {
    return (
        <div>
            <h2>{activity.name}</h2>
            <img src={activity.image} alt={activity.name} />
            <button onClick={() => onAdd(activity)}>Add to List</button>
        </div>
    );
}

export default Activity;