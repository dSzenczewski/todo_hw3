import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { getFirestore } from 'redux-firestore';

//const db = getFirestore().collection('todoLists');

export class ItemScreen extends Component {
    state = {
        todoItem: {},
        desc: "",
        assign: "",
        date: "",
        check: true
    }

    submit = async () => {
        if(this.state != null){
            if(this.state.desc != null) this.state.todoItem.description = this.state.desc;
            if(this.state.assign != null) this.state.todoItem.assigned_to = this.state.assign;
            if(this.state.date != null) this.state.todoItem.due_date = this.state.date;
            if(this.state.check != null) this.state.todoItem.completed = this.state.check;
        }
        const key = this.props.match.params.key;
        const index = this.props.match.params.index;
        const db = await getFirestore().collection("todoLists").doc(key.toString()).get();
        const items = db.data().items;
        items[index].description = this.state.desc;
        items[index].assigned_to = this.state.assign;
        items[index].due_date = this.state.date;
        items[index].completed = this.state.check;

        getFirestore().collection("todoLists").doc(key.toString()).update({items: items});
        this.props.history.push('/todoList/' + key.toString());
        
    }

    cancel = () => {
        console.log(this.props);
        if(this.props.newItem){
            
            this.props.todoList.items.pop();
        }
        var key = this.props.match.params.key;
        this.props.history.push('/todoList/' + key.toString());
    }

    getName = () => {
        
        //var temp = db.doc(key.toString());
        
    }

    description = (event) => {
        console.log("YAY");
        this.setState({desc: event.target.value});
    }

    assigned = (event) => {
        this.setState({assign: event.target.value});
    }

    date = (event) => {
        this.setState({date: event.target.value});
    }

    check = (event) => {
        console.log("CLICKED");
        this.setState({check: event.target.checked});
    }

    componentWillMount = async () => {
        const key = this.props.match.params.key;
        const index = this.props.match.params.index;
        const db = await getFirestore().collection("todoLists").doc(key.toString()).get();
        this.setState({todoItem: db.data().items[index]});
        this.setState({
            desc: this.state.todoItem.description,
            assign: this.state.todoItem.assigned_to,
            date: this.state.todoItem.due_date,
            check: this.state.todoItem.completed
        });
    }
    render() {
        return (
            <div id="todo_item" class="item_info">
            <div id="list_item">
                    <span id="list_item">Item: </span>
                    <span id="list_item_index"></span>
            </div>
            <div id="list_description_container">
                <div id="list_item_card_description" class="text_toolbar">
                    <span id="LIST_ITEM_CARD_DESCRIPTION" class="info">Description:</span>
                    <input type="text" id="list_description_textfield" onChange={this.description} defaultValue={this.state.todoItem.description} class="textBox"/>
                </div>
                <div id="list_assigned_to_container" class="text_toolbar">
                        <span id="LIST_ITEM_CARD_ASSIGNED_TO" class="info">Assigned to:</span>
                        <input type="text" id="list_assigned_to_textfield" onChange={this.assigned} defaultValue={this.state.todoItem.assigned_to} class="textBox"/>
                        
                </div>
                <div id="list_date_container" class="text_toolbar">
                        <span id="list_item_due_date" class="info">Due Date:</span>
                        <input type="date" id="list_date_picker" onChange={this.date} defaultValue={this.state.todoItem.due_date} class="textBox"/>
                        
                </div>
                <div id="list_completed_container" class="text_toolbar">
                        <span id="list_item_completed" class="info">Completed:</span>
                        <input type="checkbox" id="list_checkbox" onClick={this.check} defaultChecked={this.state.todoItem.completed}/>
                        
                </div>
                <div id="buttons_container">
                        <button id="submit" onClick={this.submit}>Submit</button>
                        <button id="cancel" onClick={this.cancel}>Cancel</button>
                </div>
                
            </div>
            <div id="list_items_container">
            </div>
        </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
