"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Input, InputLabel, FormControl } from "@mui/material";
import { supabase } from "@/client";
import { useRouter, useSearchParams } from "next/navigation";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormModal({ AddedTask }) {


  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState('')
  const [data, setData] = React.useState({
    task: "",
    des: "",
  });

  const val = useSearchParams()

  React.useEffect(() => {
    if (val) {
      const value = val.get('value')
      setCategory(value)
    }
    else {
      setCategory('')
    }

  }, [])


  const resetField = () => {
    setData({
      task: "",
      des: "",
    });
  };

  const handleOpen = () => setOpen(true);

  const handleClose = async () => {
    if (!data.task || !data.des) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("tasktable")
        .insert({ task: data.task, des: data.des , "category" : category });

      if (error) {
        throw error;
      }

      console.log("Task added successfully");
      AddedTask()
      resetField();
    } catch (error) {
      console.error("Error adding task:", error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Button onClick={handleOpen}>Set Your Task</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col">
            <FormControl>
              <InputLabel htmlFor="task-input">Enter Your Task</InputLabel>
              <Input
                id="task-input"
                name="task"
                value={data.task}
                onChange={onChange}
                required
                placeholder="Your Task"
              />
            </FormControl>

            <FormControl className="mt-4">
              <InputLabel htmlFor="des-input">Description</InputLabel>
              <Input
                id="des-input"
                name="des"
                value={data.des}
                onChange={onChange}
                required
                placeholder="Type your description"
              />
            </FormControl>

            <button
              onClick={handleClose}
              disabled={loading}
              className={`mt-4 ${loading ? "bg-gray-400" : "bg-cyan-500"} text-white rounded-md py-2`}
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
