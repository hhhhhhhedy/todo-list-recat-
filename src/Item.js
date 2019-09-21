import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
export default class Item extends Component {
    //子组件用this.props.todo来接收父组件传递过来的属性，后面接的todo就是父组件自定义传递过来的属性。
    render() {
        return (
            <li className="list-group-item">
                <input type="checkbox" onChange={() => {this.props.checkHandler(this.props.todo)}} checked={this.props.todo.completed}/>
                <span>{this.props.todo.content}</span>
                <button className="btn btn-danger btn-xs pull-right" onClick={()=>{this.props.removeHandler(this.props.todo)}}>&times;</button>
            </li>
        )
    }
}

