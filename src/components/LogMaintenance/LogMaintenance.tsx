/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PlusIcon } from "@/icons";
import Button from "../ui/button/Button";
import React, { useState } from "react";
import FormLogMaintenance from "./FormLogMaintenance";
import LogTable from "./LogMaintenanceTable";
import { LogMaintenance } from "../types/Log";
// import { Changenote } from "../types/Changenote";

export default function LogMTPage() {
  const [editedInitData, setEditedInitData] = useState<any>(null);
  const [isFormInitShow, setIsFormInitShow] = useState(false);

  const getFormInitShowingState = (state: boolean) => {
    setIsFormInitShow(state);
  };

  const getEditedInitData = (editedData: LogMaintenance) => {
    setEditedInitData(editedData);
  };

  const handleFormClose = () => {
    setEditedInitData(null);
  };

  return (
    <>
      {isFormInitShow ? (
        // <UnderDev />
        <FormLogMaintenance
          getIsFormInitShowingState={getFormInitShowingState}
          onClose={handleFormClose}
          initLogData={editedInitData}
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
          <LogTable
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
