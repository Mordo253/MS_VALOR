import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../../components/ui";
import { loginSchema } from "../../schemas/auth";
import './loginPage.css'  
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import imglog from "../../assets/MS5.png"
import Aos from'aos';
import  "aos/dist/aos.css";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); 
    }
  }, [isAuthenticated]);

  return(
    <div className="container flex">
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <div className="headerTitle flex">
        <img src={imglog} alt="Logo MS DE VALOR" className='logoImg' />
        <h1 className="title">Login</h1>
        </div>
        

        <form className="infContainer flex" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <Label htmlFor="email">Email:</Label>
            <Input
              label="Escribe tu email"
              type="email"
              name="email"
              placeholder="youremail@domain.tld"
              {...register("email", { required: true })}
            />
            <p>{errors.email?.message}</p>
            {/* <MdEmail /> */}
          </div>

          <div className="inputContainer">
            <Label  htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              placeholder="Write your password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <p>{errors.password?.message}</p>
            {/* <FaLock className="iconL flex" /> */}
          </div>

          <Button>Login</Button>
        </form>

        {/* <p className="fotterLogin flex">
          Don't have an account? <Link to="/register" className="inputRes">Sign up</Link>
        </p> */}
      </Card>
    </div>
  )
}