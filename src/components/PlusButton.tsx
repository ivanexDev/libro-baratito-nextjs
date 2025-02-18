"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddBookDialog from "./AddBookDialog";


const PlusButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialog(state: boolean) {
    setIsDialogOpen(state);
  }

  return (
    <>
      <button
        className="flex  justify-center items-center  text-white rounded-md bg-orange-primary h-[30px] w-[30px]"
        onClick={() => handleDialog(true)}
      >
        <Plus />
      </button>
      <AddBookDialog value={isDialogOpen} handleDialog={handleDialog} />
    </>
  );
};

export default PlusButton;
