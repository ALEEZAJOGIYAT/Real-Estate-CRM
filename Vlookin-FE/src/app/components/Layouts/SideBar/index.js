import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Button,
  Drawer,
  Radio,
  Space,
} from "antd";
import { useState } from "react";
import { Images } from "../../../../assets";
import { useNavigate } from "react-router";
import { routePaths } from "../../../routes/config";
import "./style.css";
import { Content } from "antd/es/layout/layout";
import { useMediaQuery } from "react-responsive";
import { FiMenu } from "react-icons/fi";

const { Sider } = Layout;

const SideBar = ({
  children,
  items,
  role,
  userName,
  showDrawer,
  open,
  setOpen,
  data,
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  // const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  // const showDrawer = () => {
  //   setOpen(true);
  // };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    if (e.key === "add_visitor") {
      navigate(routePaths.Visitor.dashboard);
    } else if (e.key === "list_visitor") {
      navigate(routePaths.Visitor.listVisitor);
    } else if (e.key === "tenantlist") {
      navigate(routePaths.Tenant.listTenant);
    } else if (e.key === "addtenant") {
      navigate(routePaths.Tenant.dashboard);
    } else if (e.key === "addApartment") {
      navigate(routePaths.Admin.addAppartment);
    } else if (e.key === "addbuilding") {
      navigate(routePaths.Admin.addbuilding);
    } else if (e.key === "listbuilding") {
      navigate(routePaths.Admin.listBuilding);
    } else if (e.key === "listApartment") {
      navigate(routePaths.Admin.listAppartment);
    } else if (e.key === "addcomplaint") {
      navigate(routePaths.User.complaintForm);
    } else if (e.key === "complaintlist") {
      navigate(routePaths.User.complaintList);
    } else if (e.key === "adminListComplaint") {
      navigate(routePaths.Admin.adminListComplaint);
    } else if (e.key === "receiptList") {
      navigate(routePaths.User.receiptList);
    } else if (e.key === "maintenanceList") {
      navigate(routePaths.Maintenance.complaintList);
    } else if (e.key === "complaints") {
      navigate(routePaths.SuperAdmin.maintenance);
    } else if (e.key === "visitor") {
      navigate(routePaths.SuperAdmin.visitor);
    } else if (e.key === "addSuperAdminUser") {
      navigate(routePaths.SuperAdmin.addUser);
    } else if (e.key === "listSuperAdminUser") {
      navigate(routePaths.SuperAdmin.listUser);
    } else if (e.key === "tenant") {
      navigate(routePaths.SuperAdmin.tenant);
    } else if (e.key === "building") {
      navigate(routePaths.SuperAdmin.building);
    } else if (e.key === "apartment") {
      navigate(routePaths.SuperAdmin.apartment);
    } else if (e.key === "addReceipt") {
      navigate(routePaths.SuperAdmin.addReceipt);
    } else if (e.key === "listReceipt") {
      navigate(routePaths.SuperAdmin.listReceipt);
    } else if (e.key === "accountsDirectory") {
      navigate(routePaths.SuperAdmin.accountsDirectory);
    } else if (e.key === "tenancyExpiryList") {
      navigate(routePaths.SuperAdmin.tenancyExpiryList);
    } else if (e.key === "bankPaymentVoucher") {
      navigate(routePaths.SuperAdmin.bankPaymentVoucher);
    } else if (e.key === "journalVoucher") {
      navigate(routePaths.SuperAdmin.journalVoucher);
    } else if (e.key === "bankPaymentVoucher") {
      navigate(routePaths.SuperAdmin.bankPaymentVoucher);
    } else if (e.key === "myBuilding") {
      navigate(routePaths.Admin.myBuilding);
    }
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
        // minWidth: '100vh',
        height: "100vh",
      }}
    >
      {!isMobile ? (
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => {
            console.log(value);
            setCollapsed(value);
          }}
          width={243}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "#4A0D37",
          }}
        >
          <div
            className="logo_sidebar"
            style={{ display: collapsed ? "none" : "flex" }}
          >
            <img src={Images.logo}></img>
            <CloseOutlined onClick={() => setCollapsed(true)} />
          </div>
          <div
            className="User_avatar_container"
            style={{ display: collapsed ? "none" : "flex" }}
          >
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
              {userName ? userName.charAt(0) : ""}
            </Avatar>
            <div className="user_role">
              <p>{data?.userName ?? data?.userName ?? userName}</p>
              <small> {data?.role ?? data?.role ?? role}</small>
            </div>
          </div>
          {collapsed && (
            <div onClick={() => setCollapsed(false)} className="collapsed_icon">
              <RightOutlined />
            </div>
          )}
          <Menu
            onClick={onClick}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            style={{ backgroundColor: "#4A0D37" }}
          />
        </Sider>
      ) : (
        <>
          <Drawer
            title="Basic Drawer"
            placement={placement}
            closable={true}
            onClose={onClose}
            open={open}
            style={{ width: "250px", backgroundColor: "#4A0D37" }}
            key={placement}
          >
            <Sider
              // collapsed={collapsed}
              // onCollapse={(value) => {
              //   console.log(value)
              //   setCollapsed(value)
              // }}
              width={243}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: "#4A0D37",
              }}
            >
              <div
                className="logo_sidebar"
                // style={{ display: collapsed ? 'none' : 'flex' }}
              >
                <img src={Images.logo}></img>
                <CloseOutlined
                  onClick={() => {
                    // setCollapsed(true)
                    setOpen(false);
                  }}
                />
              </div>
              <div
                className="User_avatar_container"
                // style={{ display: collapsed ? 'none' : 'flex' }}
              >
                <Avatar
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                >
                  {userName ? userName.charAt(0) : ""}
                </Avatar>
                <div className="user_role">
                  <p>{userName}</p>
                  <small>{role}</small>
                </div>
              </div>
              <Menu
                onClick={onClick}
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
                style={{ backgroundColor: "#4A0D37" }}
              />
            </Sider>
          </Drawer>
        </>
      )}
      <Content
        style={{
          padding: `${isMobile ? 0 : "0 0 0 245px"}`,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
export default SideBar;
