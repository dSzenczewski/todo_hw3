import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    newItem = () => {
        let item = {}
        item.description = "unknown";
        item.assigned_to = "unknown";
        item.due_date = "unknown";
        item.completed = "false";
        item.key = this.props.todoList.items.length;
        this.props.todoList.items.push(item);
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update(this.props.todoList);
        this.render();
    }

    removeList = () => {
        console.log("TRASH");
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <div class="row">
                    <div class="col s6">
                        <h5 className="grey-text text-darken-3">Todo List</h5>
                    </div>
                    <div class="col s6">
                        <div id="list_trash" onClick = {this.removeList}>&#128465;</div>
                    </div>  
                </div>
                
                <div class="row">
                    <div class="col s6">
                        <div className="input-field">
                            <label htmlFor="email">Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                        </div>
                    </div>
                    <div class="col s6">
                        <div className="input-field">
                            <label htmlFor="password">Owner</label>
                            <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                        </div>
                    </div>
                    
                </div>
               
                <div class="container">
                    <div class="row">
                            <div class="col s3">
                                <div className="card-content grey-text text-darken-3">
                                    <span className="card-title">Description</span>
                                </div>
                            </div>
                            <div class="col s3">
                                <div className="card-content grey-text text-darken-3">
                                    <span className="card-title">Assigned To</span>
                                </div>
                            </div>
                            <div class="col s3">
                                <div className="card-content grey-text text-darken-3">
                                    <span className="card-title">Due Date</span>
                                </div>
                            </div>
                            <div class="col s3">
                                <div className="card-content grey-text text-darken-3">
                                    <span className="card-title">Status</span>
                                </div>
                            </div>
                        </div>
                 </div>
                <ItemsList todoList={todoList} />
                <div id="new_item" className= "new_item" onClick={this.newItem}>
                    +
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);