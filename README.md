### to run this application
```bash
docker compose up --build
```
### Front end
[http://localhost:3000/](http://localhost:3000/)

### Apollo server
[http://localhost:4000/](http://localhost:4000/)

#### Covered Core Functionality
- Risk Management (all covered)
- Category Management (all covered)
- Tables for Displaying Data (all covered)
  <br/> 
  There are self describing buttons to switch views for Categories and Risks
  <br/>
  Switch to toggle resolved/unresolved risks you can find on top left before the table header
  <br/>
  Input responsible for record creation appears as first table row

#### Covered Technical Requirements
- n+1 Problem solved to get categories in risks, no need to add data loaders to createdBy as we don't use this type of query
- Inline Status Update covered
- Destructive Actions Confirmations covered with the use ofbrowser api, for sake of simplicity
- Pagination covered (data fetched per page)
  
#### Covered Bonus Features
- Inline editing for required fields implemented with custom component
- Search bar (there are two search inputs for name and description with dynamic updates of tables, regex is used)
- Seeds added on docker container creation
- UX improvements (used Tailwind css)
