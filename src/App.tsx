import React, { FC, useState, ChangeEvent } from 'react'; //FC means type functional component
 import './App.css';
import TodoTask from './Components/TodoTask';
 import { ITask } from './Interfaces'

const App : FC = () => {

  const [task, setTask] = useState<string>("") 
  const [deadline, setDeadline] = useState<number>(0) 

  // we need to make this a list of objects
  // and each task will be an object
  // so it will be something like:
  // {
  //   taskName: "Do hw"
  //   deadline: 5
  // }
  // Hence we need to define a type for this object for a task and for this reason
  // we will use an interface
  const [todoList, setTodoList] = useState<ITask[]>([]) 

  //just a function whenever there is any change 
  // every function in TS needs to have a return type
  // in this function because we are not returning anything
  // hence the return type will be void 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) : void => {
    // if the input that is calling this change function is the task one  
    // then we want to set task = event.target.value
    // or else if it is not the task one then we know that
    // it will be the deadline one as we only have 2 events happening 
    if (event.target.name === "task") {
      setTask(event.target.value)
    } else {
      // it is giving an error because 
      // we are trying to set something that probably returns a string 
      // so it is basically a string that has a set of numbers in it 
      // hence we will convert this into a number and we will do this by 
      // wrapping it around a parenthesis
      // so this will convert a string to a number 
        setDeadline(Number(event.target.value))
    }
  }

  // write a function that will be called when you click on the Add Task button
  // lets thing about what we actually want to do?
  // we have a state which is actually an array 
  // so we just want to add the next task to this array
  
  const addTask = () : void => {
    // so here we are just grabbing the state for task and deadline 
    // and we are putting them into an object 
    // and calling them newTask 
    const newTask ={
      taskName: task,
      deadline: deadline
    }
    // we are setting the todo list to the old todo list and then
    // we are adding the new task to it 
    setTodoList([...todoList, newTask])
    setTask("")
    setDeadline(0)
  }

  // the arguement in the function is the name of the task that we want to delete
  const completeTask = (taskNameToDelete: string) : void => {
    // we will say that we want to set our todo list to be itself
    // and filter everything inside of it 
    // that has a name equal to the name that we pass inside this function
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  }

  // so the above code will go through every element in the list 
  // and if the taskname is not equal to the task name in the function
  // then it will keep that inside our list and return it 



  return (
    <div className="App">

      <div className='header'>
        {/* to make it on top of one another, rather than in line with one another ->
        i will wrap it in 1 div */}
        <div className='inputContainer'> 
        <input type="text" placeholder='Write a task' name="task" value={task} onChange={handleChange} />
        <input type="number" 
        placeholder='Should be done by when?' 
        name="deadline"
        value={deadline}
        onChange={handleChange}
        />
        <button onClick={addTask}> Add Task </button>
      </div>

      </div>

      <div className='todoList'>

    {/* we map through every element in the list and then display each element on our screen */}
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask}
           />
        })}

      </div>

    </div>
  );
}

export default App;
