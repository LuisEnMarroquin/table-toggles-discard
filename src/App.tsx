import { v4 as uuidv4 } from "uuid";
import { Container } from "@mui/material";

import Table from "./Table";

const ID1 = uuidv4();
const ID2 = uuidv4();
const ID3 = uuidv4();

export const typedData = {
  bundles: [
    {
      id: ID1,
      name: "High School Core",
    },
    {
      id: ID2,
      name: "Middle School Core",
    },
    {
      id: ID3,
      name: "Elementary School Core",
    },
  ],
  schools: [
    {
      id: uuidv4(),
      name: "First School",
      licensedproducts: [ID1, ID2],
    },
    {
      id: uuidv4(),
      name: "Second School",
      licensedproducts: [ID2, ID3],
    },
  ],
};

export default function App() {
  return (
    <Container>
      <Table propsData={typedData} />
    </Container>
  );
}
