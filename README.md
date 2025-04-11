# UIowa Technical Exercise: Receipt Tool
This is my implementation of the technical exercise for UIowa's
*Application Programmer/Analyst* position.

## Instructions
### Backend
1. Go into `backend` folder
2. Run `dotnet run` to start up backend

### Frontend
1. Go into `frontend` folder
2. Run `npm i` to install dependencies
2. Run `npm run dev` to start up frontend
3. Open URL in browser

## My Tech Stack
For the frontend, I went with **React.js**. This is my go-to frontend framework
since I have a good amount of experience with it, both in professional and academic
settings. I also used my favorite UI library, called **Ant Design**.
I like it because it provides a lot of useful components that are easy to import
and customize when needed.

For the backend, I went with **.NET 9.0** and an **SQLite** database since
I have some past experience working with .NET/C# web API's. Prior to starting this
project, I was able to refresh my knowledge with a couple online tutorials. I
also referenced past projects to help troubleshoot problems (ex: CORS policy issues).

## Hour Tracking
I estimated I would take **~4 hours** to complete this project. I gave myself 1.5
hours for the frontend, 1.5 hours for backend/database, and an extra hour as cushion.
I ended up taking **~3.5 hours** to finish implementing the technical aspects of
this project. The backend/database took only an hour to setup, while the frontend
took a little bit more time so I could polish it.

## Development Process
### Business Assumptions
I assumed that receipt amounts should be at least $0.01 since negative amounts
don't make sense and $0.00 doesn't require reimbursement. I also assumed that
receipt files would only be in the form of images.

### Technical Assumptions
Given the scope of this technical exercise, I didn't organize my code optimally. If
this were a larger project, I would separate the receipt form logic from the main
`App.tsx` into its own standalone component file. In the backend, I wouldn't
put all the business logic in the controller. I would create a service layer that
would handle the database operations, leaving the controller to focus soley on 
route handling.

For TypeScript, I didn't explicitly type everything. I only added typing for
variables that were implicitly `any` type.

### Challenges
Overall, my development process was pretty smooth. Thanks to my previous experience,
I didn't run into any major hiccups. There was only one problem that took me a while
to troubleshoot.

I was working on getting the frontend to pass the form values to
the backend, but it was failing for some reason. Since I've never worked with sending
and receiving files over HTTP/HTTPS, it took some research to figure out how to 
properly set up the frontend request and backend controller. However, even when I thought
I got it right, the request was still failing.

To narrow down the problem, I first used *Postman* to send a receipt to the backend and it worked,
so I pinpointed the problem to the frontend. After examining the request payload,
I discovered the photo wasn't being stored properly. It turns out that AntD's
`<Upload />` component attempts to upload the file to a remote server by default.
I simply had to tell it not to do that, and the photo was properly stored and transmitted.
