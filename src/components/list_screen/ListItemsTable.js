import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {

    state = {
        sortTask: true,
        sortDate: true,
        sortStatus: true
      }

    sortingTask = (event) => {
        event.stopPropagation();
        if(this.state.sortTask === true){
            this.props.todoList.items.sort((a, b) => (a.description > b.description) ? 1 : -1);
            this.setState({sortTask: false});
        }else{
            this.props.todoList.items.sort((a, b) => (a.description > b.description) ? -1 : 1)
            this.setState({sortTask: true});
        }
        for (var i = 0; i < this.props.todoList.items.length; i++) {
            this.props.todoList.items[i].key = i;
        } 
    }

    sortingDate = (event) => {
        event.stopPropagation();
        if(this.state.sortDate === true){
            this.props.todoList.items.sort((a, b) => (a.due_date > b.due_date) ? 1 : -1);
            this.setState({sortDate: false});
        }else{
            this.props.todoList.items.sort((a, b) => (a.due_date > b.due_date) ? -1 : 1)
            this.setState({sortDate: true});
        }
        for (var i = 0; i < this.props.todoList.items.length; i++) {
            this.props.todoList.items[i].key = i;
        } 
    }

    sortingStatus = (event) => {
        event.stopPropagation();
        if(this.state.sortStatus === true){
            this.props.todoList.items.sort((a, b) => (a.completed > b.completed) ? 1 : -1);
            this.setState({sortStatus: false});
        }else{
            this.props.todoList.items.sort((a, b) => (a.completed > b.completed) ? -1 : 1)
            this.setState({sortStatus: true});
        }
        for (var i = 0; i < this.props.todoList.items.length; i++) {
            this.props.todoList.items[i].key = i;
        } 
    }

    render() {
        return (
            <div id="list_items_container" className="list_item_header_card">
                <div className="list_item_header_card"></div>
                <div className="list_item_task_header" onClick={this.sortingTask}>Task</div>
                <div className="list_item_due_date_header" onClick={this.sortingDate}>Due Date</div>
                <div className="list_item_status_header" onClick={this.sortingStatus}>Status</div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            goItem={this.props.goItem}
                            key={todoItem.key}
                            listItem={todoItem}
                            todoList={this.props.todoList}
                            loadList={this.props.loadList}
                            history={this.props.history} />
                    ))
                }
            {/*
                <div id="new_item" className= "new_item" onClick={this.newItem}>
                    +
                </div>
            */}
            </div>
            
        )
    }
}

export default ListItemsTable
