# API Documentation

[![Maintainability](https://api.codeclimate.com/v1/badges/bf39ec6641781d731b81/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/Workout-Builder-be/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/bf39ec6641781d731b81/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/Workout-Builder-be/test_coverage)

#### Backend delpoyed at [Heroku](https://labs20-workout-builder.herokuapp.com) <br>


## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Node.js with Express & Knex

- Powerful performance
- Ease of coding with JavaScript
- Perfect for scalable network applications
- Express is commonly considered the standard framework for the majority of Node.js applications
- Knex is simple and optimal for server/database interaction















## Endpoints


### AUTH Routes

----
#### _Register a user with local account_

* **Method**

  `POST`

* **Endpoint**

  `/auth/register`

* **Data Params**

    ```
    {
      first_name: [string]
      last_name: [string]
      email: [string]
      password: [string]
    }
    ```

* **Success Response**
    * **Code:** 201

      **Content:** 
      ```
      { 
        token: [jwt],
        message: 'Logged In',
        first_name: [first name],
        last_name: [last name]
      }
      ```

* **Error Response**
    * **Code:** 400

      **Reason:** Email already exists and registered via Google social login

      **Content:** `{ message: 'Google social login was done previously, cannot register local login' }`

    * **Code:** 400

      **Reason:** Email already exists and registered via local login

      **Content:** `{ message: 'local login was done previously' }`

----
#### _Login a user with a local account_

* **Method**

  `POST`

* **Endpoint**

  `/auth/login`

* **Data Params**

    ```
    {
      email: [string]
      password: [string]
    }
    ```

* **Success Response**

    * **Code:** 200

      **Content:** 
      ```
      { 
        token: [jwt],
        message: 'Logged In',
        first_name: [first name],
        last_name: [last name]
      }
      ```

* **Error Response**
    * **Code:** 401

      **Reason:** Incorrect email or password; cannot find match in database

      **Content:** `{ message: 'Failed to login. Incorrect email or password' }`

    * **Code:** 400

      **Reason:** Email already exists and logged in via Google social login

      **Content:** `{ message: 'Google social login was done previously, cannot local login' }`

----
#### _Login a user with Google social login_

* **Endpoint**

  `/auth/google`

* **Redirect URL**

  `{deployed url}/auth`

* **URL Params**

  token, first_name, last_name



### Program Routes

----
#### _Create a program with workouts and link workouts to exercises_

* **Method**

  `POST`

* **Endpoint**

  `/programs`

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "name": "progC",
        "description": "progC desc",
        "length": 21,
        "phase": "strength",
        "workouts": [
            {
                "name": "work1", 
                "description": "work1 desc", 
                "day": 1, 
                "exercises": [
                    {"id": 1, "order":1, "exercise_details": "exD1_work1"}, 
                    {"id": 2, "order":2, "exercise_details": "exD2_work1"}, 
                    {"id": 3, "order":3, "exercise_details": "exD3_work1"} 
                ]
            }, 
            
            {
                "name": "work2", 
                "description": "work2 desc", 
                "day": 2, 
                "exercises": [
                    {"id": 4, "order":1, "exercise_details": "exD4_work2"}, 
                    {"id": 5, "order":2, "exercise_details": "exD5_work2"}, 
                    {"id": 6, "order":3, "exercise_details": "exD6_work2"} 
                ]
            }, 
          
            {
                "name": "work3", 
                "description": "work3 desc", 
                "day": 3, 
                "exercises": [
                    {"id": 1, "order":1, "exercise_details": "exD1_work3"}, 
                    {"id": 6, "order":2, "exercise_details": "exD7_work3"} 
                ]
            }
        ]
    }
    ```

* **Notes**

  ```
  This is for the creation of a single program for a coach. 
  The token must be sent along with the request. The coach_id will
  be obtained from the token.
  ```

* **Success Response**
    * **Code:** 201

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
            id: 1, 
            name: "Program 1", 
            description: "program1 description", 
            coach_id: 1, 
            length: 10, 
            phase: "strength",
            workouts: [
                {
                    id: 1, 
                    name: "push day", 
                    description: "push day arm workout", 
                    day: 1, 
                    exercises: [
                        {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                        {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
                    ]
                }, 
                {
                    id: 2, 
                    name: "pull day", 
                    description: "pull day arm and back workout", 
                    day: 2, 
                    exercises: [
                        {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                        {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
                    ]
                },
                {
                    id: 3, 
                    name: "legs and core", 
                    description: "legs and core day workout", 
                    day: 3, 
                    exercises: [
                        {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
                    ]
                },
            ],
            assigned_clients: [1, 3, 5, 7, 9]
        },


        {
            id: 2, 
            name: "Program 2", 
            description: "Test program description", 
            coach_id: 1, 
            length: 22, 
            phase: "strength",
            workouts: [
                {
                    id: 4, 
                    name: "push day", 
                    description: "push day arm workout", 
                    day: 1, 
                    exercises: [
                        {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                        {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
                    ]
                }, 
                {
                    id: 5, 
                    name: "pull day", 
                    description: "pull day arm and back workout", 
                    day: 2, 
                    exercises: [
                        {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                        {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
                    ]
                },
                {
                    id: 6, 
                    name: "legs and core", 
                    description: "legs and core day workout", 
                    day: 3, 
                    exercises: [
                        {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
                    ]
                },
            ],
            assigned_clients: [2, 4, 6]
        }      
      ]
      ```
      
      
      
* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, Missing request body, Bad/Missing body keys, invalid exercise_id, coach_id not associated with exercise_id

  

----

#### _Query the backend for programs data with workouts and exercises in workouts_

* **Method**

  `GET`

* **Endpoint**

  `/programs`

* **Notes**

  ```
  The token must be sent along with the request. The coach_id will
  be obtained from the token.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
            id: 1, 
            name: "Program 1", 
            description: "program1 description", 
            coach_id: 1, 
            length: 10, 
            phase: "strength",
            workouts: [
                {
                    id: 1, 
                    name: "push day", 
                    description: "push day arm workout", 
                    day: 1, 
                    exercises: [
                        {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                        {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
                    ]
                }, 
                {
                    id: 2, 
                    name: "pull day", 
                    description: "pull day arm and back workout", 
                    day: 2, 
                    exercises: [
                        {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                        {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
                    ]
                },
                {
                    id: 3, 
                    name: "legs and core", 
                    description: "legs and core day workout", 
                    day: 3, 
                    exercises: [
                        {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
                    ]
                },
            ],
            assigned_clients: [1, 3, 5, 7, 9]
        },


        {
            id: 2, 
            name: "Program 2", 
            description: "Test program description", 
            coach_id: 1, 
            length: 22, 
            phase: "strength",
            workouts: [
                {
                    id: 4, 
                    name: "push day", 
                    description: "push day arm workout", 
                    day: 1, 
                    exercises: [
                        {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                        {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
                    ]
                }, 
                {
                    id: 5, 
                    name: "pull day", 
                    description: "pull day arm and back workout", 
                    day: 2, 
                    exercises: [
                        {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                        {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
                    ]
                },
                {
                    id: 6, 
                    name: "legs and core", 
                    description: "legs and core day workout", 
                    day: 3, 
                    exercises: [
                        {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
                    ]
                },
            ],
            assigned_clients: [2, 4, 6]
        }      
      ]
      ```

* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token

----
#### _Modify a program and its workouts and workout links to exercises_

* **Method**

  `PUT`

* **Endpoint**

  `/programs`

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "id":2,
        "name": "progC",
        "description": "progC desc",
        "length": 21,
        "phase": "strength",
        "workouts": [
            {
                "name": "work1", 
                "description": "work1 desc", 
                "day": 1, 
                "exercises": [
                    {"id": 1, "order":1, "exercise_details": "exD1_work1"}, 
                    {"id": 2, "order":2, "exercise_details": "exD2_work1"}, 
                    {"id": 3, "order":3, "exercise_details": "exD3_work1"} 
                ]
            }, 
            
            {
                "name": "work2", 
                "description": "work2 desc", 
                "day": 2, 
                "exercises": [
                    {"id": 4, "order":1, "exercise_details": "exD4_work2"}, 
                    {"id": 5, "order":2, "exercise_details": "exD5_work2"}, 
                    {"id": 6, "order":3, "exercise_details": "exD6_work2"} 
                ]
            }, 
          
            {
                "name": "work3", 
                "description": "work3 desc", 
                "day": 3, 
                "exercises": [
                    {"id": 1, "order":1, "exercise_details": "exD1_work3"}, 
                    {"id": 6, "order":2, "exercise_details": "exD7_work3"} 
                ]
            }
        ]
    }
    ```

* **Notes**

  ```
  This is for the modification of a single program for a coach. When this request 
  is received by the backend, the server will first delete all the current workouts
  and exercises_workouts records associated with the program. Then it will modify the program record 
  and then add new workouts and exercises_workouts records according to the request body. 
  The token must be sent along with the request. The coach_id will be obtained
  from the token.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
            id: 1, 
            name: "Program 1", 
            description: "program1 description", 
            coach_id: 1, 
            length: 10, 
            phase: "strength",
            workouts: [
                {
                    id: 1, 
                    name: "push day", 
                    description: "push day arm workout", 
                    day: 1, 
                    exercises: [
                        {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                        {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
                    ]
                }, 
                {
                    id: 2, 
                    name: "pull day", 
                    description: "pull day arm and back workout", 
                    day: 2, 
                    exercises: [
                        {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                        {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
                    ]
                },
                {
                    id: 3, 
                    name: "legs and core", 
                    description: "legs and core day workout", 
                    day: 3, 
                    exercises: [
                        {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
                    ]
                },
            ],
            assigned_clients: [1, 3, 5, 7, 9]
        },


        {
            id: 2, 
            name: "Program 2", 
            description: "Test program description", 
            coach_id: 1, 
            length: 22, 
            phase: "strength",
            workouts: [
                {
                    id: 4, 
                    name: "push day", 
                    description: "push day arm workout", 
                    day: 1, 
                    exercises: [
                        {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                        {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
                    ]
                }, 
                {
                    id: 5, 
                    name: "pull day", 
                    description: "pull day arm and back workout", 
                    day: 2, 
                    exercises: [
                        {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                        {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
                    ]
                },
                {
                    id: 6, 
                    name: "legs and core", 
                    description: "legs and core day workout", 
                    day: 3, 
                    exercises: [
                        {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                        {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
                    ]
                },
            ],
            assigned_clients: [2, 4, 6]
        }      
      ]
      ```
      
      
      
* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, Missing request body, Bad/Missing body keys, invalid exercise_id/program_id, coach_id not associated with exercise_id/program_id      


----

#### _Delete a program_

* **Method**

  `DELETE`

* **Endpoint**

  `/programs/:id`

* **Notes**

  ```
  The token must be sent along with the request. The coach_id will be obtained from the token.
  The param id is the program_id that will be deleted. All linked workouts and exercise_workouts records
  will also be deleted.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 3,
        "name": "progC-changed",
        "phase": "progC phase",
        "description": "progC desc-changed",
        "length": 700,
        "coach_id": 1
      }
      ```

* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, invalid program_id, coach_id not associated with program_id 








# Data Model

#### COACHES

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Coach's id |
| first_name | string | yes<sup>1</sup> | no | Coach's first name |
| last_name | string | yes<sup>1</sup> | no | Coach's last name  |
| email | string | yes | yes | Coach's email (max 100 char) |
| password | string | yes<sup>2</sup> | no | Coach's password (max 100 char) |

<sup>1</sup> _for registration only_

<sup>2</sup> _for local auth only_

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  email: STRING
  password: STRING
}
```


## Actions

`addCoach(coach)` -> Creates a new coach and returns that coach

`findCoachBy(email)` -> Returns a single coach by email

`getCoachById(id)` -> Returns a single coach by id

---

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    *  DB_JWTSECRET - secret key for access
    *  DATABASE_URL - URL for Heroku postgres deployment
    *  FRONTEND_DOMAIN - URL for frontend deployed application
    *  CLIENT_ID - id for authenticating application with Google
    *  CLIENT_SECRET - secret for authenticating application with Google

    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/Workout-Builder-fe) for details on the frontend of our project.
