This is my first big jump into a personal AWS Project.

Since most of my time is spent Googling answers and refreshers when I program, I wanted to design my own little mini Stack Overflow. I wanted an area that I could quickly look up the answers to things that I use constantly or that I found very difficult to research.

This app will be the front end to my CoderTips service on my AWS account. This will be launched via S3 bucket and CloudFront, connecting via Cognito to an API Gateway that will allow access to a DynamoDB. I also have this React app running on a AWS Codepipeline to allow quicker updates.

Many of the functions I am putting in are of course overkill, but I wanted to also use this as practice for many of the standard AWS Services that I am going to run into in the real world.

Minimum Product:

Read Access to a DB where I have to manually add the notes
Planned Features:

 - Easier way to add the notes via the App

 - Comments, or "Up Vote" System

Unicorn Features:

 - Eventual Personal Notes sections (For each user)

 - A separate search to see other peoples notes