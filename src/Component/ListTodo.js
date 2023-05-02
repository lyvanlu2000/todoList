import React from "react";
import "./ListTodo.scss";
import AddTodo from "./AddTodo";
import { toast } from "react-toastify";

class ListTodo extends React.Component {
  state = {
    listTodo: [
      { id: "todo1", title: "doing home work" },
      { id: "todo2", title: "study hoi dan IT" },
      { id: "todo3", title: "Fixing bug" },
    ],
    editTodo: {},
  };

  addNewTodo = (todo) => {
    this.setState({
      listTodo: [...this.state.listTodo, todo],
    });

    toast.success("Wow so easy!");
  };

  handleDeleteTodo = (todo) => {
    let currentTodo = this.state.listTodo;
    currentTodo = currentTodo.filter((item) => item.id !== todo.id);
    this.setState({
      listTodo: currentTodo,
    });

    toast.success("delete success!");
  };

  handelEditTodo = (todo) => {
    let { editTodo, listTodo } = this.state;
    let isEmptyObj = Object.keys(editTodo).length === 0;
    //save
    if (isEmptyObj === false && editTodo.id === todo.id) {
      let listTodoCopy = [...listTodo];
      let objIndex = listTodoCopy.findIndex((item) => item.id === todo.id);

      listTodoCopy[objIndex].title = editTodo.title;
      this.setState({
        listTodo: listTodoCopy,
        editTodo: {},
      });

      toast.success("Update todo success!");

      return;
    }

    //edit
    this.setState({
      editTodo: todo,
    });
  };

  handleOnchangeEditTodo = (event) => {
    let editTodoCopy = { ...this.state.editTodo };
    editTodoCopy.title = event.target.value;
    this.setState({
      editTodo: editTodoCopy,
    });
  };
  render() {
    let { listTodo, editTodo } = this.state;

    let isEmptyObj = Object.keys(editTodo).length === 0;
    console.log("check emptyobj", isEmptyObj);
    return (
      <div className="cover">
        <p>Danh sách việc cần làm</p>
        <div className="list-todo-container">
          <AddTodo addNewTodo={this.addNewTodo} />
          <div className="list-todo-content">
            <table className="table-todo-list">
              <tr>
                <th>Số thứ tự</th>
                <th>Việc cần làm</th>
                <th>Tùy chỉnh</th>
              </tr>
              {listTodo &&
                listTodo.length > 0 &&
                listTodo.map((item, index) => {
                  return (
                    <tr>
                      <td>
                      {isEmptyObj === true && (
                          <div>
                            {index + 1}
                          </div>
                        )
                      }
                      </td>
                      <td className="todo-child">
                      <div key={item.id}>
                        {isEmptyObj === true ? (
                          <div>
                            {item.title}
                          </div>
                        ) : (
                          <>
                            {editTodo.id === item.id ? (
                              <div>
                                {" "}
                                <input
                                  value={editTodo.title}
                                  onChange={(event) =>
                                    this.handleOnchangeEditTodo(event)
                                  }
                                />
                              </div>
                            ) : (
                              <div>
                                {index + 1} - {item.title}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      </td>
                      <td>
                      <div className="option">
                        <button
                          className="edit"
                          onClick={() => this.handelEditTodo(item)}
                        >
                          {isEmptyObj === false && editTodo.id === item.id ? (
                            "Save"
                          ) : (
                            <i class="fa-sharp fa-solid fa-pen"></i>
                          )}
                        </button>
                        <button
                          className="delete"
                          onClick={() => this.handleDeleteTodo(item)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      </td>
                      
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTodo;
