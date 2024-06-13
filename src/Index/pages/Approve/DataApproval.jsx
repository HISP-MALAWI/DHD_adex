import React, { useState } from "react";
import {
  Button,
  ButtonStrip,
  Field,
  TextArea,
  Modal,
  ModalTitle,
  Radio,
  ModalActions,
  ModalContent,
} from "@dhis2/ui";

export default function DataApproval({
  openApprove,
  setOpenApprove,
  approveHandler,
}) {
  const [comment, setDataValues] = useState("");
  const [radioValues, setRadioValues] = useState("");
  const handleDataValues = () => {
    if (radioValues == "" || radioValues == null || radioValues == undefined) {
    } else {
      approveHandler({ status: radioValues, comment });
      setOpenApprove(false);
    }
  };
  return (
    <div>
      {openApprove && (
        <Modal onClose={() => setOpenApprove(false)}>
          <ModalTitle>Approve</ModalTitle>
          <ModalContent>
            <div style={{ display: "flex", gap: 4, marginBottom: "10px" }}>
              <Radio
                className="initially-focused"
                label="Success"
                name="status"
                // onBlur={onBlur}
                onChange={(e) => setRadioValues(e.value)}
                // onFocus={onFocus}
                checked={radioValues === "success"}
                value="success"
              />
              <Radio
                className="initially-unfocused"
                label="Fail"
                name="status"
                // onBlur={onBlur}
                onChange={(e) => setRadioValues(e.value)}
                // onFocus={onFocus}
                checked={radioValues === "fail"}
                value="fail"
              />
            </div>
            <Field label="Comment">
              <TextArea onChange={(e) => setDataValues(e.value)} rows={5} />
            </Field>
          </ModalContent>
          <ModalActions>
            <ButtonStrip end>
              <Button onClick={() => setOpenApprove(false)}>Cancel</Button>
              {radioValues == "" ? (
                <Button primary disabled>
                  Approve
                </Button>
              ) : (
                <Button
                  primary
                  onClick={() => {
                    handleDataValues();
                  }}
                >
                  Approve
                </Button>
              )}
            </ButtonStrip>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}
