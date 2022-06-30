import { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Grid, Button, Checkbox } from "@mui/material";

import { typedData } from "./App";

const tableStyles = {
  display: "block",
  overflowX: "auto",
  paddingTop: "36px",
  whiteSpace: "nowrap",
  fontFamily: "Helvetica Neue",
  "& table": {
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse",
  },
  "& th, td": {
    px: "17px",
    color: "#1E1E24",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "40px",
  },
  "& th": {
    borderBottom: "2px solid #00006D",
  },
  "& td": {
    borderBottom: "1px solid #dddddd",
  },
  "& th:nth-of-type(1), td:nth-of-type(1), th:nth-of-type(2), td:nth-of-type(2)": {
    textAlign: "left",
  },
};

export default function Table({ propsData }: { propsData: typeof typedData }) {
  const [editMode, setEditMode] = useState(false);

  const [originalValues, setOriginalValues] = useState({ ...propsData });
  const [modifiedValues, setModifiedValues] = useState({ ...propsData });

  useEffect(() => {
    console.log("running useEffect");
    setOriginalValues({ ...propsData });
    setModifiedValues({ ...propsData });
  }, [propsData]);

  const whichCourse = editMode ? modifiedValues : originalValues;
  const keyComplement = editMode ? "yes" : "not";

  const toggleEdit = () => {
    setEditMode((current) => !current);
  };

  const saveButton = () => {
    setOriginalValues(modifiedValues);
  };

  return (
    <Box sx={{ textAlign: "center", pt: "10px" }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Button variant="contained" onClick={toggleEdit}>
            {editMode ? "Discard changes" : `Edit Mode - ${keyComplement}`}
          </Button>
        </Grid>
        {editMode && (
          <Grid item xs>
            <Button variant="contained" onClick={saveButton}>
              Save changes
            </Button>
          </Grid>
        )}
      </Grid>
      <Box sx={tableStyles}>
        <Box component="table" sx={{ overflowX: "auto" }} tabIndex={0}>
          <thead>
            <tr>
              <Box component="th">ID</Box>
              <Box component="th">School Name</Box>
              {whichCourse.bundles.map((thisBundle) => {
                return (
                  <Box component="th" key={`th-${thisBundle.id}-${keyComplement}`}>
                    {thisBundle.name}
                  </Box>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {whichCourse.schools.map((thisSchool, currentIndex) => {
              return (
                <tr key={`td-${thisSchool.id}-${keyComplement}`}>
                  <Box component="td">{thisSchool.id}</Box>
                  <Box component="td">{thisSchool.name}</Box>
                  {whichCourse.bundles.map((thisBundle) => {
                    const isEnabled = thisSchool.licensedproducts.includes(thisBundle.id);
                    return (
                      <Box component="td" key={`td-${thisBundle.id}-${keyComplement}`}>
                        {editMode ? (
                          <Checkbox
                            size="small"
                            checked={isEnabled}
                            sx={{
                              color: "#000000",
                              "&.Mui-checked": {
                                color: "#3F51B5",
                              },
                            }}
                            onChange={() =>
                              setModifiedValues((currentValue) => {
                                if (isEnabled) {
                                  currentValue.schools[currentIndex].licensedproducts = currentValue.schools[currentIndex].licensedproducts.filter((value) => value !== thisBundle.id);
                                } else {
                                  currentValue.schools[currentIndex].licensedproducts.push(thisBundle.id);
                                }
                                return { ...currentValue };
                              })
                            }
                          />
                        ) : (
                          isEnabled && <CheckIcon sx={{ verticalAlign: "middle" }} />
                        )}
                      </Box>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
}
