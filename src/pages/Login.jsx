import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/Context";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token, setToken } = useAuth()
  const navigate = useNavigate();

  const onSubmitEvent = (data) => {
    const _url = "https://todoo.5xcamp.us/users/sign_in";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: data
        })
    })
    .then(res => {
        console.log(res)
        if(res.status===401){
            throw new Error('登入失敗，請重新檢驗！');
        }
        setToken(res.headers.get("authorization"));
        return res.json()
       })
    .then((res) => {
        navigate('/Todo')
      })
    .catch((err) => {
        console.log(err);
        return MySwal.fire({
          title: err.message,
          })
      });
  };
  return (
    <div id="loginPage" class="bg-yellow">
        <div class="conatiner loginPage vhContainer ">
            <div class="side">
                <a href="#"><img class="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt=""/></a>
                <img class="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg"/>
            </div>
            <div>
                <form class="formControls" action="index.html" onSubmit={handleSubmit(onSubmitEvent)}>
                    <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
                    <label class="formControls_label" for="email">Email</label>
                    <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required {...register("email", {
                        required: { value: true, message: "此欄位必填" },
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                          message: "不符合 Email 規則"
                        }
                      })}/>
                    <span>{errors.email?.message}</span>
                    <label class="formControls_label" for="pwd">密碼</label>
                    <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required {...register("password", {
                        required: { value: true, message: "此欄位必填" },
                        minLength: { value: 8, message: "密碼至少為 8 碼" }
                      })}/>
                    <span>{errors.password?.message}</span>
                    <input class="formControls_btnSubmit" type="submit" onClick="javascript:location.href='#todoListPage'" value="登入"/>
                    <Link className='formControls_btnLink' to="SignUp">註冊帳號</Link>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Login;
