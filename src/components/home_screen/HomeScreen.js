import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

//const db = getFirestore();
let key = -1;
class HomeScreen extends Component {
    
    handleNewList = () => {
        console.log("HURRAY");
        let item = {}
        item.description = "unknown";
        item.assigned_to = "unknown";
        item.due_date = "unknown";
        item.completed = "false";
        item.key = 0;
        key = key + 1;
        getFirestore().collection('todoLists').doc(key.toString()).set({
            name: "Unknown",
            owner: "Unkown",
            key: key,
            items: [item],
        });
        this.render();
    }    

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const createTodoList = todoList => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const { profile } = getState().firebase;
    const authorId = getState().firebase.auth.uid;
    fireStore.collection('todoLists').add({
      ...todoList,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId,
      createdAt: new Date(),
    }).then(() => dispatch({
      type: 'CREATE_TODO_LIST',
      todoList,
    })).catch(err => dispatch({
      type: 'CREATE_TODO_LIST_ERROR',
      err,
    }));
  };
  
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);