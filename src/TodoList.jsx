
import { Edit2,Trash2 } from "lucide-react"
function List({task, changeStatus, Edit, Del}){
   return (
       <div key={task.id} className="p-4 hover:bg-gray-50 checked: transition-colors duration-150 flex items-center gap-4">
                            <input onClick={() => changeStatus(task)} checked={task.Completed ? "checked" : ""} type="checkbox" className="w-5 h-5 accent-green-600" />
                            <div className="flex-1">
                                <span className={`text-gray-600 text-lg  ${task.Completed ? "line-through" : ""}`}>
                                    {task.text}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => Edit(task)}
                                    className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-all duration-200"
                                    title="Edit task"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => Del(task.id)}
                                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-all duration-200"
                                    title="Delete task"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
   )
}

export default List