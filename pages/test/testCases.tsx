import { toPng } from 'html-to-image';
import TestCases from "../../components/submission/testCasesAccordion/testCases";

const Page = () => {

  const captureThis = () => {
    const elem = document.querySelector('.okdude') as HTMLElement;

    toPng(elem, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const res = JSON.parse(`
  [
    {
      "output": [
          "b3-a2"
      ],
      "status": "UNSUCCESSFUL",
      "input": [
          "STATUS:INVALID_MOVE"
      ],
      "message": "",
      "board": "BR BN BB BQ BK BB BN BR BP BP BP BP BP BP BP BP X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X P P P P P P P P R N B Q K B N R"
  }
  ]
  `);

  return (<>
    <TestCases arr={res} />
    <button onClick={captureThis}>Capture Image</button>
  </>);
};

export default Page;

// can change `fen` in singleAccordian for testing invalid board positions

// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X 
// X X X X X X X X
