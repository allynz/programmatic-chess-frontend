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
- This page shows the details of a particular problem and allows you to submit your solution for the same
- You can view details like `problem statement`, `solution`, `submission details` (for logged-in users), and `playground` on this page 
- There is an editor on the right of the screen where you can write the solution to the problem and submit it for assessment. Submission is only allowed if you are signed in to the website
- See more information in the `Submission guidelines` section for writing a good submission
- There is an option to resize the screen horizontally as per your preference 
- [all features gif]

## My Submissions
- This page lets you view the details of all your submissions such as the `status of submission`, `time taken`, `memory taken` etc.
- Clicking on the `submission id` of any particular submission will take you to that submission's detail page
- [gif of scrolling through the list and clicking on submissionId]

## Submission Details Page
- This page lets you view the complete details of a particular submission
- It can be reached through `submission id` links across the website
- A few details you can view here are:
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

<!-- Make this easier to read for beginners -->
## Interaction Details
- Most of the problems are interactive in nature, i.e the submission is judged by a grader program which changes output based on user inputs
- We interact with the grader using `stdin`/`stdout` streams, in C++ this is mostly done using `cin`/`cout` or `scanf`/`printf` (Read more about input/output for C++ [here](https://cplusplus.com/doc/tutorial/basic_io/))
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
        - `STALEMATE, INSUFFICIENT PIECES` 
            - chess game ends but not in a `checkmate` status. Refer [endings] section for more details
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

## Game Endings
- A chess game can end in many ways, such as `CHECKMATE, STALEMATE, INSUFFICIENT_PIECES`, etc. when played correctly with valid moves
- Only `CHECKMATE` will be considered as a successful result in problems (unless mentioned otherwise), the rest will result in an unsuccessful result
- The problem grader may or may not consider a few `draw` scenarios but eventually, it will result in an `UNSUCCESSFUL` status since there is no way to `checkmate` the opponent

# Miscellaneous

## FAQ
Non-saved submissions are not saved, so submit No ML solutions - only procedural Each submission may take around 2 minutes to process Must use permission from site admin before re-using the questions or any code

Do not abuse the system/malicious code otherwise you will be banned/blacklisted

FAX. There are limit to problem submissions

you need a google acccount for login
Supported browsers - The website is supported on almost all modern browsers. It is best viewed on a 13 inch monitor

submissions could take around a min to complete judging

C++ specific version and platform that they are run on, compiler details, compilation command etc.

main function must return int, otherwise compilation error, and return 0

submission limits and when does ti reset

## Privacy Policy
- This website collects minimal personal data of the users. Its primary use is for authentication and analytics
- The website requires to have a `Google` account and sign-in/registering using that
- Detailed privacy policy: [Link](https://www.freeprivacypolicy.com/live/7743c1a3-2b8f-405a-8892-e1441e036a21)

## Terms of Use
- TODO: Seems I have to write my own as all others are pricey
- do not use things/data from here to other websites
- links should be mentioned that it was taken from this site
- The submitted codes by the user are considered public, able to be seen by other users
- should not have multiple accounts
- codechef.com/codeofconduct
- https://codeforces.com/terms#:~:text=With%20respect%20to%20Your%20Content,on%20any%20third%20party's%20rights.

## Contact Details
Email-id: support@codingchess.com

If you wish to contact us, you could do so by sending an email on the above mail-id
You could also contact us in case you encounter issues with the platform/problems, etc.

