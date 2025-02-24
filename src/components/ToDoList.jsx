import {useState, useEffect} from "react";
import '../css/ToDoList.css'

// Note to future-self, make sure to import your css file to have it update

function ToDoList() {

    //const [state, setState] = useState()
    // example, we have a state, and a way to set that state
    // inside useState() we can have an array [] to hold our states

    // hold our tasks
    // before useEffect was implemented for storing data: useState([]);
    // useState instead of using an array, will call a function for to retrieve an array
    const [tasks, setTasks] = useState([]);
    // will hold our input for our new task
    const [newTask, setNewTask] = useState("");


    //useEffect will store our tasks into (of our choosing) local/session storage
    // local storage persists between sessions, sessions only within current browser session (lost on refresh)


    //store data
    useEffect(() => {
        // write to json file, this also forces us to update our useState

        //so if tasks is empty, it will write to the local storage, causing the local storage to be empty
        //this might happen because the data retrieval might not have happened yet
        if(tasks.length === 0) return;
        localStorage.setItem("task", JSON.stringify(tasks));
    }, [tasks])


    //retrieve data
    useEffect(() => {

        const storedTasks = JSON.parse(localStorage.getItem("task"));

        setTasks(storedTasks);

    }, [])



    function handleInputChange(event) {
        setNewTask(event.target.value);
    }


    function addTask() {
        //we will be updating our tasks state

        // check to make sure our string is not empty
        if (newTask.trim() !== "") {
            // update our array of tasks, with new task
            setTasks(t => [...t, newTask]);
            //reset our newtask string
            setNewTask("");
        }

    }

    function removeTask(index) {
        //remove index from tasks
        // then update tasks

        //this is saying if value is not in the array, remove it
        // apprently you can use an underscore _ instead of elements, to signify its not in use
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        // check current position to make sure its not already at the top
        if (index > 0) {
            // we will be reordering our setTasks
            const updatedTasks = [...tasks];
            //there is apparently no built in swap function
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            // update our tasks using setTasks
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            // we will be reordering our setTasks
            const updatedTasks = [...tasks];

            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            // update our tasks using setTasks
            setTasks(updatedTasks);
        }
    }


    return (<>
            <div className="to-do-list">
                <h1>TO DO LIST</h1>

                <div>
                    <input className={"input-text"} type={"text"} placeholder={"Enter Task..."} value={newTask}
                           onChange={handleInputChange} /*the value we type in will be our newTask value,
                       and handleInputChange does what it says*//>

                    <button
                        className={"add-button"}
                        onClick={addTask} /*on click will reference a function*/>
                        Add Task
                    </button>

                </div>

                <div>
                    <ol>
                        {tasks.map((task, index) => (
                            /*here is where we create our list*/
                            /*this is java called inside the html*/

                            <li key={index}>
                                <span className={"task-text"}> {task}</span>
                                <button className={"delete-button"}
                                        onClick={() => removeTask(index)}>Remove Task
                                </button>
                                <button className={"move-up-button"}
                                        onClick={() => moveTaskUp(index)}>Move Up
                                </button>
                                <button className={"move-down-button"}
                                        onClick={() => moveTaskDown(index)}>Move Down
                                </button>
                            </li>
                        ))}

                    </ol>
                </div>
            </div>


        </>
    )
}


export default ToDoList