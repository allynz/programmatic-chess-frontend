import TestCases from "../../components/submission/testCasesAccordion/testCases";

const Page = () => {
  const res = JSON.parse(`
  [
    {
      "input": [
        "STATUS:INVALID_MOVE"
      ],
      "output": [
        "b8-b1"
      ],
      "board": "X R X X X X X X BK X X X X X X X X X X X X X X X X X X X X X X X X K X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X",
      "message": "INVALID_MOVE"
    }
  ]
  `);

  return <TestCases arr={res} />
};

export default Page;