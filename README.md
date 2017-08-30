# html_fetcher_queue


# Installation / Setup

Ensure Node.js is installed on your machine. To install, run

`brew install node`

Install Node Dependencies

`npm install`

Start Server

`npm start`


# mLabs Credentials

MongoDB server is hosted with mLab Database-as-a-Service

Create config.js file in /config following the example in config.example.js.

Please contact Alan Zheng (aszheng12@gmail.com) for credentials.


# API Usage

To submit a new ticket, imput following curl cmd with your URL:
```
curl -d 'url=http://www.example.com' http://localhost:3000/submit
```

To check the status of a job, input the following into your broswer
```
http://localhost:3000/status/[jobID]
```

# Example 

www.google.com submission. Check status immediately after submission. Check status after ~1 min
```
curl -d 'url=http://www.google.com' http://localhost:3000/submit
```

```
http://localhost:3000/status/1

```
