import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Item from './Item.js';
import Footer from './Footer.js';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //底部已完成/未完成/全部模块，根据用户点击的项返回不同的数据，定义一个状态，默认是all,即显示全部
            filterType: 'all',
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
    //用户输入事项完成后回车添加到this.state.todos里，并重新渲染页面
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
    //勾选状态的处理
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
    //点击单项右侧删除按钮，删除当前项
    removeHandler=(item) =>{
        console.log(item);
        var todos = this.state.todos;
        //filter方法会把结果为true的保存起来，过滤掉结果为false的数据。同样不会改变原数组，也不会对空数组进行检测
        var newTodos = todos.filter((ele)=>{
            return item !== ele
        });
        this.setState({todos:newTodos});
    }
    //删除已完成事项
    removeAllHandler = ()=>{
        var todos = this.state.todos;
        var newTodos = todos.filter(item =>{
            return !item.completed;
        })
        this.setState({todos:newTodos})
    }
    //子组件调用方法的时候，会把当前状态传过来，重置state里的FilterType
    getFilterType=(data) =>{
        this.setState({
            filterType:data
        })
    }
    render() {
        //底部代办事项的显示。写在render里面，每次页面一刷新就会自动渲染。
        var todos = this.state.todos;
        //reduce方法用来计算元素相加，接收一个函数作为累加器，至少需要2个参数，counter是每次计算结束后的返回值，item是当前元素，0是初始值
        //举个例子var a=[1,2,3,4],reduce的计算方法是初始值+第一个元素，即0+1，返回一次计算结果并保存，第二次计算就会拿上一次保存下来的结果去累加第二个元素，即1+2，再次保存并返回结果
        //一直到当前项的最后一个元素，并return出最终结果。
        var uncompletedTotal = todos.reduce((counter,item) => {
            //判断当前元素的勾选框状态，如果为true就加0，如果为false就累加1.
            return counter +(item.completed ? 0:1)
        },0);
        //完成事项=总事项数-未完成事项数
        var completedTotal = this.state.todos.length -uncompletedTotal;

        //处理用户选择事项的状态
        var filterTods = this.state.todos.filter((item) =>{
            switch(this.state.filterType){
                case 'completed':
                    return item.completed;
                case 'uncompleted':
                    return !item.completed;
                default:
                    return item;
            }
        });
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
                                       filterTods.map((ele, index) => {
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
                                <Footer filterType={this.state.filterType} getFilterType={this.getFilterType} uncompletedTotal={uncompletedTotal} removeAllHandler={this.removeAllHandler} completedTotal={completedTotal}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}