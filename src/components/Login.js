import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Alert from './Alert';




const Login = () => {
  let Navigate = useNavigate();

  const [logindata, setlogindata] = useState({ email: "", password: "" })


  const getValue = (e) => {

    setlogindata({ ...logindata, [e.target.name]: e.target.value })
  }




  const handleClick = async (e) => {

    e.preventDefault()
    const response = await fetch(
      "http://localhost:80/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",

        },
        body: JSON.stringify({ email: logindata.email, password: logindata.password }),
      }
    );


    const json = await response.json();
    console.log(json)

    if (json.success) {
      <Alert message={json.msg}/>
      console.log("mohit")
      localStorage.setItem("token", json.authtoken)
      Navigate("/")



    } else {
      <Alert message={json.msg}/>
    }
  }
  return (
    <>

      <div className="container">

        <div className="row justify-content-center">
          <div className="col-lg-4 border mt-4 border-success p-4">







            <form onSubmit={handleClick} >
              <div className="mb-3 " >
                <h1 className='text-center'>Login </h1>
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input autoComplete="given-email" type="email" name='email' onChange={getValue} value={logindata.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name='password' className="form-control" onChange={getValue} value={logindata.password} id="password" autoComplete="given-password" />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
