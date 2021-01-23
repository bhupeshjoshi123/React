import React,{Component} from 'react';
import Joi from 'joi-browser';
import Input from "./input";
import Select from "./select";


class Form extends Component {

      validate=()=>{
       //return {username: "Username is required "} 
       const options = {abortEarly: false};
       const {error} = Joi.validate(this.state.data,this.schema, options);
       //maping array to objects
       //console.log(result);
        if(!error) return null;

        const  errors ={}
        
        for (let item of error.details)
                errors[item.path[0]] = item.message;
             return errors;
    } 

      validateProperty = (name , value) =>{

        const obj = {[name]: value}
        const schema = {[name] : this.schema[name]}

        const {error} = Joi.validate (obj , schema);
        return error ? error.details[0].message : null;
        
        /*if(input.name === 'username'){
            if(input.value.trim() ==='') return 'Username is Required';
        }
        if(input.password === 'password'){
            if(input.value.trim() ==='') return 'password is Required';
        }*/
    }  
    handleSubmit = e =>{
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}})
        if (errors) return 

        this.doSubmit();
        }

    handleChange = ({currentTarget: input}) =>{
    const {name , value} = input;
    const errors = {...this.state.errors}
    const errorMessage = this.validateProperty(name , value);
    if(errorMessage) errors[name]=errorMessage;
    else delete errors[name];

    const data = {...this.state.data};
    data[name] = value;
    data[name] = value;
    this.setState({data,errors})
    }

    renderButton=(label)=>{
       return( <button 
                disabled = { this.validate()} 
                className = "btn btn-primary">{label}</button>);
    }
    renderSelect(name , label , options){
        const{data,errors} = this.state;

        return(
            <Select
            name = {name}
            value = {data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            errors={errors[name]}
            />
        )
    }
    renderInput=(name , label , type = 'text')=>{
        const {data,errors}=this.state

        return (<Input
                type = {type}
                name={name}
                label={label}
                onChange={this.handleChange}
                value={data[name]}
                error = {errors[name]}
                />);
    }
 
}


export default Form;