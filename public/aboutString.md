# Coding Chess
- `CodingChess` is a platform/website for solving interesting programming problems 
- Most of the problems are interactive and related to the game of `chess` hence the name of the platform!

# Website Information
The website consists of multiple pages which are listed below for ease of navigation:

## Homepage
- This is the first page that the user sees on entering codingchess.com
- It can also be reached by clicking the `CodingChess` icon on the Navigation bar at the top
- [img]

## Problems
- You can view the list of problems available on this website on this page. Clicking on the problem image will take you to the actual problem page
- When logged in, it will also show which problems are already solved by the user
- [Problems page not logged in image]

### Specific Problem Page
- This page shows the details of a particular problem, and allows you to submit your solution for the same
- You can view details like `problem statement`, `solution`, `submission details` (for logged in users) and `playground` on this page 
- There is an editor on the right of screen where you can write the solution to the problem and submit it for assessment. Submission is only allowed if you are signed in to the website
- See more information in `Submission guidelines` section for writing a good submission
- There is an option to resize the screen horizontally as per your preference 
- [all features gif]

## My Submissions
- This page lets you view the details of all your submissions such as `status of submission`, `time taken`, `memory taken` etc.
- Clicking on the submissionId of any particular submission will take you to that submission's detail page
- [gif of scrolling through the list and clicking on submissionId]

## Submission Details Page
- This page lets you view the complete details of a particular submission
- It can be reached through `submissionId` links across the website
- Few details you can view here are:
    - The submission code
    - Details of submission run like `status`, `time`, `memory`, etc.
    - Details of test cases with i/p and o/p of submission
    - Chessboard with moves based on the submission run (only for problems relating to chess)
- This way you'll be able to analyze and debug solutions for the same

[Submission page image with various features gif]

## About Page
- This page contains info about the site, different pages, interaction details, submission guidelines, FAQs etc. which will help you navigate the site and resolve any doubts or issues

# Submission Guidelines

## Details
- Submissions are only allowed for users that are logged in to the website
- You can submit solutions to your code by going to the specific problem page, writing code in the editor and submitting it
- The status of submission will be updated as and when it completes. Assessment of submission usually takes around 2 mins, but could increase based on website traffic
- More Details:
    - Programming Languages supported: `C++`(C++17 specifically. Currently only this language is supported, more coming in the future!)
    - Max chars for a submission: Less than 10,000 (TODO: Update)
    - Max submissions per day per user: 30 (TODO: Update)
    - `<bits/stdc++.h>` library is supported for C++

<!-- Make this more easy to read for beginners -->
## Interaction Details
- Most of the problems are interactive in nature, i.e the submission is judged by a grader program which changes output based on user inputs
- We interact with the grader using `stdin`/`stdout` streams, in C++ this mostly done using `cin`/`cout` or `scanf`/`printf` (Read more about input/output for C++ [here](https://cplusplus.com/doc/tutorial/basic_io/))
- The grader reads input from `stdout` and submits input to the `stdin` stream (Refer example below for details)
  
- At the end of program, the grader provides a `success` or `failure` result depending on the program execution. Be sure to input the same and not ignore it
- If the grader provides a `failure` status, be sure to exit your program 
- Read more about statuses in the `Status` section of this page
  
- Most of the problems are interactive in nature hence require special interaction like flushing output
- We need to flush the output when writing to `output stream`, in C++ this can be done easily using `endl` after `cout` (Note: `endl` is recommended for flushing)

- Example code for interaction(actual solution depends on specific problem):
    ```
    using namespace std;

    bool isProgramOver = false;
    string graderOutput;

    while (isProgramOver == false) {
        string solverOutput = computeOutput(graderOutput);

        cout << solverOutput << endl;
        cin >> graderOutput;

        if (graderOutput == SUCCESS 
            || graderOutput == FAILURE) {
            isProgramOver = true;
        }
    }

    // function to compute next output of your program
    string computeOutput(string input);

    ```

### Statuses
After your submission is assessed, you will be presented with it's `status` which contain the following info:

`Status:`
- Denotes the status of submission. There are two types of statuses, one for your submission, and one for each test case (if the problem contains multiple test cases)
- If the program completes successfully, you will be presented with a `SUCCESS` status, else `UNSUCCESSFUL` status
    - In case of unsuccessful status, we can look at the test cases for more info
    - The various failure status that can be present are:
        - `COMPILATION ERROR`
            - program failed to compile
        - `TLE, SIGXCPU`
            - time limit exceeded during execution (time limits can be different for problems)
        - `MLE, SIGABRT, SIGSEGV`
            - memory exceeded, invalid access and similar issues
        - `MOVE_LIMIT_EXCEEDED`
            - output limit exceeded for problems involving moves
        - `INVALID_OUTPUT, INVALID_MOVE`
            - wrong output, output not adhering to requirement etc.
        - `UNKNOWN_ERROR`
            - errors other than the ones mentioned 

- If the submission is unsucessful, there are few ways to debug it
- The submission page provides details of your output for each test case which may pinpoint the issue
- Few things to check are: solution logic, output format, output value etc.
 
# Chess related information
- Most of the problems on this platform are related to the game of chess. Users are advised to familiarize themselves with the game
- Few important tips w.r.t the problems are as follows:
  
## Square notation
- [Empty image with square notations]
- Squares on a chessboard are represented using two coordinates - one alphabetic and one numeric
- This is also called algebraic notation in chess

## Chess move input/output
- [images of moves with notation]
- For simplicity's sake, input/output of chess moves follow `startSquare-endSquare` notation. This notation covers all possible moves like captures, checks etc.
- Castling is not allowed, en passant is not allowed

## Board
- Many times, chessboard will be given as an input to the user with the current state of pieces
- Input will be given as a space-separated 64 character string representing the 8x8 chessboard where `X` will be used to denote empty square on the board
- For example, for the following 8x8 board:
  
    [image of board starting position]
    ```
    BR BN BB BQ BK BB BN BR 
    BP BP BP BP BP BP BP BP 
    X X X X X X X X 
    X X X X X X X X 
    X X X X X X X X 
    X X X X X X X X 
    P P P P P P P P 
    R N B Q K B N R
    ```
    Input will be given as follows on a single line : 
    - `BR BN BB BQ BK BB BN BR BP BP BP BP BP BP BP BP X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X P P P P P P P P R N B Q K B N R
`
- The pieces are labelled as follows:
    - `K` - white king
    - `Q` - white queen
    - `B` - white bishop
    - `R` - white rook
    - `N` - white knight
    - `P` - white pawn
    - `BK` - black king
    - `BQ` - black queen
    - `BB` - black bishop
    - `BR` - black rook
    - `BN` - black knight
    - `BP` - black pawn
    - `X` - empty square

# Miscellaneous

## Supported browsers
The website is supported on almost all modern browsers. It is best viewed on a 13 inch monitor

## Data Security
- The submitted codes by the user are considered public, able to be seen by other users
- The website does not collect any personal data of the users
- TODO: Generate privacy policy

## FAQ
Non-saved submissions are not saved, so submit No ML solutions - only procedural Each submission may take around 2 minutes to process Must use permission from site admin before re-using the questions or any code

Do not abuse the system/malicious code otherwise you will be banned/blacklisted

FAX. There are limit to problem submissions

## Contact Details
site@site.com

Responses may take around a week for genuine issues If you find an issue in the platform or with a problem etc., please do email on the above mail-id

Social media links
