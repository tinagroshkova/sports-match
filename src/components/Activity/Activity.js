import "./Activity.scss";

function ActivityComponent({ activity, onAdd, added }) {
    const buttonText = added ? "Remove from List" : "Add to List";
    return (
      <div className="activityContainer">
        <h2>{activity.name}</h2>
        <img src={activity.image} alt={activity.name} />
        <button onClick={() => onAdd(activity)}>{buttonText}</button>
      </div>
    );
  }
export default ActivityComponent;