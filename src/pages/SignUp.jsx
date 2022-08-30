import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import React from 'react';

function SignUp() {
  const { useState } = React;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [pwd, setPwd] = useState("");
  // function isSame(password2){
  //     return password2 == {pwd}.pwd
  // }
  const isSame = (password2) => password2 == {pwd}.pwd;

  const onSubmitEvent = (data) => {
    const inputData = { user: data };
    console.log(data)
    axios
      .post("https://todoo.5xcamp.us/users", inputData)
      .then((res) => {
        alert(`回傳結果：${JSON.stringify(res.data)}`);
      })
      .catch((err) => {
        alert(`${err.response.data.message}：${err.response.data.error}`);
      });
  };
  return (
    <div id="signUpPage" class="bg-yellow">
        <div class="conatiner signUpPage vhContainer">
            <div class="side">
                <a href="#"><img class="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt=""/></a>
                <img class="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg"/>
            </div>
            <div>
                <form class="formControls" action="index.html" onSubmit={handleSubmit(onSubmitEvent)}>
                    <h2 class="formControls_txt">註冊帳號</h2>
                    <label class="formControls_label" for="email">Email</label>
                    <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required {...register("email", {
                        required: { value: true, message: "此欄位必填" },
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                          message: "不符合 Email 規則"
                        }
                      })}/>
                    <span>{errors.email?.message}</span>
                    <label class="formControls_label" for="name">您的暱稱</label>
                    <input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" {...register("nickname", {
                        required: { value: true, message: "此欄位必填" }
                      })}/>
                    <span>{errors.nickname?.message}</span>
                    <label class="formControls_label" for="pwd">密碼</label>
                    <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" 
                    required {...register("password", {
                      required: { value: true, message: "此欄位必填" },
                      minLength: { value: 8, message: "密碼至少為 8 碼" }
                    })}
                    value={pwd}
                     onChange={(e) => {
                      setPwd(e.target.value);
                    }} 
                    />
                    <span>{errors.password?.message}</span>
                    <label class="formControls_label" for="pwd">再次輸入密碼</label>
                    <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請再次輸入密碼" required {...register("password2", {
                        required: true,
                        minLength: 8,
                        validate: isSame
                      })}/>
                    {errors.password2 && errors.password2.type === "required" && <span>此欄位必填</span>}
                    {errors.password2 && errors.password2.type === "minLength" && <span>密碼至少為 8 碼</span>}
                    {errors.password2 && errors.password2.type === "validate" && <span>密碼不一致</span> }
                    <input class="formControls_btnSubmit" type="submit" onclick="javascript:location.href='#todoListPage'" value="註冊帳號"/>
                    <Link className='formControls_btnLink' to="/">登入</Link>
                </form>
            </div>
        </div>
    </div>
  );
}

export default SignUp;
