import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Update() {

    const { id } = useParams();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [location,setLocation]=useState('');
    const [descript,setDescript]=useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        fetch("http://localhost:3002/Update/" + id + "")
            .then(response => response.json())
            .then(function (res) {
                setFirstname(res[0].firstname);
                setLastname(res[0].lastname);
                setEmail(res[0].email);
                setMobile(res[0].mobile);
                setLocation(res[0].location);
                setDescript(res[0].descript);
                setPassword(res[0].password);
            })
            .catch(function (error) {
                alert(error);
                window.location.href = "/";
            })

    }, [])

    const handlesubmit = async (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = { headers: { "enctype": "multipart/form-data" } };

        await axios.put('http://localhost:3002/updatedata/' + id + '', datastring, config)
            .then(function (res) {
                if (res.data.status === 'error') {
                    alert('error');
                    window.location.href = "/";
                }
                else if (res.data.status === 'Success') {
                    alert('Updated');
                    window.location.href = "/";
                }
            })
            .catch(function (err) {
                alert(err);
                window.location.href = "/";
            })
    }

    return (
        <div className='container'>

            <div className='row col-lg-12'>
                <div className='col-lg-12 text-center'>
                    <h3>Registration Form</h3>
                </div>
            </div>
            <form onSubmit={handlesubmit}>

                <div className="table-responsive">
                    <table width="100%" className="table table-bordered">
                        <thead>
                            <tr>
                                <th colspan="2">Signup</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Firstname</td>
                                <td>
                                    <input type="text" name="firstname" id="firstname" value={firstname} onChange={(e)=>setFirstname(e.target.value)} className="form-control" required />
                                </td>
                            </tr>
                            <tr>
                                <td>Lastname</td>
                                <td>
                                    <input type="text" name="lastname" id="lastname" value={lastname} onChange={(e)=>setLastname(e.target.value)} className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>Mobile</td>
                                <td>
                                    <input type="number" name="mobile" id="mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>
                                    <input type="text" name="location" id="location" value={location} onChange={(e)=>setLocation(e.target.value)} className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>
                                    <input type="text" name="descript" id="descript" value={descript} onChange={(e)=>setDescript(e.target.value)} className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" />
                                </td>
                            </tr>
                            <tr>
                               
                                <td>
                                    <button type="submit" name="data_submit" id="data_submit"
                                        value="submit" className="btn btn-success">Update</button>
                                </td>
                                <td>
                                    <Link to="/User_dash">
                                        <button type="button" name="data_send" id="data_send" value="send" className="btn btn-danger">
                                            Go Back
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </form>
        </div>
    )
}