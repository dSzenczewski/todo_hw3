import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {
    editItem = () => {
        console.log("Edit" + this.props.item.key);
        //this.props.history.push('/item');
    }
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div class="container" onClick={this.editItem}>
                    <div class="row">
                        <div class="col s3">
                            <div className="card-content grey-text text-darken-3">
                                <span className="card-title">{item.description}</span>
                             </div>
                        </div>
                        <div class="col s3">
                            <div className="card-content grey-text text-darken-3">
                                <span className="card-title">{item.assigned_to}</span>
                             </div>
                        </div>
                        <div class="col s3">
                            <div className="card-content grey-text text-darken-3">
                                <span className="card-title">{item.due_date}</span>
                             </div>
                        </div>
                        <div class="col s3">
                            <div className="card-content grey-text text-darken-3">
                                <span className="card-title">{item.completed}</span>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default ItemCard;