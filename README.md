# Well-Buddies Backend

Link to mockups: https://www.figma.com/files/project/56608073/WellBuddies?fuid=1101923148892677410 <br>
Link to api server: https://well-buddies-api-ac5z.onrender.com

## Architecture

Backend
- **src**
    - **controllers**: contains profile, emotion, and events controllers
    - **models**: contains profile, emotion, and events models
    - **services**: contains the gooogle api verification api functions used to verify the user's Google account on the backend
    - router.js: contains the routers for our project
- .env: contains our `AUTH_SECRET` code and the `MONGODB_URI`

## Setup

We used some of the code from the React Native short assignment as part of this set up. 

``` bash
git clone [our repo link]
cd project-api-well-buddies
npm install
npm start
```

## Deployment

Our backend is deployed at: [https://well-buddies-api-ac5z.onrender.com](https://well-buddies-api-ac5z.onrender.com)

## Authors

Eunice You-Chi Liu,
Annie Qiu,
Elizabeth Frey,
Alina Chadwick,
Rheanna Nesa Toney,
Zhiyan Zhong

## Acknowledgments
Thank you for our group's TAs, Catherine and Samiha, and Tim's help.
