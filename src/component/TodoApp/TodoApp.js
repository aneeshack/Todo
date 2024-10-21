import React, { Component } from "react";
import "../TodoApp/TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    isEditing:false,
    currentItemIndex: null,
    editedValue: "",
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input } = this.state;

    this.setState({
      items: [...this.state.items, input],
      input: "",
    });
  };


  deleteItem = (index) => {
    this.setState({
      items: this.state.items.filter((data, key) => index !== key),
    });
  };

  enableEditMode = (index)=>{
    this.setState({
      isEditing:true,
      currentItemIndex: index,
      editedValue:this.state.items[index],
    })
  }

  handleEditChange = (event)=>{
    this.setState({
      editedValue:event.target.value
    })
  }

  saveEditedItem =(event, index) =>{
    event.preventDefault();
    const { items, editedValue } = this.state;
    const updateItems = [...items];
    updateItems[index] = editedValue;

    this.setState({
      items :updateItems,
      isEditing: false,
      editedValue:"",
      currentItemIndex: null
    })
  }

  render() {
    const { input, items, isEditing, currentItemIndex, editedValue } = this.state;
    return (
      <div className="todo">
        <div className="todo-container">
          <form className="input-section" onSubmit={this.storeItems}>
            <h1>Todo App</h1>
            <input
              type="text"
              value={input}
              onChange={this.handleChange}
              placeholder="Enter items..."
            />
          </form>

          <ul>
            {items.map((data, index) => {
              return (
                <li key={index}>
                  {isEditing && currentItemIndex === index ? (
                    <form onSubmit={(event)=> this.saveEditedItem(event,index)} className="editing">
                      <input type="text" value={editedValue} onChange={this.handleEditChange} className="edit-input"/>
                      <button title="save" type="submit"><i class="fa-solid fa-floppy-disk" ></i></button>
                    </form>
                  ): (
                    <>
                    {data}
                  <div className="icons">
                    
                    <i
                      className="fas fa-edit "onClick={()=>this.enableEditMode(index)}
                    ></i>
                    <i
                      className="fas fa-trash"
                      onClick={() => this.deleteItem(index)}
                    ></i>
                  </div>
                  </>
                  )}
                  
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
