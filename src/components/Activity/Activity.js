import "./Activity.scss";

function ActivityComponent({ activity, onAdd, added, onRemove }) {
  const addButtonText = added ? "Remove from List" : "Add to List";
  const removeButtonText = "Remove from Profile";

  return (
    <div className="activityContainer">
      <h2>{activity.name}</h2>
      <img src={activity.image} alt={activity.name} />
      {onAdd && <button onClick={() => onAdd(activity)}>{addButtonText}</button>}
      {onRemove && <button onClick={() => onRemove(activity)}>{removeButtonText}</button>}
    </div>
  );
}

export default ActivityComponent;
