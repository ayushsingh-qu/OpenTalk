import { Link , useNavigate} from "react-router"
import Logo from "../components/Logo"
import { useState, type ChangeEvent , useEffect } from "react"
import { z } from "zod"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAppDispatch , useAppSelector } from "../hooks/typehooks"
import { signup } from "../slice/Auth/AuthSlice"


type SignUp = {
  name: string
  email: string
  password: string
}

interface LabelInputType {
  label: string
  type?: string
  placeHolder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const signupSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  password: z.string().trim().min(6, "Password must be at least 6 characters")
})

const LabelInput = ({
  label,
  type = "text",
  placeHolder,
  value,
  onChange
}: LabelInputType) => {
  return (
    <div className="w-full p-2">
      <label
        htmlFor={label}
        className="font-bold px-2 py-2 text-white"
      >
        {label}
      </label>

      <input
        id={label}
        type={type}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        className="px-4 py-2 bg-(--bg-main) w-full rounded-xl outline-none mt-1 border border-transparent focus:border-(--primary-color)"
      />
    </div>
  )
}

const Signup = () => {
  const navigate = useNavigate()
  const {isAuthenticated , loading ,error } = useAppSelector((state)=>state.auth)
  const dispatch = useAppDispatch()
  const [postInputs, setPostInput] = useState<SignUp>({
    name: "",
    email: "",
    password: ""
  })

    useEffect(() => {
      if (isAuthenticated) {
        setPostInput({
              name:"",
              email:"",
              password:""
          })
          toast.success("Logged in Successfully");
          navigate("/");
      }
  
    }, [isAuthenticated]);
  
    useEffect(() => {
      if (error) {
          toast.error(error);
      }
    }, [error]);
    
  const handleSignup = async () => {

    const validation = signupSchema.safeParse(postInputs)

    if (!validation.success) {

      validation.error.issues.forEach((err) => {
        toast.error(err.message)
      })

      return;
    }
    dispatch(signup(validation.data)); 
  }

  return (
    <div className="bg-(--bg-main) flex flex-col min-h-screen items-center justify-center px-4">

      <ToastContainer position="top-right" theme="dark" />

      <h1 className="text-(--primary-color) text-3xl font-bold">
        Create Your Account
      </h1>

      <p className="text-(--text-body)">
        I already have an Account{" "}
        <Link to={"/signin"}>
          <span className="underline text-blue-700 cursor-pointer">
            Sign In
          </span>
        </Link>
      </p>

      <div className="bg-(--bg-card) rounded-2xl backdrop-blur-2xl shadow-sm shadow-stone-900 w-full max-w-sm flex flex-col px-4 py-6 items-center text-(--text-body) mt-4">

        <Logo />

        <LabelInput
          label="Name"
          placeHolder="Ayush Singh"
          value={postInputs.name}
          onChange={(e) => {
            setPostInput((c) => ({
              ...c,
              name: e.target.value
            }))
          }}
        />

        <LabelInput
          label="Email"
          placeHolder="ayushsingh@gmail.com"
          value={postInputs.email}
          onChange={(e) => {
            setPostInput((c) => ({
              ...c,
              email: e.target.value
            }))
          }}
        />

        <LabelInput
          label="Password"
          type="password"
          placeHolder="Enter your Password"
          value={postInputs.password}
          onChange={(e) => {
            setPostInput((c) => ({
              ...c,
              password: e.target.value
            }))
          }}
        />

        <button
          disabled={loading}
          onClick={handleSignup}
          className={`w-full rounded-xl px-4 py-2 font-bold mt-4 transition-all
          
          ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-(--primary-color) text-black cursor-pointer hover:opacity-90"
            }`}
        >

          {loading ? "Creating Account..." : "Sign Up"}

        </button>

      </div>
    </div>
  )
}

export default Signup