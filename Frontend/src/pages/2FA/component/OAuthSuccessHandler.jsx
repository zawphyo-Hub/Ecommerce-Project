import { useEffect} from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";




function OAuthSuccessHandler(){
    const navigate = useNavigate();
    const hasRun = useRef(false);

  useEffect(() => {

    if (hasRun.current) return;
    hasRun.current = true;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {

      const decoded = jwtDecode(token);
      const userData = {
          userId: decoded.UserId,   
          fullName: decoded.fullName,
          email: decoded.email
        };
      console.log("JWT OAuth:", token);


      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      setTimeout(() => {
      toast.success("Successfully Logined.");
      navigate("/home");
      }, 300);

    } else {
      // Error handling
      navigate("/");
      toast.error("Login Failed!!")
    }
  }, []);


    return(
        <div>
            <p>Logging in...</p>;

        </div>
    )

}
export default OAuthSuccessHandler;