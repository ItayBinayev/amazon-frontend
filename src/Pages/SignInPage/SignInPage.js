import {useContext, useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from'react-router-dom'
import { Button } from'react-bootstrap'
import { Container, Form } from 'react-bootstrap'
import { Title } from '../../Components/Title/Title'
import { Store } from '../../Context/Store'
import axios from 'axios'
import { USER_SIGNIN } from '../../Reducers/Actions'
import { toast } from'react-toastify';

export const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl? redirectInUrl : '/';

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;
    
    useEffect(() => {
    userInfo && navigate(redirect);
    }, [navigate, redirect, userInfo])
    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post("/users/signin", {email, password});
            ctxDispatch({type: USER_SIGNIN, payload: data});
            navigate(redirect);
        }
        catch(error){
            toast.error(error.message, {
                theme: "colored",
                hideProgressBar: true,
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
        }
    }

  return (
    <>
    <Container className='small-container'>
        <Title>Sign In</Title>
        <h1 className='my-3'>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" required placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit" >Sign In</Button>
            </div>
            <div className='mb-3'>New Customer? <Link to={`/signup?redirect=${redirect}`}>Create New Account</Link></div>
        </Form>
    </Container>
    </>
  )
}
