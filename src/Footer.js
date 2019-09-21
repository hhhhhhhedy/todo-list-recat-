import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                   {
                       //判断当未完事项的数量大于0的时候，则显示代办事项，否则，就不显示
                       this.props.uncompletedTotal > 0 ? <div><span>待办项<span className="badge">{this.props.uncompletedTotal}</span>件</span></div> : null
                   }
                </div>
                {/* 设置选中高亮状态 */}
                <div className="col-md-6">
              
                    <button className={"btn " + (this.props.filterType === 'all' ? 'btn-success' : 'btn-default')} onClick={()=>{this.props.getFilterType('all')}}>全部</button>
                    <button className={"btn " + (this.props.filterType === 'completed' ? 'btn-success' : 'btn-default')} onClick={() => {this.props.getFilterType('completed')}}>已完成</button>
                    <button className={"btn " + (this.props.filterType === 'uncompleted' ? 'btn-success' : 'btn-default')}  onClick={() => {this.props.getFilterType('uncompleted')}}>未完成</button>
                </div>
                <div className="col-md-3">
                    {
                        //判断如果完成事项大于0就显示，否则就不显示
                        this.props.completedTotal > 0 ?<div className="btn btn-danger" onClick={()=>{this.props.removeAllHandler()}}>删除已完成</div> : null
                    }
                </div>
            </div>
        )
    }
}
