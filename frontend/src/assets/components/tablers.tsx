import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface TaskManagerProps {
  className?: string;
  theme?: boolean;
  tableros: any;
}

interface Task {
  id: string;
  content: string;
}

const TaskManager: React.FC<TaskManagerProps> = (props) => {
  const [lists, setLists] = useState<{ name: string; tasks: Task[] }[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editableListIndex, setEditableListIndex] = useState<number | null>(null);
  const [editableTaskId, setEditableTaskId] = useState<string | null>(null);

  const handleAddList = () => {
    setLists([...lists, { name: '', tasks: [] }]);
    setEditableListIndex(lists.length);
  };

  const handleEditListName = (listIndex: number) => {
    setEditableListIndex(listIndex);
  };

  const handleSaveListName = (listIndex: number) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].name = lists[listIndex].name;
    setLists(updatedLists);
    setEditableListIndex(null);
  };

  const handleAddTask = (listIndex: number) => {
    if (newTask.trim() !== '') {
      const taskItem: Task = {
        id: Date.now().toString(),
        content: newTask,
      };
      const updatedLists = [...lists];
      updatedLists[listIndex].tasks.push(taskItem);
      setLists(updatedLists);
      setNewTask('');
    }
  };

  const handleEditTask = (taskId: string) => {
    setEditableTaskId(taskId);
  };

  const handleBlurTask = (listIndex: number, taskId: string) => {
    if (editableTaskId === taskId) {
      const updatedLists = [...lists];
      const taskIndex = updatedLists[listIndex].tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        updatedLists[listIndex].tasks[taskIndex].content = updatedLists[listIndex].tasks[taskIndex].content;
        setLists(updatedLists);
        setEditableTaskId(null);
      }
    }
  };

  const handleRemoveTask = (listIndex: number, taskId: string) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].tasks = updatedLists[listIndex].tasks.filter((task) => task.id !== taskId);
    setLists(updatedLists);
  };

  const handleRemoveList = (listIndex: number) => {
    const updatedLists = [...lists];
    updatedLists.splice(listIndex, 1);
    setLists(updatedLists);
  };

  const onDragEnd = (result: DropResult | null) => {
    if (!result || !result.destination) {
      return;
    }

    const { source, destination } = result;
    const sourceListIndex = source.droppableId;
    const destinationListIndex = destination.droppableId;

    if (sourceListIndex === destinationListIndex) {
      const listIndex = parseInt(sourceListIndex, 10);
      const updatedLists = [...lists];
      const [removed] = updatedLists[listIndex].tasks.splice(source.index, 1);
      updatedLists[listIndex].tasks.splice(destination.index, 0, removed);
      setLists(updatedLists);
    } else {
      const sourceListIndexNum = parseInt(sourceListIndex, 10);
      const destinationListIndexNum = parseInt(destinationListIndex, 10);

      const sourceTask = lists[sourceListIndexNum].tasks[source.index];
      const updatedLists = [...lists];
      updatedLists[sourceListIndexNum].tasks.splice(source.index, 1);
      updatedLists[destinationListIndexNum].tasks.splice(destination.index, 0, sourceTask);
      setLists(updatedLists);
    }
  };

  return (
    <div className={`${props.className} overflow-x-auto h-screen`}>
      <div className="flex w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='w-auto'>
            <div className="overflow-x">
              <div className="flex">
                {lists.map((list, listIndex) => (
                  <div key={listIndex} className={`${props.theme ? 'bg-[#FFFFDD] text-darkmode-verdeagua1' : 'bg-[#91C8E4] text-lightmode-azul'} w-auto rounded-md p-4 m-7`}>
                    {editableListIndex === listIndex ? (
                      <div className='List-name flex pb-2'>
                        <input
                          className=' bg-[#ADC4CE] rounded text-[#000]'
                          type="text"
                          placeholder="List Name"
                          value={list.name}
                          onChange={(e) => {
                            const updatedLists = [...lists];
                            updatedLists[listIndex].name = e.target.value;
                            setLists(updatedLists);
                          }}
                        />
                          <button className='pl-2' onClick={() => handleSaveListName(listIndex)}> + </button>
                      </div>
                    ) : (
                      <h2 className='font-bold pb-2' onClick={() => handleEditListName(listIndex)}>{list.name || 'List Name'}</h2>
                    )}
                    <div className='flex pb-2 overflow-auto'>
                      <input
                        className='list-task bg-[#ADC4CE] rounded text-[#000] overflow-y'
                        type="text"
                        placeholder="Add Task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                      <button className='m-1' onClick={() => handleAddTask(listIndex)}> + </button>
                    </div>
                    <Droppable droppableId={listIndex.toString()} key={listIndex}>
                      {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                          {list.tasks.map((task, taskIndex) => (
                            <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                              {(provided) => (
                                <li className='text-[#1F4287] mb-3 p-1 bg-[#F1F0E8] rounded-lg'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {editableTaskId === task.id ? (
                                    <div>
                                      <input
                                        type="text"
                                        value={task.content}
                                        onBlur={() => handleBlurTask(listIndex, task.id)}
                                        onChange={(e) => {
                                          const updatedLists = [...lists];
                                          const taskIndex = updatedLists[listIndex].tasks.findIndex((t) => t.id === task.id);
                                          if (taskIndex !== -1) {
                                            updatedLists[listIndex].tasks[taskIndex].content = e.target.value;
                                            setLists(updatedLists);
                                          }
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div className='flex justify-between'>
                                      <span onDoubleClick={() => handleEditTask(task.id)}>{task.content}</span>
                                      <button className='text-[#1F4287] ml-24' onClick={() => handleRemoveTask(listIndex, task.id)}>
                                        -
                                      </button>
                                    </div>
                                  )}
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                    <button className='text-xs' onClick={() => handleRemoveList(listIndex)}> Delete </button>
                  </div>
                ))}
                <div className={`flex h-14 items-center rounded-md p-9 m-7 ${props.theme ? 'bg-[#FFFFDD] text-darkmode-verdeagua1' : 'bg-[#91C8E4] text-lightmode-azul'} `}>
                  <button className='flex items-center p-2 text-[#1F4287]' onClick={handleAddList}>+ Add List</button>
                </div>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskManager;
