import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

export default function Login() {
  return (
    <main className="flex text-[#CFF5E7] min-h-screen items-center justify-center p-24 text-center bg-white">
      <div className="bg-[#1F4287] rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-1/2 p-5">
          {/* Sign in */}
          <div className='text-left bg-[#1F4287] font-bold'>
            <span className=''>Tareas</span>
          </div>
          <div className='py-10 bg-[#1F4287]'>
            <h2 className="text-3xl font-bold mb-4">Sign in to account</h2>
            <div className="border-2 w-10 h-1 border-blue-500 inline-block mb-4"></div>
            <div className='flex justify-center my-2'>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 hover:scale-110 transform transition hover:bg-blue-500 hover:text-white hover:border-blue-100'><FaFacebookF className='text-sm'/></a>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 hover:scale-110 transform transition hover:bg-blue-500 hover:text-white hover:border-blue-100'><FaLinkedinIn className='text-sm'/></a>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 hover:scale-110 transform transition hover:bg-blue-500 hover:text-white hover:border-blue-100'><FaGoogle className='text-sm'/></a>
            </div>
            {/* Social Login */}
            <p className='text-gray-400 my-3'>or use your email account</p>
            <div className='flex flex-col items-center'>
              <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                <FaRegEnvelope className='text-gray-800 m-2'/>
                <input type="email" name='email' placeholder='Email' className='bg-gray-100 outline-none text-sm flex-1'/> {/* Fixed text-sn to text-sm */}
              </div>
              <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                <MdLockOutline className='text-gray-800 m-2'/>
                <input type="password" name='password' placeholder='Password' className='bg-gray-100 outline-none text-sm flex-1'/> {/* Fixed text-sn to text-sm */}
              </div>
              <div className='flex justify-between w-64 mb-5'>
                <label className='flex items-center text-xs' htmlFor=""><input type="checkbox" name='remember' className='mr-1' />Remember me</label>
                <a href="#" className='text-xs'>Forgot Password</a>
              </div>
              <a
                href="#"
                className="bg-blue-500 text-white rounded-full px-6 py-2 font-semibold 
                hover:bg-white hover:text-blue-500 hover:border-blue-200 border-2 border-blue-500 transition"
              >
                Sign In
              </a>
            </div>
          </div>          
        </div>
        <div className="bg-[#278EA5] w-1/2 text-white rounded-tr-2xl rounded-br-2xl py-20 px-12">
          {/* Sign up */}
          <h2 className="text-3xl font-bold mb-4">Hello!</h2>
          <div className="border-2 w-10 h-1 border-white inline-block mb-4"></div>
          <p className="mb-6">
            Fill up personal information and start your journey with us.
          </p>
          <a
            href="#"
            className="bg-white text-blue-500 rounded-full px-6 py-2 font-semibold hover:bg-blue-500 hover:text-white hover:border-blue-100 border-2 border-white transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </main>
  );
}