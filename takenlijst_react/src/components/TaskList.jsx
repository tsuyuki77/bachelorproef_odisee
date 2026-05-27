import TaskItem from './TaskItem';

function TaskList({ taken, onRemove, onToggle, onUpdate }) {
  const items = [];
  for (let i = 0; i < taken.length; i++) {
    items.push(<TaskItem key={taken[i].id} taak={taken[i]} onRemove={onRemove} onToggle={onToggle} onUpdate={onUpdate}/>);
  }

  return (
    <div>
      <ul>{items}</ul>
      {taken.length === 0 && <p>Nog geen taken.</p>}
    </div>
  );
}

export default TaskList;
