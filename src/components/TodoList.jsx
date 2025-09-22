import { Edit2,Trash } from "lucide-react";
function List({task,changeStatus,Edit,Del}){
    return(
        <div key={task.id}>
            <input onClick={()=>changeStatus(task)} checked={task.Completed?'checked':''} type="checkbox" />
            <div>
                <span>
                    {task.text}
                </span>
            </div>
            <div>
                <button onClick={()=>Edit(task)}><Edit/></button>
                
                <button onClick={()=>Del(task.id)}><Trash/></button>
            </div>
            
        </div>
    )
}

export default List