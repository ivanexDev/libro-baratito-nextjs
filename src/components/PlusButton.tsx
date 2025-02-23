"use client";

import React, { useState } from "react";
import AddBookDialog from "./AddBookDialog";
import { LuPlus } from "react-icons/lu";


const PlusButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialog(state: boolean) {
    setIsDialogOpen(state);
  }

  return (
    <>
      <button
        className="flex justify-center items-center text-white rounded-xl bg-orange-primary h-[40px] w-[40px] px-2"
        onClick={() => handleDialog(true)}
      >
        <LuPlus  className="w-8 h-8"/>
      </button>
      <AddBookDialog value={isDialogOpen} handleDialog={handleDialog} />
    </>
  );
};

export default PlusButton;
