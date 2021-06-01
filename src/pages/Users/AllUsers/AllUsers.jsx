import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  Badge,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import NumberFormat from "react-number-format"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { AvForm, AvField } from "availity-reactstrap-validation"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import images from "assets/images"
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import "./allUsers.scss"
import {
  getUsers,
  addNewUser,
  updateUser,
  deleteUser,
} from "store/contacts/actions"
// import contactListColumns from "./contactListColumns"
import { isEmpty, size, map } from "lodash"
// import { constrainPoint } from "@fullcalendar/common";

//i18n
import { withTranslation } from "react-i18next"

const AllUsers = props => {
  const { users, onGetUsers } = props

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 8,
    totalSize: users.length, // replace later with size(users),
    custom: true,
  }

  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ]

  const selectRow = {
    mode: "checkbox",
    hideSelectAll: true,
  }

  const userListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, user) => <>{user.id}</>,
    },
    {
      dataField: "img",
      text: "#",
      formatter: (cellContent, user) => (
        <>
          {!user.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {user.name
                  .split(" ")
                  .map(item => item.charAt(0))
                  .join("")}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={images[user.img]}
                alt=""
              />
            </div>
          )}
        </>
      ),
    },
    {
      text: props.t("NameSurname"),
      dataField: "name",
      sort: true,
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1 text-muted fw-default">
            {user.name}
          </h5>
        </>
      ),
    },
    {
      dataField: "email",
      text: props.t("PhoneEmail"),
      sort: true,
      formatter: (cellContent, user) => (
        <>
          <p className="text-muted mb-0">{user.phone}</p>
          <p className="text-muted mb-0">{user.email}</p>
        </>
      ),
    },
    {
      text: props.t("Company"),
      dataField: "company",
      sort: true,
    },
    {
      text: props.t("AvailableCredits"),
      dataField: "credits",
      sort: true,
      formatter: (cellContent, user) => (
        <NumberFormat
          value={user.credits}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
    },
    {
      text: props.t("Status"),
      dataField: "status",
      sort: true,
      formatter: (cellContent, user) =>
        user.status ? (
          <Badge color="success">{props.t("Active")}</Badge>
        ) : (
          <Badge>{props.t("Inactive")}</Badge>
        ),
    },
    {
      text: props.t("LastLogin"),
      dataField: "lastLogin",
      sort: true,
      formatter: (cellContent, user) =>
        format(parseISO(user.lastLogin), "dd LLL, yyyy", { locale: es }),
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: props.t("Action"),
      formatter: (cellContent, user) => (
        <div className="d-flex justify-content-center">
          <Link className="text-gray-1" to="#">
            <i
              className="mdi mdi-eye font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            ></i>
          </Link>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (users && !users.length) {
      onGetUsers()
      setIsEdit(false)
    }
  }, [onGetUsers, users])

  useEffect(() => {
    setUserList(users)
    setIsEdit(false)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setUserList(users)
      setIsEdit(false)
    }
  }, [users])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg

    setUserList({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    })

    setIsEdit(true)

    toggle()
  }

  const handleDeleteUser = user => {
    const { onDeleteUser } = props
    onDeleteUser(user)
  }

  /**
   * Handling submit user on user form
   */
  const handleValidUserSubmit = (e, values) => {
    const { onAddNewUser } = props

    if (isEdit) {
      const updateUser = {
        id: userList.id,
        name: values.name,
        designation: values.designation,
        tags: values.tags,
        email: values.email,
        projects: values.projects,
      }

      // update user
      setUserList(updateUser)
      setIsEdit(false)
    } else {
      const newUser = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        designation: values["designation"],
        email: values["email"],
        tags: values["tags"],
        projects: values["projects"],
      }
      // save new user
      onAddNewUser(newUser)
    }
    toggle()
  }
  const handleUserClicks = () => {
    setUserList("")
    setIsEdit(false)
    toggle()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Todos los miembros | The Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Usuarios" breadcrumbItem="Todos los miembros" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={+userListColumns}
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={users}
                        columns={userListColumns}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box ms-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar
                                      {...toolkitProps.searchProps}
                                      placeholder={props.t("Search")}
                                    />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    color="primary"
                                    className="font-16 btn-block btn btn-primary btn-rounded btn-dark"
                                    onClick={handleUserClicks}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    {props.t("NewUser")}
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    selectRow={selectRow}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap table-hover users-table"
                                    }
                                    bordered={false}
                                    striped={false}
                                    responsive
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AllUsers.propTypes = {
  users: PropTypes.array,
  onGetUsers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onUpdateUser: PropTypes.func,
}

const mapStateToProps = ({ contacts }) => ({
  users: contacts.users,
})

const mapDispatchToProps = dispatch => ({
  onGetUsers: () => dispatch(getUsers()),
  onAddNewUser: user => dispatch(addNewUser(user)),
  onUpdateUser: user => dispatch(updateUser(user)),
  onDeleteUser: user => dispatch(deleteUser(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(AllUsers)))
