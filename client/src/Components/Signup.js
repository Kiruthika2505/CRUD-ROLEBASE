import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Signup() {

    const handlesubmit = async (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = { headers: { "enctype": "multipart/form-data" } };

        await axios.post("http://localhost:3002/Signup", datastring, config)
            .then(function (a) {
                if (a.data.status === 'error') {
                    alert('SQL Syntax error.contact admin');
                    window.location.href = "/";
                }
                else if (a.data.status === 'success') {
                    alert('Account Created');
                    window.location.href = "/";
                }
                else {
                    alert('Contact Admin');
                    window.location.href = "/";
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
                                            <th colspan="2">Signup</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Signup type</td>
                                            <td>
                                                <select name="role" id="role" className="form-control">
                                                    <option value="">--choose--</option>
                                                    <option value="User">User</option>
                                                    <option value="Employer">Employer</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Firstname</td>
                                            <td>
                                                <input type="text" name="firstname" id="firstname" className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Lastname</td>
                                            <td>
                                                <input type="text" name="lastname" id="lastname" className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>
                                                <input type="email" name="email" id="email" className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mobile</td>
                                            <td>
                                                <input type="number" name="mobile" id="mobile" className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Location</td>
                                            <td>
                                                <input type="text" name="location" id="location" className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td>
                                                <input type="text" name="descript" id="descript" className="form-control" />
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
                                                <Link to="/">
                                                    <button type="button" name="data_send" id="data_send" value="send" className="btn btn-danger">
                                                        Sign-in
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button type="submit" name="data_submit" id="data_submit"
                                                    value="submit" className="btn btn-success">Sign-up</button>
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
    )
}