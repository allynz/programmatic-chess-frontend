# Coding Chess
This is a platform for solving interesting programming problems using code  
Most of the problems are interactive and related to chess hence the name of the website!

Details about the problem are given below:

# Pages
The website consists of few important pages which are listed below:

## Homepage
The first page that the user sees on entering codingchess.com  
Can also be reached through clicking the CodingChess icon on the Navigation bar at the top

## Problems
You can view the list of problems available on this website  
When logged in, it will also show which problems are already solved by the user

[Problems page not logged in image] [Problems page logged in image]

### Specific Problem Page
This page shows the details of a particular problem, and allows you to submit your solution for the same  
You can view the `problem statement`, `solution`, `submission details`(for logged in users) and `playground`
[Cycling through tabs gif]  
Also write submission and submit it for assessment  
See more in submission guidelines for writing a good submission  
[writing submission gif]  

Can also resize it using divider   
A green tick will be displayed if you have already solved the problem Submission is only allowed if you are signed in
[Divider using gif]

## My Submissions
This page lets you view the details of all your submissions such as `status of submission`, `time taken`, `memory taken` etc.  
We can click on the submissionId of any particular submission to view it's corresponding page

[gif of scrolling through the list and clicking on submissionId]

### Submission Details Page
This page lets you view the complete details of a particular submission
Can be reached through submissionId links  
You can view: 
<!-- TODO: Adjust line spacing here -->
- The submission code
- Details of submission run like `status`, `time`, `memory` etc.
- Details of test cases with i/p and o/p of submission
- Chessboard with moves based on the submission run (only for problems relating to chess)

This way you'll be able to analyze and debug solutions for the same

[Submission page image with various features gif]

## About Page
This page contains info about the site, different pages, interaction details, submission guidelines, etc. which will help you navigate the site and resolve any doubts or issues

# Submission Guidelines
Only logged in users can submit solutions  
You can submit solutions to your code by going to the specific problem page, and typing in the code in the editor, then click on the submit button below  
It will submit the solution and update the status of submission as and when submission completes  

Details:
- Languages supported: `C++17` (currently only 1 language is supported, more coming in the future!)
- `gnu_pbds` library is not supported, only <bits/stdc++.h>
- Max chars: Less than 10,000

## Interaction Details
The submission is judged by a grader  
<!-- Make this more easy to read for beginners -->
We interact with the grader using `stdin`/`stdout` streams, in C++ this mostly done using `cin`/`cout` or `scanf`/`printf` (Read more about i/p output for c++ [here])  
The grader reads input from `stdout` and submits input to the `stdin` stream 
In the end, you need to input Success or Failure from the grader 
There is a move limit for every problem at 200 moves

### Interactive Problem Details
Most of the problems are interactive in nature hence require special interaction  
We need to flush the output when writing to `output stream`, in C++ this can be done using `endl` after `cout` or `scanf` (Read more about flushing O/P [here])
Note: `endl` is recommended 
<!-- TODO: Check for flushing in test, what all work -->

[Insert code example here]

### Statuses
After your submission run is complete, you will be presented with it's details which contain the following info:

Status: 
- Denotes the status of submission. There are two types of statuses, one for your submission, and one for each test case
- If the program completes successfully, you will be presented with a success status, else unsuccessful status
    - In case of unsuccessful status, we can look at the test cases for more info
    - The various status that can be present are:
        - COMPILATION ERROR
        - TLE, SIGXCPU
        - MLE, SIGABRT, SIGSEGV
        - UNKNOWN ERROR

 The reasons may not be always apparent, but if its not success, there's something wrong with your submission Check the moves to compare outputs. Check the solution to see if your logic, output format etc. matches with the solution Submission may take around 2-3 mins to complete

 [Insert various status display gif here]

# Misc

## Forum?
Need a place where people can post and discuss errors/bugs etc. - Reddit/Twitlonger - see something that can be ported easily into your platform

## Helpful Snippets
Snippets which are helpful

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
