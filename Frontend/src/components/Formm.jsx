import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState, useContext, createContext} from 'react'
import Context, { contextData } from './Context';
import LinearProgress from '@mui/material/LinearProgress';

// import dataContext = use


function Formm() {

  // const dataa = createContext({});
  axios.defaults.withCredentials = true


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [leetcode ,setLeetcodehandle] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const datafromContext = useContext(contextData);
  const { formData, setFormData } = datafromContext;
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    
    e.preventDefault();
    setLoading(true);

    try {

    const response = await axios.post('https://cp-analyze.vercel.app/api/submit', {
      email: email,
      password: password,
      leetcode: leetcode
    });

    if(response.status === 200) {
      setError("");
      localStorage.setItem("dat", JSON.stringify({
        data: response.data
      }))
      setFormData(response.data);
      setLoading(false);
      navigate('/cp/codeforces');
      // console.log(response.data);
    }
    else {
      setLoading(false);
      setError(response.data.message);

    }
  }

  catch(err) {
    console.log(err)
    setLoading(false);
    setError(err.response.data.message);
  }

    
   
    // console.log(response);
    setEmail("");
    setPassword("");
  }

    return (
        <>
        { loading && <LinearProgress />}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            // alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {/* Sign in to your account */}
          </h2>
        </div>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={submit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Codeforces Handle
              </label>
              <div className="mt-2">
                <input
                  id="codeforces"
                  name="codeforces"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  value={email}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="codechef" className="block text-sm font-medium leading-6 text-gray-900">
                  Codechef Handle
                </label>
                {/* <div className="text-sm">
                  <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="codechef"
                  name="codechef"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  value={password}
                />
              </div>
            </div>

            

            <div>
              <label htmlFor="leetcode" className="block text-sm font-medium leading-6 text-gray-900">
              LeetCode Handle
              </label>
              <div className="mt-2">
                <input
                  id="leetcode"
                  name="leetcode"
                  type="text"
                  autoComplete="leetcode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                  onChange={(e) => {
                    setLeetcodehandle(e.target.value)
                  }}
                  value={leetcode}
                />
              </div>
            </div>

            <div className="error ">
            {error && <p className="text-red-500">{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {/* Not a member?{' '} */}
            <Link to="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              {/* Start a 14 day free trial */}
            </Link>
          </p>
        </div>
      </div>
        </>
    )

    
}

// export async function  submit(data) {
//     const d = await data.request.formData();
//     const orData = Object.fromEntries(d);
//     console.log(orData);
//     console.log("Hello");
//     // return redirect('/');
// }



export default Formm;

