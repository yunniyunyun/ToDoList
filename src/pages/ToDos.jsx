import '../App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from "../components/Context";

function ToDo() {
  const { useState } = React;
  const { token} = useAuth();
  const [todos, setTodos] = useState([]);
  const [inputItem, setInputItem] = useState("");
  const PostDoTo = () => {
    if (inputItem.trim() === "") {
      return;
    }
    const _url = "https://todoo.5xcamp.us/todos";
    fetch(_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
        },
      body: JSON.stringify({
        todo: {"content":inputItem}
        })
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        setTodos([...todos, {id:res.id, content:res.content, completed_at:null}])
        setInputItem("")
      })
  };
  const ToggleDoTo = (id) => {
    const _url = "https://todoo.5xcamp.us/todos/"+id+"/toggle";
    fetch(_url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
        }
      })
      .then(res => {
        return res.json()
      })
      .then(res =>{
        setTodos(
          todos.map((data) =>
            data.id == id ? res : data
          ))
      })
  };
  // 無法清除全部
  const ClearCompleted = () =>{
    let completedList = todos.filter((data) => data.completed_at);
    setTodos(todos.filter((data) => data.completed_at == null))
    for (const data of completedList) {
      const { id } = data;
      DeleteDoTo(id);
    }
  }
  const DeleteDoTo = (id) => {
    const _url = "https://todoo.5xcamp.us/todos/"+id;
    fetch(_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
        }
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        setTodos(todos.filter((data) => data.id != id))
      })
  };
  const GetData = () => {
    const _url = "https://todoo.5xcamp.us/todos";
    fetch(_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        setTodos(res.todos)
      })
  };
  useEffect(() => {
    GetData()
  }, [])
  function TodoListItem() {
    if (todos.length == 0) {
      return (
        <ul className="todoList_item">
          <p className="todoList_none"> 目前尚無待辦事項</p>
        </ul>
      );
    }
    return (
      <ul className="todoList_item">
        {todos.map((item, i) => {
          return <ListItem key={i} item={item} />;
        })}
      </ul>
    );
  }
  function ListItem(props) {
    const { id, content, completed_at } = props.item;
    return (
      <li>
        <label className="todoList_label">
          <input
            className="todoList_input"
            type="checkbox"
            value="true"
            checked={completed_at}
            onChange={() => {
              ToggleDoTo(id);
            }}
          />
          <span>{content}</span>
        </label>
        <a
          href="/ToDoList#/Todo"
          onClick={() => {
            DeleteDoTo(id);
          }}
        >
          <i className="fa fa-times"></i>
        </a>
      </li>
    );
  }
  return (
    <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>
            <ul>
                <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
                <li><a href="#loginPage">登出</a></li>
            </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
            <div className="todoList_Content">
                <div className="inputBox">
                    <input type="text" placeholder="請輸入待辦事項" value={inputItem} 
                      onChange={(e) => {
                        setInputItem(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        if (e.keyCode == 13) PostDoTo();
                      }}/>
                    <a href="/ToDoList#/Todo" onClick={PostDoTo}>
                        <i className="fa fa-plus"></i>
                    </a>
                </div>
                <div className="todoList_list">
                    <ul className="todoList_tab">
                        <li><a href="#" className="active">全部</a></li>
                        <li><a href="#">待完成</a></li>
                        <li><a href="#">已完成</a></li>
                    </ul>
                    <div className="todoList_items">
                    <TodoListItem  />
                        <div className="todoList_statistics">
                            <p> {todos.filter((data) => data.completed_at == null).length} 個待完成項目</p>
                            <a href="/ToDoList#/Todo" onClick={ClearCompleted}>清除已完成項目</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ToDo;
