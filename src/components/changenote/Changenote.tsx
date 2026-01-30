/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PlusIcon } from "@/icons";
import Button from "../ui/button/Button";
import React, { useState } from "react";
import ChangenoteTable from "./ChangenoteTable";
import UnderDev from "@/layout/UnderDev";

export default function Changenote() {
  const [editedInitData, setEditedInitData] = useState<any>(null);
  const [isFormInitShow, setIsFormInitShow] = useState(false);

  const getFormInitShowingState = (state: boolean) => {
    setIsFormInitShow(state);
  };

  /* const getEditedInitData = (editedData: Adjusment) => {
    setEditedInitData(editedData);
  }; */

  const handleFormClose = () => {
    setEditedInitData(null);
  };

  return (
    <>
      {isFormInitShow ? (
        <UnderDev />
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
          <ChangenoteTable />
          {/* <AdjusmentTable
            handleEditedData={getEditedInitData}
            handleFormShowing={getFormInitShowingState}
          /> */}
        </>
      )}
    </>
  );
}
