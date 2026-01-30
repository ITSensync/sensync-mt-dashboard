/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PlusIcon } from "@/icons";
import Button from "../ui/button/Button";
import React, { useState } from "react";
import ChangenoteTable from "./ChangenoteTable";
import UnderDev from "@/layout/UnderDev";
import FormChangenote from "./FormChangenote";
import { Changenote } from "../types/Changenote";
// import { Changenote } from "../types/Changenote";

export default function ChangenotePage() {
  const [editedInitData, setEditedInitData] = useState<any>(null);
  const [isFormInitShow, setIsFormInitShow] = useState(false);

  const getFormInitShowingState = (state: boolean) => {
    setIsFormInitShow(state);
  };

  const getEditedInitData = (editedData: Changenote) => {
    setEditedInitData(editedData);
  };

  const handleFormClose = () => {
    setEditedInitData(null);
  };

  return (
    <>
      {isFormInitShow ? (
        // <UnderDev />
        <FormChangenote
          getIsFormInitShowingState={getFormInitShowingState}
          onClose={handleFormClose}
          initChangenoteData={editedInitData}
        />
      ) : (
        /* {
          
          <FormAdjusment
          initialSensorName="ph"
          initAdjusmentData={editedInitData}
          getIsFormInitShowingState={getFormInitShowingState}
          onClose={handleFormClose}
        />
        } */
        // <BasicForm/>
        <>
          <div className="flex justify-end mb-4">
            <Button
              size="sm"
              variant="primary"
              startIcon={<PlusIcon />}
              onClick={() => getFormInitShowingState(true)}
            >
              Add
            </Button>
          </div>
          <ChangenoteTable
            getEditedData={getEditedInitData}
            handleFormShowing={getFormInitShowingState}
          />
          {/* <AdjusmentTable
            handleEditedData={getEditedInitData}
            handleFormShowing={getFormInitShowingState}
          /> */}
        </>
      )}
    </>
  );
}
