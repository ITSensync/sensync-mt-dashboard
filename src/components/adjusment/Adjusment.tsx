/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import { PlusIcon } from "@/icons";
import FormAdjusment from "../form/example-form/FormAdjusment";
import { Adjusment } from "../types/Adjusment";
import AdjusmentTable from "../tables/AdjusmentTable";

export default function AdjusmentPage() {
  const [editedInitData, setEditedInitData] = useState<any>(null);
  const [isFormInitShow, setIsFormInitShow] = useState(false);

  const getFormInitShowingState = (state: boolean) => {
    setIsFormInitShow(state);
  };

  const getEditedInitData = (editedData: Adjusment) => {
    setEditedInitData(editedData);
  };

  const handleFormClose = () => {
    setEditedInitData(null);
  };

  return (
    <>
      {isFormInitShow ? (
        <FormAdjusment
          initialSensorName="ph"
          initAdjusmentData={editedInitData}
          getIsFormInitShowingState={getFormInitShowingState}
          onClose={handleFormClose}
        />
      ) : (
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
          <AdjusmentTable
            handleEditedData={getEditedInitData}
            handleFormShowing={getFormInitShowingState}
          />
        </>
      )}
    </>
  );
}
