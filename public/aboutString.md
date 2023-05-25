# Coding Chess
- `CodingChess` is a platform/website for solving interesting programming problems 
- Most of the problems are interactive and related to the game of `chess` hence the name of the platform!

# Pages
The website consists of multiple pages which are listed below for ease of navigation:

## Homepage
- This is the first page that the user sees on entering codingchess.com
- It can also be reached through clicking the `CodingChess` icon on the Navigation bar at the top
- [img]

## Problems
- You can view the list of problems available on this website on this page. Clicking on the problem image will take you to the actual problem page
- When logged in, it will also show which problems are already solved by the user
- [Problems page not logged in image]

### Specific Problem Page
- This page shows the details of a particular problem, and allows you to submit your solution for the same
- You can view deatils like `problem statement`, `solution`, `submission details`(for logged in users) and `playground` on this page 
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
- It can be reached through submissionId links across the website
- Few details you can view here are:
    - The submission code
    - Details of submission run like `status`, `time`, `memory` etc.
    - Details of test cases with i/p and o/p of submission
    - Chessboard with moves based on the submission run (only for problems relating to chess)
- This way you'll be able to analyze and debug solutions for the same

[Submission page image with various features gif]

## About Page
- This page contains info about the site, different pages, interaction details, submission guidelines, FAQs etc. which will help you navigate the site and resolve any doubts or issues

# Submission Guidelines

## Details
- Only logged in users can submit solutions
- You can submit solutions to your code by going to the specific problem page, and typing in the code in the editor, then click on the submit button below
- It will submit the solution and update the status of submission as and when submission completes
- Details:
    - Languages supported: `C++17` (currently only this language is supported, more coming in the future!)
    - `gnu_pbds` library is not supported, only <bits/stdc++.h>
    - Max chars: Less than 10,000

<!-- Make this more easy to read for beginners -->
## Interaction Details
- The submission is judged by a grader
- We interact with the grader using `stdin`/`stdout` streams, in C++ this mostly done using `cin`/`cout` or `scanf`/`printf` (Read more about input/output for c++ [here])
- The grader reads input from `stdout` and submits input to the `stdin` stream 
- In the end, you need to input Success or Failure from the grader 
- There is a move limit for every problem at 200 moves

### Interactive Problem Details
- Most of the problems are interactive in nature hence require special interaction
- We need to flush the output when writing to `output stream`, in C++ this can be done using `endl` after `cout` or `scanf` (Read more about flushing O/P [here])
- Note: `endl` is recommended 
<!-- TODO: Check for flushing in test, what all work -->

[Insert code example here]

### Statuses
After your submission run is complete, you will be presented with it's details which contain the following info:

Status: 
- Denotes the status of submission. There are two types of statuses, one for your submission, and one for each test case
- If the program completes successfully, you will be presented with a success status, else unsuccessful status
    - In case of unsuccessful status, we can look at the test cases for more info
    - The various failure status that can be present are:
        - COMPILATION ERROR
            - Program is compiled on c++17
        - TLE, SIGXCPU
        - MLE, SIGABRT, SIGSEGV
        - MOVE_LIMIT_EXCEEDED
            - for problems involving move limit
        - UNKNOWN ERROR

 The reasons may not be always apparent, but if it's not success, there's something wrong with your submission Check the moves to compare outputs. Check the solution to see if your logic, output format etc. matches with the solution Submission may take around 2-3 mins to complete

# Misc

## Platforms
Desktop - best viewed on 13 inch monitor
Browsers - all modern browsers

## Data Security
Public code, but cannot view right now other's code
Login data storage, and privacy details [to be added]

# FAQ
Non-saved submissions are not saved, so submit No ML solutions - only procedural Each submission may take around 2 minutes to process Must use permission from site admin before re-using the questions or any code

FAX. There are limit to problem submissions

# Contact Details
site@site.com

Responses may take around a week for genuine issues If you find an issue in the platform or with a problem etc., please do email on the above mail-id

Social media links
