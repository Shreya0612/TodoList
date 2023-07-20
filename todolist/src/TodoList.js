import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

export default function TodoList() {
  const [checked, setChecked] = useState([0]);
  const [todoValue, setTodoValue] = useState("");
  const [list, setList] = useState([]);
  const [editList, seteditList] = useState(false);
  const [editId, seteditId] = useState("");

  useEffect(() => {
    setTodoValue(JSON.parse(localStorage.getItem("todo-list")));
  }, []);
  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    setList((prev) => {
      return prev.map((item) => {
        if (item.title === value) {
          return { ...item, status: "Completed" };
        } else {
          return item;
        }
      });
    });
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleEdit = (list) => {
    setTodoValue(list.title);
    seteditId(list.id);
    seteditList(true);
  };
  const handleDescription = () => {
    if (todoValue !== "") {
      const _obj = { id: uuidv4(), title: todoValue, status: "Pending" };
      setList((preList) => [...preList, _obj]);
      setTodoValue("");
    }
  };
  const handleEditDescription = () => {
    setList((prev) => {
      return prev.map((item) => {
        if (item.id === editId) {
          return { ...item, title: todoValue };
        } else {
          return item;
        }
      });
    });
    seteditList(false);
    setTodoValue("");
  };
  console.log("listlistlistlist", list);
  return (
    <>
      <div className='todo-input'>
        <label>
          <div className='label-desc'>Descrption:</div>
          <TextField
            id={todoValue ? "outlined-basic" : "outlined-error"}
            value={todoValue}
            label={todoValue === "" ? "Please Enter task" : "Todo task"}
            variant='outlined'
            onChange={(event) => setTodoValue(event.target.value)}
            error={todoValue === "" && true}
          />
        </label>
        <div className='add-button'>
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              if (editList) {
                handleEditDescription();
              } else {
                handleDescription();
              }
            }}>
            Add Descrition
          </Button>
        </div>
      </div>
      <div className='list-div'>
        <div className='list-box'>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {list.map((list, item) => {
              console.log("list-------->", list, item);
              const labelId = `checkbox-list-label-${list.title}`;

              return (
                <ListItem key={list.id} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(list.title)}
                    dense>
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={checked.indexOf(list.title) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        disabled={list.status === "Completed"}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${list.title}`} />
                  </ListItemButton>

                  <div className='button-div'>
                    <div
                      className={
                        list.status === "Completed"
                          ? "status"
                          : "status-pending"
                      }>
                      <label>{list.status}</label>
                    </div>
                    <div className='edit-btn'>
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() => {
                          handleEdit(list);
                        }}
                        disabled={list.status === "Completed"}>
                        Edit
                      </Button>
                    </div>
                    <div className='delete-btn'>
                      <Button
                        size='small'
                        variant='outlined'
                        color='error'
                        onClick={() => {
                          setList((preList) =>
                            preList.filter((obj) => obj.id !== list.id)
                          );
                        }}
                        disabled={list.status === "Completed"}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </>
  );
}
