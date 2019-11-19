import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import ListItemsTable from './ListItemsTable.js'
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

    history = () => {
        console.log("history");
    }
    newItem = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        let item = {}
        item.description = "Unknown";
        item.assigned_to = "Unknown";
        item.due_date = today;
        item.completed = false;
        item.key = this.props.todoList.items.length;
        this.props.todoList.items.push(item);
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update(this.props.todoList);
        this.render();
    }

    handleChangeOwner = (event) => {
        this.setListOwner(event.target.value);
    }

    setListOwner = (text) => {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            this.props.todoList.owner = text;
            getFirestore().collection('todoLists').doc(this.props.todoList.id).update(this.props.todoList);
        }
        else
            return "";
    }

    handleChangeName = (event) => {
        this.setListName(event.target.value);
    }

    setListName = (text) => {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            this.props.todoList.name = text;
            getFirestore().collection('todoLists').doc(this.props.todoList.id).update(this.props.todoList);
        }
        else
            return "";
    }

    removeList = () => {
        getFirestore().collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.push('/');
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div class="clearfix">
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
                                <input className="active" type="text" name="name" id="name" onChange={this.handleChangeName} defaultValue={todoList.name} />
                            </div>
                        </div>
                        <div class="col s6">
                            <div className="input-field">
                                <label htmlFor="password">Owner</label>
                                <input className="active" type="text" name="owner" id="owner" onChange={this.handleChangeOwner} defaultValue={todoList.owner} />
                            </div>
                        </div>
                        
                    </div>
                {/* 
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
                    */}
                    <ListItemsTable todoList={todoList} history={this.props.history}/>
                    
                    <div id="new_item" className= "new_item" onClick={this.newItem}>
                        +
                    </div>
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