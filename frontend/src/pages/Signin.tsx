import { Link , useNavigate} from "react-router"
import Logo from "../components/Logo"
import { useState, type ChangeEvent , useEffect} from "react"
import { z } from "zod"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAppDispatch , useAppSelector } from "../hooks/typehooks"
import { signin } from "../slice/Auth/AuthSlice"

type SignIn = {
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

const signinSchema = z.object({
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

const Signin = () => {
  const navigate = useNavigate()
  const {isAuthenticated , loading ,error } = useAppSelector((state)=>state.auth)
  const dispatch = useAppDispatch()
  const [postInputs, setPostInput] = useState<SignIn>({
    email: "",
    password: ""
  })

  useEffect(() => {
    if (isAuthenticated) {
      setPostInput({
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


  const handleSignin = async () => {

    const validation = signinSchema.safeParse(postInputs);

    if (!validation.success) {
      validation.error.issues.forEach((err) => toast.error(err.message));
      return;
   }

    dispatch(signin(validation.data)); 
  }

  return (
    <div className="bg-(--bg-main) flex flex-col min-h-screen items-center justify-center px-4">

      <ToastContainer position="top-right" theme="dark" />

      <h1 className="text-(--primary-color) text-3xl font-bold">
       WelCome Back 
      </h1>

      <p className="text-(--text-body)">
        I have no Account{" "}
        <Link to={"/signup"}>
          <span className="underline text-blue-700 cursor-pointer">
            Sign Up
          </span>
        </Link>
      </p>

      <div className="bg-(--bg-card) rounded-2xl backdrop-blur-2xl shadow-sm shadow-stone-900 w-full max-w-sm flex flex-col px-4 py-6 items-center text-(--text-body) mt-4">

        <Logo />

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
          onClick={handleSignin}
          className={`w-full rounded-xl px-4 py-2 font-bold mt-4 transition-all
          
          ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-(--primary-color) text-black cursor-pointer hover:opacity-90"
            }`}
        >

          {loading ? "Logging in..." : "Sign In"}

        </button>

      </div>
    </div>
  )
}


export default Signin
