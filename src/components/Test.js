import { Component } from "react";

class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            hell:""
        }
    }

    hello = async () => {
        const url = "http://localhost/test";
        const ajax = await fetch(url);
        const response = await ajax.text();
        this.setState({"hell":response});
    }

    componentDidMount(){
        this.hello();
    }

    render() {
        return(
            <div>
                <div id="hello">{this.state.hell}</div>
            </div>
        )
    }
}
export default Test;
