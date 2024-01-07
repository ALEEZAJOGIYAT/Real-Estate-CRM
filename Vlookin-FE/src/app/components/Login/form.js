import React, { useState, useEffect } from "react";
import { Input, Form, Checkbox } from "antd";
import { CustomButton } from "../Button";
import { routePaths, apiRoutes } from "../../routes/config";
import { useNavigate } from "react-router";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { RolesSelector } from "../DropDown/rolesSelector";
import { toast } from "react-toastify";
import { CustomAlert } from "../Alert";
import { Cookies, useCookies } from "react-cookie";

export const LoginForm = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    userId: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const [user, setUser] = useState([]);
  const [cookies, setCookies, removeCookie] = useCookies();

  const cookie = new Cookies();


  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const roleChange = (value) => {
    setRole(value);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
        userSignUp(inputs);
    } catch (er) {
      setLoading(false);
    }
  };

  //test token and add token in signup fun in use effect just like use rprofile and then test it
  useEffect(() => {
    cookie.get('token');
        
  }, []);

  const userSignUp = async (inputs) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let url = apiRoutes.postUser;
    await axios
      .post(
        url,
        {
          email: inputs.userId,
          password: inputs.password,
          role: role == 'tenant' ? role : ''
        },
        config
      )
      .then((response) => {
        if (response.status == 200) {
          toast.success("Logged in successfully");
          setLoading(false);
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 8 * 60 * 60 * 1000); // 8 hours in milliseconds
          setCookies("token", response.data.token,
          {
            expires: expirationDate,
          });           // your token
          setCookies("name", response.data.data.userName, {
            expires: expirationDate,
          }); // optional data

          //will update it later by using redux

          setCookies("role", response.data.data.role);
          setCookies("userId", response.data.data.id)
          setCookies("buildingId", response.data.data.buildingId)

          const role = cookie.get("role");
        
          switch (role) {
            case "admin":
              navigate(routePaths.Admin.dashboard);
              break;
            case "tenant":
              navigate(routePaths.User.dashboard);
              break;
            case "visitor":
              navigate(routePaths.Visitor.dashboard);
              break;
            case "maintenance":
              navigate(routePaths.Maintenance.dashboard);
              break;
            case "superadmin":
            case "superAdmin":
              navigate( routePaths.SuperAdmin.addUser);
              break;
            default:
              break;
          }
        } else {
          console.log(response);
          toast.error("Unauthorized");
        }
      })
      .catch((error) => {
        console.log('error', error)
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="loader">
          <Oval
            height={50}
            width={50}
            color="#4A0D37"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#6A164F"
            strokeWidth={5}
            strokeWidthSecondary={5}
          />
        </div>
      ) : (
        <Form>
          <Form.Item
            name="userId"
            rules={[
              {
                required: true,
                message: "Please enter your userId",
              },
            ]}
          >
            <Input
              name="userId"
              placeholder="User Id"
              value={inputs.userId}
              onChange={handleChange}
              className="login_form_input{
              "
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="form_items"
            rules={[
              {
                required: true,
                message: "Please enter your correct password",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
              className="login_form_input"
              name="password"
            />
          </Form.Item>
          <RolesSelector handleChange={roleChange} value={role} />
          <Form.Item>
            <Checkbox onChange={onChange} style={{ color: "#ffffff" }}>
              Remember me
            </Checkbox>
          </Form.Item>
          <CustomButton
            handleClick={handleSubmit}
            buttonName={props.name}
            bgColor={"#4A0D37"}
            color={"#F8F8F8"}
          />
        </Form>
      )}
      <CustomAlert />
    </div>
  );
};
