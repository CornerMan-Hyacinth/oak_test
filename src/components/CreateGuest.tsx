"use client";

import axios from "axios";
import { useEffect } from "react";

const CreateGuest = () => {
  useEffect(() => {
    const createGuest = async () => {
      try {
        const response = await axios.post("/api/guestLogin");

        if (response.data.success) {
          const { guestId } = response.data;
          localStorage.setItem("guestId", guestId);
        }
      } catch (error) {
        console.error("Error creating guest:", error);
      }
    };

    createGuest();
  }, []);

  return <></>;
};

export default CreateGuest;
