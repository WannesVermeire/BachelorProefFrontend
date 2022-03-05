import React,{Component} from 'react'

class RegisterForm extends Component{
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
        this.props.Register(this.state);
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <form className="form-inner" onSubmit={this.handleSubmit} >
                <h2>Register</h2>
                <div className={"form-group"}>
                    <label htmlFor={"firstName"}>First Name:</label>
                    <input type={"text"} name={"firstName"} id={"firstName"} onChange={this.changeHandler} required/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"lastName"}>Last Name:</label>
                    <input type={"text"} name={"lastName"} id={"lastName"} onChange={this.changeHandler} required/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"email"}>Email:</label>
                    <input type={"email"} name={"email"} id={"email"} onChange={this.changeHandler} required/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"telNr"}>Tel:</label>
                    <input type={"text"} name={"telNr"} id={"telNr"} onChange={this.changeHandler} required/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"password"}>Password:</label>
                    <input type={"password"} name={"password"} id={"password"} onChange={this.changeHandler} required/>
                </div>
                <input type="submit" onSubmit={this.handleSubmit} value={"REGISTER"}/>
            </form>
        );
    }
}

export default RegisterForm;