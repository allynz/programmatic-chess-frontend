import TestCases from "../../components/submission/testCasesAccordion/testCases";

const Page = () => {
  const res = JSON.parse(`
  [
    {
      "input": [
        "g1-h1",
        "h1-g1",
        "g1-h1"
      ],
      "output": [
        "g3-f3",
        "f3-g4",
        "g4-g3"
      ],
      "board": "X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X K X X X X X X R X X X X X X X X BK X",
      "message": "INVALID_MOVE"
    }
  ]
  `);

  return <TestCases arr={res} />
};

export default Page;

// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X