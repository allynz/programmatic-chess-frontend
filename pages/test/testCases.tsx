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
      "input": [
        "g1-h1",
        "h1-g1",
        "g1-h1"
      ],
      "output": [
        "c2-d1",
        "f3-g4",
        "g4-g3"
      ],
      "board": "X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X R X Q X X X X X X BK X X X X",
      "message": "INVALID_MOVE"
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
