import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

//const db = getFirestore();
//let key = -1;
class HomeScreen extends Component {
    
    handleNewList = async () => {
        let item = {}
        item.description = "description1";
        item.assigned_to = "assigned_to1";
        item.due_date = "due_date1";
        item.completed = "false";
        item.key = 0;
        let item2 = {}
        item2.description = "description2";
        item2.assigned_to = "assigned_to2";
        item2.due_date = "due_date2";
        item2.completed = "true";
        item2.key = 1;
        //key = key + 1;

        const database = await getFirestore().collection("todoLists").get();
        const key = database.size;

        getFirestore().collection('todoLists').doc(key.toString()).set({
            name: "New List " + (key+1).toString(),
            owner: "Unkown",
            key: key,
            items: [item, item2],
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