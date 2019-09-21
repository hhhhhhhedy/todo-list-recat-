import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Item from './Item.js';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: 1,
                    content: '吃饭',
                    completed: false
                },
                {
                    id: 2,
                    content: '睡觉',
                    completed: false
                },
                {
                    id: 3,
                    content: '打豆豆',
                    completed: true
                }
            ]
        }
    }
    keyUpHandler = (event) => {
        //设置用户按下回车键的时候把填写的内容渲染到页面上展示
        var code = event.keyCode;
        //当键码值等于13，并且输入内容不为空的时候，才执行页面渲染
        if (code === 13 && event.target.value.trim().length > 0) {
            var todo = {
                id: Math.random(),
                content: event.target.value.trim(),
                completed: false
            };
            //es6语法，...是扩展运算符，用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
            //把新旧数据一起组成的数组[{}]再赋值给this。state里面的todos。页面会重新渲染
            this.setState({
                todos: [...this.state.todos, todo]
            })
            //当回车以后把新添加的数据添加到页面上，并把当前input的value值清空
            event.target.value = " ";
        }
    }
    checkHandler = (item) => {
        //console.log(item);
        var todos = this.state.todos;
        //map方法返回一个新数组，但是并不会改变原数组，所以想要得到处理后的结果，就需要return出去，定义一个新数组去接收return的值
        var newTodos = todos.map((ele) => {
            if (ele === item) {
                ele.completed = !ele.completed
            }
            return ele;
        })
        //把this.state.todos更改成新的数组
        this.setState({ todos: newTodos })
    }
    removeHandler=(item) =>{
        console.log(item);
        var todos = this.state.todos;
        //filter方法会把结果为true的保存起来，过滤掉结果为false的数据。同样不会改变原数组，也不会对空数组进行检测
        var newTodos = todos.filter((ele)=>{
            return item !== ele
        });
        this.setState({todos:newTodos});
    }
    render() {
        return (
            <div className="container">
                <h1 className="text-center">React-TODO</h1>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                <h4>TODO</h4>
                                <hr />
                                <input type="text" className="form-control" onKeyUp={this.keyUpHandler} />
                            </div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {
                                        this.state.todos.map((ele, index) => {
                                            return (
                                                //把循环遍历的ele，作为属性值传递给子组件item，todo是自定义的属性名
                                                <Item key={index} todo={ele} checkHandler={this.checkHandler}
                                                    removeHandler={this.removeHandler} />
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div><span>待办项<span className="badge">X</span>件</span></div>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-default">全部</button>
                                        <button className="btn btn-default">已完成</button>
                                        <button className="btn btn-default">未完成</button>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="btn btn-danger">删除已完成</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}