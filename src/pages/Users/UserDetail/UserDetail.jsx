import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
  ModalHeader,
  ModalBody,
  CardTitle,
  Tooltip,
} from "reactstrap"
//i18n
import { withTranslation } from "react-i18next"
import { useParams, Link } from "react-router-dom"
import Breadcrumbs from "components/Common/Breadcrumb"
import images from "assets/images"
import NumberFormat from "react-number-format"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

const user = {
  name: "Covadonga",
  surname: "Arias",
  phone: "+52 1234 5678",
  email: "noannao@gmail.com",
  credits: 2300,
  legalName: "Norma Angélica Najara López",
  savedCards: [
    {
      id: 1,
      cardEnds: 1234,
      type: "VISA",
      cardHolder: "Covadonga Arias",
    },
  ],
  image: "avatar9",
  lastInvoices: [
    {
      id: 1,
      qty: 1200,
      concept: "Compra de créditos",
      date: new Date(2021, 6, 21, 10, 10),
    },
    {
      id: 2,
      qty: 620,
      concept: "Reserva de sala",
      date: new Date(2021, 6, 18, 9, 31),
    },
  ],
}

function UserDetail() {
  const params = useParams()
  const [dropdownOpen, setOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const toggle = () => setOpen(!dropdownOpen)
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

  const tabs = [
    { id: 1, label: "Datos Generales", selected: false },
    { id: 2, label: "Detalles de pago", selected: false },
    {
      id: 3,
      label: (
        <>
          <NumberFormat
            value={user.credits}
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
          créditos
        </>
      ),
      selected: true,
    },
    { id: 4, label: "Registro de accesos", selected: false },
  ]
  return (
    <div className="page-content">
      <MetaTags>
        <title>
          Detalles - {user.name} {user.surname}
        </title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Usuarios"
          parent="/usuarios"
          breadcrumbItem="Detalles"
        />
        <Row>
          <Col xl="2">
            <Card>
              <CardBody>
                <img
                  src={images[user.image]}
                  alt="profile image"
                  className="img-fluid w-100 mb-4"
                />
                <div className="user-name">
                  <p>{user.name}</p>
                  <p>{user.surname}</p>
                </div>
                <div className="contact-forms">
                  <a href={`tel://${user.phone}`}>{user.phone}</a>
                  <a href={`mailto://${user.email}`}>{user.email}</a>
                </div>
              </CardBody>
              <CardFooter>
                <ul>
                  {tabs.map(tab => (
                    <li key={tab.id}>{tab.label}</li>
                  ))}
                </ul>
              </CardFooter>
            </Card>
          </Col>
          <Col xl="10">
            <div>
              <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>Activo</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem disabled>Activo</DropdownItem>
                  <DropdownItem>Inactivo</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <Button>Añadir método de pago</Button>
              <Button>Nueva reservación</Button>
              <Button>Añadir créditos</Button>
            </div>
            <Card>
              <CardBody>
                <CardTitle tag="h2">Detalles de pago</CardTitle>
                <Form>
                  <Row>
                    <p>Legal</p>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label for="legalName">Nombre legal</Label>
                        <Input
                          value={user.legalName}
                          onChange={() => {}}
                          name="legalName"
                          type="text"
                          id="legalName"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label for="rfc">
                          RFC{" "}
                          <i
                            className="mdi mdi-help-circle font-size-18"
                            id="rfctooltip"
                          ></i>
                          <Tooltip
                            placement="right"
                            isOpen={tooltipOpen}
                            target="rfctooltip"
                            toggle={toggleTooltip}
                          >
                            Registro Federal de Contribuyentes
                          </Tooltip>
                        </Label>
                        <Input name="rfc" type="text" id="rfc" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <p>Dirección física</p>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label for="street">Calle</Label>
                        <Input name="street" type="text" id="street" />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label for="number">Número interior</Label>
                        <Input name="number" type="text" id="number" />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label for="extNumber">Número exterior</Label>
                        <Input name="extNumber" type="text" id="extNumber" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label for="postalCode">Código postal</Label>
                        <Input name="postalCode" type="text" id="postalCode" />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label for="zone">Barrio</Label>
                        <Input name="zone" type="text" id="zone" />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label for="city">Municipio</Label>
                        <Input name="city" type="text" id="city" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label for="state">Estado</Label>
                        <Input name="state" type="text" id="state" />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label for="country">País</Label>
                        <Input name="country" type="text" id="country" />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Row>
              <Col lg="6">
                <Card>
                  <CardBody>
                    <CardTitle tag="h2">Métodos de pago</CardTitle>
                    <p>Tarjetas guardadas</p>
                    <Row>
                      {user.savedCards.map(card => (
                        <Col lg="4" key={card.id}>
                          <p>{card.type}</p>
                          <p>{card.cardHolder}</p>
                          <p>**** **** **** {card.cardEnds}</p>
                        </Col>
                      ))}
                    </Row>
                    <p>Powered by stripe</p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card>
                  <CardBody>
                    <CardTitle tag="h2">Últimas facturas</CardTitle>
                    <ul>
                      {user.lastInvoices.map(invoice => (
                        <li key={invoice.id}>
                          <NumberFormat
                            value={invoice.qty}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix="€"
                          />{" "}
                          {invoice.concept}{" "}
                          {format(invoice.date, "dd LLLL yyyy, HH:mmaaa", {
                            locale: es,
                          })}
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withTranslation()(UserDetail)
