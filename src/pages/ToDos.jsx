import '../App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth, getLocalUser, getLocalToken } from "../components/Context";

function ToDo() {
  const { useState } = React;
  // const {token, setToken} = useAuth();
  const [todos, setTodos] = useState([]);
  const [inputItem, setInputItem] = useState("");
  const [actTab, setAactTab] = useState("全部");
  const [tab, setTab] = useState([
    { title: "全部", active: true },
    { title: "待完成", active: false },
    { title: "已完成", active: false }
  ]);
  const { nickname} = getLocalUser();
  const { authorization } = getLocalToken()
  // useEffect(() => {
  //   if (token == null){
  //     setToken(authorization)
  //   }
  // }, [])

  function TabTodoListItem() {
    if (actTab == "待完成") {
      return (
        <TodoListItem data={todos.filter((data) => data.completed_at == null)} />
      );
    } else if (actTab == "已完成") {
      return (
        <TodoListItem data={todos.filter((data) => data.completed_at != null)} />
      );
    }
    return <TodoListItem data={todos} />;
  }
  function ListTab(props) {
    const { title, active } = props.item;
    return (
      <li>
        <a
          href="/ToDoList/#/Todo"
          className={active == true ? "active" : ""}
          onClick={() => {
            setAactTab(title);
            setTab(
              tab.map((data) =>
                data.title === title
                  ? { ...data, active: true }
                  : { ...data, active: false }
              )
            );
          }}
        >
          {title}
        </a>
      </li>
    );
  }
  const PostDoTo = async () => {
    if (inputItem.trim() === "") {
      return;
    }
    const _url = "https://todoo.5xcamp.us/todos";
    await fetch(_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': authorization
        },
      body: JSON.stringify({
        todo: {"content":inputItem}
        })
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        setInputItem("")
      })
      await GetData()
  };
  const ToggleDoTo = async (id) => {
    const _url = "https://todoo.5xcamp.us/todos/"+id+"/toggle";
    await fetch(_url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': authorization
        }
      })
      .then(res => {
        return res.json()
      })
      // .then(res =>{
      //   setTodos(
      //     todos.map((data) =>
      //       data.id == id ? res : data
      //     ))
      // })
    // 順序會變動
    await GetData()
  };
  const ClearCompleted = async () =>{
    let completedList = todos.filter((data) => data.completed_at);
    for (const data of completedList) {
      const { id } = data;
      await DeleteDoTo(id);
    }
  }
  const DeleteDoTo = async (id) => {
    const _url = "https://todoo.5xcamp.us/todos/"+id;
    await fetch(_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': authorization
        }
      })
      .then(res => {
        return res.json()
      })
    await GetData()
  };
  const GetData = () => {
    const _url = "https://todoo.5xcamp.us/todos";
    fetch(_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': authorization
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
  function TodoListItem({data}) {
    if (todos.length === 0) {
      return (
        <ul className="todoList_item">
          <p className="todoList_none"> 目前尚無待辦事項</p>
        </ul>
      );
    }
    return (
      <ul className="todoList_item">
        {data.map((item, i) => {
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
          href="/ToDoList/#/Todo"
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
            <h1><a href="/ToDoList/#/Todo">ONLINE TODO LIST</a></h1>
            <ul>
                <li className="todo_sm"><a href="/ToDoList/#/Todo"><span>{nickname}的代辦</span></a></li>
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
                        if (e.keyCode === 13) PostDoTo();
                      }}/>
                    <a href="/ToDoList/#/Todo" onClick={PostDoTo}>
                        <i className="fa fa-plus"></i>
                    </a>
                </div>
                <div className="todoList_list">
                <ul className="todoList_tab">
                  {tab.map((item, i) => {
                    return <ListTab key={i} item={item} />;
                  })}
                </ul>
                    <div className="todoList_items">
                    <TabTodoListItem />
                        <div className="todoList_statistics">
                            <p> {todos.filter((data) => data.completed_at === null).length} 個待完成項目</p>
                            <a href="/ToDoList/#/Todo" onClick={ClearCompleted}>清除已完成項目</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ToDo;
