# README

## Setting Up The Backend

### Prerequisites
*Install Ruby Version 2.7.2*
*Install PostgreSQL have a running instance on your machine*

### Initial Setup

- Clone the repository
- cd into the scheduler-backend folder
- Open the `database.yml` file, which is located in the `config` folder
- Change the username and password for whatever your username and password is for your running PostgreSQL instance
- Type the following commands, in the following order
  - `bundle i`
  - `rails db:create`
  - `rails db:migrate`

### Setting up the Database

There are initial values you will need in your database that are not already included. Specifically, you will initial database entries for `Locations` (which can already only be one of 5 predefined locations), `Activities` (these are self defined), and Location-Activity pairs, which are represented by a join table called `Location_Activity_Suggestions`

We already take care of the initial `Locations`, but since we don't know what activities you want to use, we leave that up to the developer. To create Activities and Location_Activity_Suggestions for the application to suggest, please follow the following steps:

- open the file `seeds_development.rb`, it is located in the `db` folder

- There will be example code as to what to write. Feel free to comment this out, or create your own Activities and Location_Activity_Suggestions. Be sure to write each one on it's own line.

- Once you have finished writing what Activities and Location_Activity_Suggestions you want to have in your application, close the file.

  - For reference, this is what the `Locations` table looks like for the application. You will want the `id` of the locations when creating your Location_Activity_Suggestions

  - | id   | location_type |
    | ---- | ------------- |
    | 1    | Outside       |
    | 2    | Large Inside  |
    | 3    | Small Inside  |
    | 4    | Online        |
    | 5    | Undecided     |

  - Also, there is a single Activity pre-loaded into the `Activities` table, the placeholder for an "undecided" activity. Not that you should ***NOT*** use either of the "undecided" Location or Activity entries, and they are there purely for front-end convenience.

  - | id   | name      | socialDistanceScore | hasFood | minPeople | maxPeople |
    | ---- | --------- | ------------------- | ------- | --------- | --------- |
    | 1    | undecided | 0                   | false   | 0         | 0         |

- run the command `rails db:seed` in the command line. This will populate your database with the initial entries you define.

Once you have done this, you should have all the data in your database to be up and running. Congratulations!

### Running the Backend Server

To start the backend on localhost, simply type the following command. Ensure you are in the scheduler-backend directory.

- `rails s`

Your server should start up, but give it a little bit of time if it doesn’t start right away! It usually takes anywhere from 5 - 30 seconds to start up.

### Running Backend Tests

Additionally, if you are going to want to run unit tests, you’ll want to run the following commands:

- `rails db:create RAILS_ENV=test`
- `rails db:migrate RAILS_ENV=test`
- `rspec`