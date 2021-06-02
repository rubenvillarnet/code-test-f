import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

import { ReactComponent as Logo } from "../../assets/images/logo-light.svg"
import "./login.scss"

const Login = props => {
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | The dashboard</title>
      </MetaTags>
      <div className="login-page">
        <div className="login-background"></div>
        <div className="login-form">
          <Logo className="logo" />
          <h1 className="font-size-42 fw-medium text-teal">¡Bienvenido!</h1>
          <p className="font-size-20 fw-medium text-gray-1">
            Acceda a su cuenta de manager
          </p>
          <AvForm
            className="form-horizontal"
            onValidSubmit={(e, v) => {
              handleValidSubmit(e, v)
            }}
          >
            {props.error && typeof props.error === "string" ? (
              <Alert color="danger">{props.error}</Alert>
            ) : null}

            <div className="mb-3">
              <AvField
                name="email"
                label="Correo electrónico"
                value="admin@thedashboard.com"
                className="form-control"
                placeholder="Enter email"
                type="email"
                required
              />
            </div>

            <div className="mb-3">
              <AvField
                name="password"
                label="Contraseña"
                value="123456"
                type="password"
                required
                placeholder="Enter Password"
              />
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="customControlInline"
              />
              <label className="form-check-label" htmlFor="customControlInline">
                Recuerde mi acceso
              </label>
            </div>

            <div className="mt-3 d-grid">
              <button className="btn btn-primary btn-block" type="submit">
                Acceder
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-muted">
                ¿Ha olvidado la contraseña?
              </Link>
            </div>
          </AvForm>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}
