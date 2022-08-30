import '../App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from "../components/Context";

function ToDo() {
  const { useState } = React;
  const { token} = useAuth();
  // const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NiIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY2MTgzNzY0MSwiZXhwIjoxNjYzMTMzNjQxLCJqdGkiOiI3MTgwMzI4ZS1iZmQxLTRhY2EtODRmYS1iZmJhNGFmNDRlZDQifQ.R3h1DSpIEeh0Ips_kSjNpGMyc69Z0nTXUBV0dLNL6LU'
  const [todos, setTodos] = useState([]);
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
          />
          <span>{content}</span>
        </label>
        <a
          href="#"
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
                    <input type="text" placeholder="請輸入待辦事項"/>
                    <a href="#">
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
                            <p> {todos.filter((data) => data.completed_at == false).length} 個待完成項目</p>
                            <a href="#">清除已完成項目</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ToDo;
