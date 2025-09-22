import React,{useState,useEffect} from 'react';
import {plus} from 'lucide-react'
import {v4 as uuidv4} from 'uuid'
function TodoApp() {
    const [Task,setTask] = useState([])
    const [inputval,setInputVal] = useState("")
    const [button,setButton] = useState("add")
    const [selectedtask,setSelectedTask] = useState(null)
    const [message,setMessage] = useState("")
    const [messageType,setMessageType] = useState("")

    const Add = () =>{
        if(button==='Update'){
            const exist = Task.some(
                (t)=>t.text.toLowerCase().trim() === inputval.toLowerCase().trim()
            );
            if(exist){
                setMessage("Duplicate Found. Not Added.")
                setMessageType("info")
                return;
            }
            if(inputval.trim()===""){
                setMessage("No values Entered")
                setMessageType("info")
                setButton('add')
                return 
            }
            const isValid = /^[a-zA-Z0-9]+$/.test(inputval.trim())
            if(!isValid){
                setMessage("❌ Task should contain only letters and numbers")
                setMessage('error')
                return;
            }
            if(selectedtask){
                const updated = Task.map((t)=>{
                    t.id = selectedtask.id?{...t,text:inputval}:t
                })
            }
        }
    }
}

export default TodoApp
