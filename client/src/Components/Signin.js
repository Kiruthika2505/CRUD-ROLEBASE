import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Signin() {

    localStorage.clear();

    const handlesubmit = async (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = { headers: { "enctype": "multipart/form-data" } };

        await axios.post("http://localhost:3002/Signin", datastring, config)
            .then(function (res) {
                if (res.data.status === 'syntax_error') {
                    alert('Contact Admin');
                    window.location.reload();
                }
                else if (res.data.status === 'success') {
                    let id = res.data.id;
                    let role = res.data.role;
                    let firstname=res.data.firstname;
                    if (role === 'Admin') {
                        alert(role);
                        localStorage.setItem('empid', id);
                        window.location.href = "/Admin_dash";
                    }
                    else if (role === 'User') {
                        alert(role);
                        let id=res.data.id;
                        let username=res.data.username
                        localStorage.setItem("id",id);
                        localStorage.setItem("firstname",firstname);
                        window.location.href = "/User_dash";
                    }
                    else if (role === 'Employer') {
                        alert(role);
                        localStorage.setItem('empid', id);
                        window.location.href = "./Employer_dash";
                    }
                }
                else if (res.data.status === 'Invalid_details') {
                    alert('Invalid user details');
                    window.location.reload();
                }
                else {
                    alert('Contact Admin');
                    window.location.reload();
                }
            })
            .catch(function (error) {
                alert(error);
                window.location.reload();
            })

    }

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-lg-4">&nbsp;</div>
                    <div className="col-lg-4">
                        <form onSubmit={handlesubmit}>
                            <div className="table-responsive">
                                <table width="100%" className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colspan="2">Sign-In Page</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Username</td>
                                            <td>
                                                <input type="text" name="username" id="username" className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Password</td>
                                            <td>
                                                <input type="password" name="password" id="password" className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link to="/Signup">
                                                    <button type="button" name="data_send" id="data_send" value="send" className="btn btn-danger">Sign-up</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button type="submit" name="data_submit" id="data_submit" value="submit" className="btn btn-success">Sign-in</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4">&nbsp;</div>
                </div>
            </div>
        </>
    );
}