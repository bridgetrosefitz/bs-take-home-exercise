# Full-Stack Engineering Take-Home Exercise

## Bridget Fitzgerald - Notes

### Setup instructions

### Prerequisites

- Node.js (v14+ recommended) and npm
- PostgreSQL (`createdb` required) https://www.postgresql.org/download/
- Redis https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/

1. Clone this updated repo

```bash
git clone <repository-url>
cd <repository-name>
```

2. Install packages

```bash
cd api
yarn install
yarn start
```

3. Create and set up database

```
createdb berry-street-takehome-1
```

4. Create a .env file

Create a .env file in the api directory and add the following line.

```
DATABASE_URL=postgres://localhost:5432/berry-street-takehome-1
```

NOTE: Depending on your postresql set-up, you may need to also include a username and password in the `DATABASE_URL`. Replace in the below URL with your values as required.

```
postgres://username:password@localhost:5432/berry-street-takehome-1
```

In this case, you will also need to add user and password as properties on the `pg` config object on line 4 in `index.js`

```
const pool = new Pool({
  user: "your_username",
  password: "your_password",
  database: "berry-street-takehome-1",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

Also, add `.env` as a line in the .gitignore file.

5. Run migrations

```
npm run migrate up
```

https://classic.yarnpkg.com/en/package/node-pg-migrate

6. Run server (incl. redis server), and app

```bash
yarn start
cd ../client
yarn start
```

### Design decisions

On the frontend...

- I created some simple reusable components - Card and Pill
- I opted for css stylesheets using classes (conditional classes in some cases). I created an extra prop on the reusable components so the consumer of these components can add custom styling
- I conditionally made the score show red or green as a quick visual indicator of the 'quality' of the products
- I created a pill to visualize the characteristics, for additional information when browsing products, and for some small additional context for the score

On the backend...

- I chose a sql database because I thought the data could be organized into clear relationships with a join table connecting products and characteristics
- I decided to set up my db using pg, because I had to create and seed three tables only. I thought it was simpler in terms of set-up and overhead compared to a more substantial ORM (e.g. Sequelize)

### Performance considerations

- Given the nature of this app as showcasing products, and the instructions stipulating that I should consider caching strategies for performance / optimize for performance at scale, I generally made an assumption that we could have 1000s+ of products and a large number of characteristics
- The above assumption influenced a few of my choices:
  - distributed caching using Redis, so we can store common query results and share them across multiple users / machines (otherwise, depending on the TTL, a user's experience could be frequently affected by a noticeable latency). I assumed that requests to the products page would be very similar across many users. I used a cache-aside approach based on an assumption that the ratio of read to write for product details will be high (e.g. substantially more users viewing products than store-owners or website admins updating product info)
  - I considered calculating the product scores on the front-end and then caching them; I also considered calculating a score on-create of a product and storing it in the db; however, this would require logic to update the score if any of the score values for a characteristic changed, or if characteristics were added / removed from a product
  - I therefore went for the approach of calculating the score in a sql query directly to the db, using the score_value attribute on the characteristics table. This calculation is much more efficient when done by the db, and will not block the JS thread on the server. An alternative was to use a worker to open a new thread in the server, but it is much more efficient to do this directly from the DB
- I used pg's Pool so that connections can be shared in times of high traffic, to avoid overloading the server

### If I had more time, I would...

- actually implement the frontend filtering functionality :( I would enable filtering for multiple characteristics as part of this
- implement error handling properly on both the server and the frontend
- implement testing
- add features to the frontend, including perhaps a photo of each product, stored on a CDN
- add some kind of context for what the score is in the UI and how the score is calculated
- improve accessibility, including aria labels
- consider using em instead of px, holistically across the app (also maybe creating universal styling variables like sm / md / lg font-size)
- instead of pg, implement a full ORM with migrations
- thoroughly test setup instructions on another device

---

👋 Hello from Berry Street!

Thanks for taking the time to work on our coding exercise. We've designed this to be an engaging way for you to show us how you think about building products that make a difference. Don't worry too much about getting everything perfect - we're more interested in seeing your approach and thought process.

**Time Expectation:** While we suggest spending 3-4 hours on core requirements, feel free to invest more time if you're excited about additional features or improvements that showcase your product thinking. We appreciate your enthusiasm, but also value your time - so no pressure to go overboard!

## Overview

This is a full-stack application built with Node.js/Express backend and React frontend. The backend includes a mock API (powered by `json-server`) that simulates a product catalog service.

### Product Thinking Opportunity

We encourage you to think beyond just the technical implementation. This exercise is intentionally open-ended to allow you to:

- Make thoughtful product decisions about the user experience
- Fill in any gaps in the requirements based on reasonable assumptions
- Add features that you think would benefit the end user
- Document your product decisions and their rationale
- Consider real-world scenarios and edge cases

Strong submissions often go beyond the basic requirements to create a more complete and polished product experience. Feel free to:

- Enhance the UI/UX with additional features that make sense
- Add helpful product metadata or functionality
- Improve error messaging and user feedback
- Consider accessibility and internationalization
- Add data visualizations or analytics features
- Implement any other features you think would be valuable

Just be sure to document your choices and reasoning in your submission.

### Data Structure

Products have the following structure:

```json
{
  "id": "string",
  "name": "string",
  "characteristics": ["string"] // e.g., ["Humane", "Locally Produced", "Healthy"]
}
```

Available characteristics: "Humane", "Locally Produced", "Healthy", "Plastic-Free", "Unhealthy", "Wasteful", "Vegan"

## Tasks

### Backend (Express API)

1. Implement a route that filters products by characteristic:

   - Endpoint: GET `/products?characteristic=value`
   - Should efficiently handle multiple concurrent requests
   - Consider caching strategies for performance

2. Create a product scoring system:
   - Endpoint: GET `/products/scores`
   - Scoring rules:
     - +1: "Humane", "Locally Produced", "Healthy"
     - +2: "Plastic-Free"
     - -1: "Unhealthy", "Wasteful"
   - Return products with their calculated scores
   - Optimize for performance at scale

### Frontend (React)

3. Build a responsive product grid:

   - Display products in a 3-column layout
   - Show product name and score
   - Implement loading states
   - Handle error cases

4. [Bonus] Add characteristic filtering:
   - Create a UI for selecting multiple characteristics
   - Update the product grid based on selected filters
   - Maintain a clean and intuitive user experience

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Git

### Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Set up and start the backend:

   ```bash
   cd api
   yarn install
   yarn start
   ```

   The API server will start on port 3005, and the JSON server on port 4000.

3. In a new terminal, set up and start the frontend:
   ```bash
   cd client
   yarn install
   yarn start
   ```
   The React development server will start on port 3000 and should automatically open in your default browser.

### Verifying Setup

- Backend API should be accessible at: http://localhost:3005
- JSON Server should be accessible at: http://localhost:4000/products and should return product data
  <details>
    <summary>Example response (click to expand) - Shows 6 products including "Sprockets", "Cogs", etc.</summary>

  ```json
  [
    {
      "name": "Sprockets",
      "characteristics": ["Plastic-Free", "Locally Produced"],
      "id": "dcea"
    },
    {
      "name": "Cogs",
      "characteristics": ["Plastic-Free", "Wasteful"],
      "id": "0f8f"
    },
    {
      "name": "Face Cream",
      "characteristics": ["Humane", "Vegan", "Locally Produced"],
      "id": "9880"
    },
    {
      "name": "Muskers",
      "characteristics": ["Wasteful", "Unhealthy"],
      "id": "5015"
    },
    {
      "name": "Hand Sanitizer",
      "characteristics": ["Vegan", "Humane"],
      "id": "04dd"
    },
    {
      "name": "Lettuce",
      "characteristics": ["Vegan", "Humane", "Healthy"],
      "id": "0219"
    }
  ]
  ```

  </details>

- Frontend should be accessible at: http://localhost:3000

### Port Configuration

- Express Server: 3005
- JSON Server: 4000
- React App: 3000

## Submission Instructions

1. Fork this repository to your own GitHub account
2. Make your changes in your forked repository
3. Update the README with:
   - Setup instructions
   - Your design decisions
   - Performance considerations
   - What you would do differently with more time
4. Email the link to your forked repository to blake@berrystreet.co
   - Ensure your forked repository is public

## Troubleshooting

If you encounter port conflicts:

1. Check if the ports (3000, 3005, 4000) are available
2. Modify the port numbers in the respective configuration files
3. Update the `BASE_API_URL` in the frontend accordingly

For any questions, please reach out to blake@berrystreet.co
