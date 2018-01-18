import React, { Component } from 'react';
class CountDown extends Component{
    constructor(props){
        super(props);
        this.state={
            year: props.timeInfo.year, // year,month,day,hour,minute,second
            month: props.timeInfo.month,
            day: props.timeInfo.day,
            hour: props.timeInfo.hour,
            minute: props.timeInfo.minute,
            second: props.timeInfo.second,
            count: {},
            isTimeOut: true
        }
        this.onEvent = this.onEvent.bind(this)
    }
    componentWillMount(){
        this.t = setInterval(this.onEvent, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.t);
    }
    onEvent(){
        var leftTime = (new Date(this.state.year,this.state.month-1,this.state.day,this.state.hour,this.state.minute,this.state.second)) - (new Date()); //计算剩余的毫秒数
        if (leftTime > 0) {
            var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
            var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
            var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
            var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
            days = checkTime(days);
            hours = checkTime(hours);
            minutes = checkTime(minutes);
            seconds = checkTime(seconds);
            function checkTime(i){ //将0-9的数字前面加上0，例1变为01
                if(i<10)
                {
                    i = "0" + i;
                }
                return i.toString();
            }
            var count = {
                days,
                hours,
                minutes,
                seconds
            }
            this.setState({
                count,
                isTimeOut: false
            });
        }
        else {
            clearInterval(this.t);
            var count = {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00'
            }
            this.setState({
                count,
                isTimeOut: true
            });
        }
    }
    render(){
        return(
            <div className="count_down">
                <span className="count_down_txt">{this.state.isTimeOut ? '交付时间到:' : '配音交付倒计时:'}</span>
                <div className="countdown">
                    <span className="count_down_time flex">
                        {
                            parseInt(this.state.count.days, 10) ===0 || (
                                <span className="day">
                                    <span className="num">{this.state.count.days && this.state.count.days.charAt(0)}</span>
                                    <span className="num">{this.state.count.days && this.state.count.days.charAt(1)}</span>
                                </span>
                            )
                        }
                        {
                            parseInt(this.state.count.days, 10) === 0 || (<span className="maohao">:</span>)
                        }
                        <span className="hour">
                            <span className="num">{this.state.count.hours && this.state.count.hours.charAt(0)}</span>
                            <span className="num">{this.state.count.hours && this.state.count.hours.charAt(1)}</span>
                        </span>
                        <span className="maohao">:</span>
                        <span className="minute">
                            <span className="num">{this.state.count.minutes && this.state.count.minutes.charAt(0)}</span>
                            <span className="num">{this.state.count.minutes && this.state.count.minutes.charAt(1)}</span>
                        </span>
                        <span className="maohao">:</span>
                        <span className="second">
                            <span className="num">{this.state.count.seconds && this.state.count.seconds.charAt(0)}</span>
                            <span className="num">{this.state.count.seconds && this.state.count.seconds.charAt(1)}</span>
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}
export default CountDown;
