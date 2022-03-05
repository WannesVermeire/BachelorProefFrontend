import React,{Component} from 'react'

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            telNr: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.Login(this.state);
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <form className="form-inner" onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                {/*ERROR! */}
                <div className={"form-group"}>
                    <label htmlFor={"email"}>Email:</label>
                    <input type={"email"} name={"email"} id={"email"} onChange={this.changeHandler} required/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"password"}>Password:</label>
                    <input type={"password"} name={"password"} id={"password"} onChange={this.changeHandler} required/>
                </div>
                <input type="submit" onSubmit={this.handleSubmit} value={"LOGIN"}/>
            </form>
        );
    }
}

export default LoginForm;