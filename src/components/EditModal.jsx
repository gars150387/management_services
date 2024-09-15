/* eslint-disable react/prop-types */
import { Grid, OutlinedInput } from "@mui/material";
import { Button, Modal, notification } from "antd";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import "../App.css";
import DatePicker from "react-datepicker";

const EditEventModal = ({ showModal, setShowModal, event, fetchEvents }) => {
  console.log(event);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      client: `${event.data.client.first_name} ${event.data.client.last_name}`,
      date: event.start.toLocaleDateString(),
      time: event.start.toLocaleTimeString(),
      description: event.data.event.service,
    },
  });
  const [selectedDate, setSelectedDate] = useState(event.start);

  const closeModal = () => {
    return setShowModal(false);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: `${event.data.client.first_name} ${event.data.client.last_name}`,
      description:
        "event updated successfully! You can see the updated event in the calendar.",
      duration: 4,
    });
  };
  const handleUpdate = async (data) => {
    // Update the event in the database
    const { description } = data;

    // Update the event in the database
    const { error } = await supabase
      .from("events")
      .update({
        date: selectedDate.toLocaleDateString(),
        service: description,
      })
      .eq("id", event.data.event.id);

    if (error) {
      console.error("Error updating event:", error);
    } else {
      fetchEvents(); // Refresh the events
      openNotification();
      setShowModal(false); // Close modal after submission
    }
  };
  return (
    <Modal
      title={`Edit Event for ${event.data.client.first_name} ${event.data.client.last_name}`}
      footer={[]}
      centered
      width={1000}
      open={showModal}
      onCancel={() => closeModal()}
    >
      {contextHolder}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h3>Event Details</h3>
        </Grid>
        <form
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
          onSubmit={handleSubmit(handleUpdate)}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <label>Client: &nbsp;</label>
            <OutlinedInput
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              disabled
              {...register("client")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <label style={{ width: "100%" }}>Date: &nbsp;</label>
            <DatePicker
              style={{
                // ...OutlinedInputStyle,
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <label>Description: &nbsp;</label>
            <OutlinedInput
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              {...register("description")}
            />
          </Grid>
          <Grid
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
              htmlType="reset"
              style={{ width: "100%" }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
              onClick={() => handleUpdate()}
            >
              Update
            </Button>
          </Grid>
        </form>
      </Grid>
    </Modal>
  );
};

export default EditEventModal;
