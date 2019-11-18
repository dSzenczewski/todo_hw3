import React, { Component } from 'react'

export class ListItemCard extends Component {
    getIndex(){
        this.props.goItem(this.props.listItem.key, false);
    }

    moveUp(e){
        e.stopPropagation();
        if(this.props.listItem.key === 0){
            //nothing
        }else{
            let temp1 = this.props.todoList.items[this.props.listItem.key];
            let temp2 = this.props.todoList.items[this.props.listItem.key-1];
            this.props.todoList.items[this.props.listItem.key] = temp2;
            this.props.todoList.items[this.props.listItem.key-1]= temp1;
            for (var i = 0; i < this.props.todoList.items.length; i++) {
                this.props.todoList.items[i].key = i;
            } 
            this.props.loadList(this.props.todoList);
        }
        
    }

    moveDown(e){
        e.stopPropagation();
        if(this.props.listItem.key < this.props.todoList.items.length-1){
        let temp1 = this.props.todoList.items[this.props.listItem.key];
        let temp2 = this.props.todoList.items[this.props.listItem.key+1];
        this.props.todoList.items[this.props.listItem.key] = temp2;
        this.props.todoList.items[this.props.listItem.key+1]= temp1;
        for (var i = 0; i < this.props.todoList.items.length; i++) {
            this.props.todoList.items[i].key = i;
        } 
        this.props.loadList(this.props.todoList);
        }else{
            //nothing
        }
        
    }

    delete(e){
        e.stopPropagation();
        console.log(this.props);
        this.props.todoList.items.splice(this.props.listItem.key, 1);
        for (var i = 0; i < this.props.todoList.items.length; i++) {
            this.props.todoList.items[i].key = i;
        } 
        this.props.loadList(this.props.todoList);
        
    }

    editItem = () => {
        var index = this.props.listItem.key;
        var key = this.props.todoList.key;
        this.props.history.push('/item/' + key.toString() + '/' + index.toString());
    }


    render() {
        return (
            <div className='list_item_card' onClick={this.editItem}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                
                {/* <div className='list_item_card_completed'>
                    {this.props.listItem.completed ? "Completed" : ""}
                </div>

                <div className='list_item_card_not_completed'>
                {this.props.listItem.completed ? "" : "Pending"}
                </div> */}
                {this.props.listItem.completed ? (
                    <div className='list_item_card_completed'>Completed</div> ) :
                ( <div className='list_item_card_not_completed'>Pending</div>)}
                {/* 
                <div className="list_item_card_toolbar">
                    <div className={this.props.listItem.key === 0 ? "list_item_header_card_disabled" : "list_item_header_card"} id={"move_up"+ this.props.listItem.key} onClick={this.moveUp.bind(this)}>&#11014;</div>
                    <div className={this.props.listItem.key < this.props.todoList.items.length-1 ? "list_item_header_card" : "list_item_header_card_disabled"} id={"move_down" + this.props.listItem.key} onClick={this.moveDown.bind(this)}>&#11015;</div>
                    <div className="list_item_header_card" id={"delete"+ this.props.listItem.key} onClick={this.delete.bind(this)}>X</div>
                </div>
                 */}
            </div>
        )
    }
}

export default ListItemCard
