// importing useState and useEffect from react

import React,{useState,useEffect} from "react";
import Todo from"./Todo";

const [todo,setTodo]=useState({});
const [todos,setTodos]=useState([]);

useEffect(()=>{
    fetch('https://assets.breatheco.de/apis/fake/todos/user/hectorb')
        .then(function(response){
            if (!response.ok){
                throw Error(response.statusText);
            } 
            return response.json();
        })
        .then(function(resonseAsJson){
            setTodos(resonseAsJson);
        })
        .catch(function(error){
            console.log("looks like there was a problem: \n ",error);
        });
},[]);
const handleChange = e => setTodo({label: e.taget.value, done:false});

//checks for empty todo

const handleclick = e =>{
    setTodo({label:"", done: false});
//fetch api
    fetch ('https://assets.breatheco.de/apis/fake/todos/user/hectorb', {
        method: "PUT", //or post
        body: JSON.stringify(todos.concat(todo)), //data can be 'string' or {object}
        headers:{ 
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(response => console.log("Success:", response))
        .catch(error => console.error("Error:", error));
    setTodos(todos.concat(todo));
}