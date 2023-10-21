import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {

    let Navigate = useNavigate();

    const [logindata, setlogindata] = useState({ name:"", email: "", password: "" })
  
  
    const getValue = (e) => {
  
      setlogindata({ ...logindata, [e.target.name]: e.target.value })
    }
  
  
  
  
    const handleClick = async (e) => {
  
      e.preventDefault()
      const response = await fetch(
        "http://localhost:80/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
  
          },
          body: JSON.stringify({ name:logindata.name, email: logindata.email, password: logindata.password }),
        }
      );
  
  
      const json = await response.json();
      console.log(json)
  
      if (json.success) {
        console.log("mohit")
        localStorage.setItem("token", json.authtoken)
        Navigate("/")
  
  
  
      } else {
        alert("invalid credentials")
      }
    }
    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-lg-4 border mt-4 border-success p-4">

                    <form  onSubmit={handleClick} >
                            <h1 className='text-center'>SignUp  </h1>
                    <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name='name' className="form-control" value={logindata.name} onChange={getValue} id="name" autoComplete="given-name" />
                        </div>
                        <div className="mb-3 " >
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" name='email' className="form-control" value={logindata.email}  onChange={getValue}id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="given-email" />
                            <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name='password' className="form-control" value={logindata.password} onChange={getValue} id="password" autoComplete="given-password" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
