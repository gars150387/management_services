import { Grid } from "@mui/material";
import { Button, Form, Input, Modal, Select } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { localizer } from "../components/CalendarLocalizator";
import EditEventModal from "../components/EditModal";
import { NavbarContext } from "../protectedRoutes/ProtectedRoutes";
import { supabase } from "../supabaseClient";
const { TextArea } = Input;
const { Option } = Select;
export const OutlinedInputStyle = {
  borderRadius: "8px",
  outline: "none",
  backgroundColor: "#fff",
  verticalAlign: "center",
  boxShadow: "1px 1px 2px rgba(16, 24, 40, 0.05)",
  height: "2.5rem",
  padding: "12px",
};

const lang = {
  en: null,
  es: {
    week: "Semana",
    work_week: "Semana de trabajo",
    day: "Día",
    month: "Mes",
    previous: "Atrás",
    next: "Después",
    today: "Hoy",
    agenda: "El Diario",

    showMore: (total) => `+${total} más`,
  },
};


const MainPage = () => {
  const { value } = useContext(NavbarContext);
  console.log(value)  
  const [clients, setClients] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchClients();
    fetchEvents();
  }, []);

  const { messages } = useMemo(
    () => ({
      messages: lang[value],
    }),
    [value]
  );

  // Fetch clients from the Supabase consumer table
  const fetchClients = async () => {
    const { data, error } = await supabase.from("customer").select("*"); // Use 'consumer' table
    if (error) {
      console.error("Error fetching clients:", error);
    } else {
      setClients(data);
    }
  };

  // Fetch events from Supabase
  const fetchEvents = async () => {
    // Fetch all events from the events table
    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*");

    if (eventsError) {
      console.error("Error fetching events:", eventsError);
      return;
    }

    // Fetch consumer information for each event based on the client_id
    const formattedEvents = await Promise.all(
      events.map(async (event) => {
        const { data: client, error: clientError } = await supabase
          .from("customer")
          .select("*")
          .eq("id", event.client_id)
          .single(); // Assuming client_id is unique for each consumer

        if (clientError) {
          console.error(
            `Error fetching consumer with ID ${event.client_id}:`,
            clientError
          );
          return {
            ...event,
            title: `Unknown Client | Client ID: ${event.client_id}`,
            start: new Date(event.date),
            end: new Date(event.date),
          };
        }

        return {
          title: `${client.first_name} ${client.last_name} | Client ID: ${event.client_id}`,
          start: new Date(event.date),
          end: new Date(event.date),
          data: { event: event, client: client },
        };
      })
    );
    // Set the events in state
    setEvents(formattedEvents);
  };

  // Handle calendar day click to open modal
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const { client, description } = values;
    // Insert event into Supabase
    const { error } = await supabase.from("events").insert([
      {
        client_id: client,
        date: selectedDate.toLocaleDateString(),
        service: description,
        company_id: localStorage.getItem("companyData").company_id,
      },
    ]);

    if (error) {
      console.error("Error scheduling event:", error);
      toast.error("Failed to schedule the event.");
    } else {
      toast.success("Event scheduled successfully!");
      fetchEvents(); // Refresh the events

      setShowModal(false); // Close modal after submission
    }
  };

  const handleExistingEvent = (event) => {
    setShowEditModal(true);
    setSelectedEvent(event);
  };
  return (
    <div className="App">
      {/* Calendar Component */}
      <div style={{ height: "500px", margin: "50px 0" }}>
        <Calendar
          culture={value}
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          onDoubleClickEvent={handleExistingEvent}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          style={{ height: 500 }}
        />
      </div>

      {/* Modal for Scheduling Event */}
      <Modal
        title="Schedule Service"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Grid
            key={"footer"}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
              gap: "1rem",
            }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <Button
              style={{ width: "100%" }}
              key="back"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>

            <Button
              style={{ width: "100%" }}
              key="submit"
              type="primary"
              onClick={() => form.submit()}
            >
              Schedule event
            </Button>
          </Grid>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Client Selector */}
          <Form.Item
            name="client"
            label="Select Client"
            rules={[{ required: true, message: "Please select a client" }]}
          >
            <Select placeholder="Select a client">
              {clients.map((client) => (
                <Option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name} (ID: {client.id})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* Date and Time Input */}
            <DatePicker
              style={{
                ...OutlinedInputStyle,
                margin: "0.1rem 0 1.5rem",
                width: "100%",
              }}
              id="calender-event"
              showTimeSelect
              dateFormat="Pp"
              openToDate={selectedDate}
              startDate={selectedDate}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Event close date"
            />
          </Grid>

          {/* Service Description */}
          <Form.Item
            name="description"
            label="Service Description"
            rules={[
              { required: true, message: "Please provide a description" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Describe the service to be provided"
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal for Editing an Event */}
      {showEditModal && (
        <EditEventModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          event={selectedEvent}
          fetchEvents={fetchEvents}
        />
      )}
      <ToastContainer />
    </div>
  );
};
export default MainPage;
