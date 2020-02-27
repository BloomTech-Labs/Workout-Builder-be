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




Table of contents
=================

  
   * [Table of contents](#table-of-contents)
  
   * [Endpoints](#usage)
      * [Authentication Routes](#auth-routes)
      * [Client Routes](#client-routes)
      * [Client-Program Routes](#client-program-routes)
      * [Exercise Routes](#exercise-routes)
      * [Program Routes](#program-routes)
      
   * [Data Models](#data-model)
   * [Actions](#actions)
   * [Environment Variables](#Environment-Variables)
   * [Project Information](#Contributing)











## Endpoints
---

### AUTH Routes

* [Local Register](#Register-a-user-with-local-account)
* [Local Login](#Login-a-user-with-a-local-account)
* [Google Login](#Login-a-user-with-Google-social-login)

### [Return to table of contents](#table-of-contents)
----
#### _Register a user with local account_
 [Authentication Routes](#auth-routes)
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
 [Authentication Routes](#auth-routes)
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
 [Authentication Routes](#auth-routes)
* **Endpoint**

  `/auth/google`

* **Redirect URL**

  `{deployed url}/auth`

* **URL Params**

  token, first_name, last_name

---

### Client Routes
* [Get all clients for that coach](#Get-all-clients-for-that-coach)
* [Get a specific client](#Get-a-specific-client)
* [Create a client](#Create-a-client)
* [Modify a client](#Modify-a-client)
* [Delete a client](#Delete-a-client)

### [Return to table of contents](#table-of-contents)

#### _Get all clients for that coach_
[Client Routes](#client-routes)

* **Method**

  `GET`

* **Endpoint**

  `/clients`

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
            "id": 1,
            "first_name": "clientFirstA",
            "last_name": "clientLastA",
            "email": "ca@mail.com",
            "coach_id": 1
        },
        {
            "id": 2,
            "first_name": "clientFirstB",
            "last_name": "clientLastB",
            "email": "cb@mail.com",
            "coach_id": 1
        },
        {
            "id": 5,
            "first_name": "clientFirstE",
            "last_name": "clientLastE",
            "email": "ce@mail.com",
            "coach_id": 1
        }
      ]
      ```

* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token

----
#### _Get a specific client_
[Client Routes](#client-routes)

* **Method**

  `GET`

* **Endpoint**

  `/clients/:id`

* **Notes**

  ```
  The token must be sent along with the request. The coach_id will
  be obtained from the token.
  
  The param id is the client_id.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 1,
        "first_name": "clientFirstA",
        "last_name": "clientLastA",
        "email": "ca@mail.com",
        "coach_id": 1
      }
      ```

* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, invalid client_id, coach_id not associated with client_id

----

#### _Create a client_
[Client Routes](#client-routes)

* **Method**

  `POST`

* **Endpoint**

  `/clients`

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "first_name": "clientFirstD",
        "last_name": "clientLastD",
        "email": "cd@mail.com"
    }
    ```

* **Notes**

  ```
  This is for the creation of a single client for a coach. 
  
  The token must be sent along with the request. The coach_id will
  be obtained from the token.
  ```

* **Success Response**
    * **Code:** 201

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 5,
        "first_name": "clientFirstD",
        "last_name": "clientLastD",
        "email": "cd@mail.com",
        "coach_id": 1
      }
      ```
      
* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, Missing request body, Bad/Missing body keys, client email already in use

----

#### _Modify a client_
[Client Routes](#client-routes)

* **Method**

  `PUT`

* **Endpoint**

  `/clients/:id`

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "first_name": "new_first",
        "last_name": "new_last",
        "email": "newclient@mail.com"
    }
    ```

* **Notes**

  ```
  The token must be sent along with the request. The coach_id will be obtained
  from the token.

  The param id is the client_id.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 5,
        "first_name": "new_first",
        "last_name": "new_last",
        "email": "newclient@mail.com",
        "coach_id": 1
      }
      ```
      
      
* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, Missing request body, Bad/Missing body keys, client email already in use  

----

#### _Delete a client_
[Client Routes](#client-routes)

* **Method**

  `DELETE`

* **Endpoint**

  `/clients/:id`

* **Notes**

  ```
  The token must be sent along with the request. The coach_id will be obtained from the token.

  The param id is the client_id that will be deleted.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 5,
        "first_name": "new_first",
        "last_name": "new_last",
        "email": "newclient@mail.com",
        "coach_id": 1
      }
      ```

* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, invalid client_id, coach_id not associated with client_id 

----

### Client-Program Routes
* [Get a coach's dashboard information](#Get-dashboard-information-for-a-coach)
* [Add clients to a program or vice versa](#Add-clients-to-a-program-or-vice-versa)
* [Delete a program for a client or vice versa](#Delete-a-program-for-a-client-or-vice-versa)

### [Return to table of contents](#table-of-contents)

#### _Get dashboard information for a coach_

[Client-Program Routes](#client-program-routes)

* **Method**

  `GET`

* **Endpoint**

  `/clients-programs/dashboard`

* **Notes**

  ```
  This will provide a coach's list of clients on active programs, including program details.

  The token must be sent along with the request. The coach_id will
  be obtained from the token.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
            "client_id": 1,
            "first_name": "clientFirstA",
            "last_name": "clientLastA",
            "start_date": "2020-2-17",
            "program_id": 1,
            "name": "progA",
            "length": 21,
            "phase": "strength"
        },
        {
            "client_id": 2,
            "first_name": "clientFirstB",
            "last_name": "clientLastB",
            "start_date": "2020-2-17",
            "program_id": 9,
            "name": "progC",
            "length": 21,
            "phase": "strength"
        }
      ]
      ```

* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token

----

#### _Add clients to a program or vice versa_
[Client-Program Routes](#client-program-routes)

* **Method**

  `POST`

* **Endpoint**

  `/clients-programs`

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "program_id": 1,
        "client_ids": [ 1, 2, 5 ]
    }
    ```

* **Notes**

  ```
  This will add one or more clients to a program OR one program to a client. 
  
  The token must be sent along with the request. The coach_id will
  be obtained from the token.
  ```

* **Success Response**
    * **Code:** 201

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
            "client_id": 1,
            "program_id": 1,
            "start_date": "2020-2-17",
            "current_day": null
        },
        {
            "client_id": 2,
            "program_id": 1,
            "start_date": "2020-2-17",
            "current_day": null
        },
        {
            "client_id": 5,
            "program_id": 1,
            "start_date": "2020-2-17",
            "current_day": null
        }
      ]
      ```
      
* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, Missing request body, Bad/Missing body keys, invalid client_id/program_id, coach_id not associated with client_id/program_id

----

#### _Delete a program for a client or vice versa_
[Client-Program Routes](#client-program-routes)

* **Method**

  `DELETE`

* **Endpoint**

  `/clients-programs`

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "client_id": 5,
        "program_id": 1
    }
    ```

* **Notes**

  ```
  This will remove the link between a client and program.

  The token must be sent along with the request. The coach_id will be obtained from the token.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      "1 item deleted successfully"
      ```

* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, Missing request body, Bad/Missing body keys, invalid client_id/program_id, coach_id not associated with client_id/program_id 


----


### Exercise Routes
* [Create an Exercise](#Create-an-exercise)
* [Get all Exercises for that coach](#Get-all-exercise-for-that-coach)
* [Get one exercise for that coach](#Get-one-exercise-for-that-coach)
* [Update an exercise for that coach](#Update-an-exercise-for-that-coach)
* [Delete an Exercise](#Delete-an-Exercise)

### [Return to table of contents](#table-of-contents)
#### _Create an exercise_

[Exercise Routes](#exercise-routes)
* **Method**

  `POST`

* **Endpoint**

  `/exercises`

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        
    }
    ```

* **Success Response**
    * **Code:** 201

    * **Body of response is JSON. Example is shown below:** 

    ```
        {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
    }
    ```
    * **Error Response**
    * **Code:** 400

    * **Reason:**  "missing field name in request body, no access, coach_id does not exist
---

#### _Get all exercise for that coach_

[Exercise Routes](#exercise-routes)
* **Method**

  `Get`

* **Endpoint**

  `/exercises`



* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 

    ```
        {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
    }
    ```
    * **Error Response**
    * **Code:** 400

    * **Reason:**  "no access"
---
#### _Get one exercise for that coach_
[Exercise Routes](#exercise-routes)
* **Method**

  `Get`

* **Endpoint**

  `/exercises/:id`



* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 

    ```
        {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
    }
    ```
    * **Error Response**
    * **Code:** 400

    * **Reason:**  "no access, item does not exist"
---
#### _Update an exercise for that coach_
[Exercise Routes](#exercise-routes)
* **Method**

  `put`

* **Endpoint**

  `/exercises/:id`

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
       
    }
    ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 

    ```
    {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
    }
    ```
    * **Error Response**
    * **Code:** 400

    * **Reason:**  "no access, missing or wrong field, item does not exist"
---
#### _Delete an Exercise_
   [Exercise Routes](#exercise-routes)
* **Method**

  `DELETE`

* **Endpoint**

  `/exercises/:id`


* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
      }
      ```

* **Error Response**
    * **Code:** 400

    * **Reason:** Invalid token, invalid exercise_id


---
### Program Routes
* [Create program](#Create-a-program-with-workouts-and-link-workouts-to-exercises)
* [Get all programs for that coach](#Query-the-backend-for-programs-data-with-workouts-and-exercises-in-workouts)
* [Edit a program](#Modify-a-program-and-its-workouts-and-workout-links-to-exercises)
* [Delete a program](#Delete-a-program)


### [Return to table of contents](#table-of-contents)
----
#### _Create a program with workouts and link workouts to exercises_
  [Program Routes](#program-routes)

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
                    {"exercise_id": 1, "order":1, "exercise_details": "exD1_work1"}, 
                    {"exercise_id": 2, "order":2, "exercise_details": "exD2_work1"}, 
                    {"exercise_id": 3, "order":3, "exercise_details": "exD3_work1"} 
                ]
            }, 
            
            {
                "name": "work2", 
                "description": "work2 desc", 
                "day": 2, 
                "exercises": [
                    {"exercise_id": 4, "order":1, "exercise_details": "exD4_work2"}, 
                    {"exercise_id": 5, "order":2, "exercise_details": "exD5_work2"}, 
                    {"exercise_id": 6, "order":3, "exercise_details": "exD6_work2"} 
                ]
            }, 
          
            {
                "name": "work3", 
                "description": "work3 desc", 
                "day": 3, 
                "exercises": [
                    {"exercise_id": 1, "order":1, "exercise_details": "exD1_work3"}, 
                    {"exercise_id": 6, "order":2, "exercise_details": "exD7_work3"} 
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
   [Program Routes](#program-routes)
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
   [Program Routes](#program-routes)
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
                    {"exercise_id": 1, "order":1, "exercise_details": "exD1_work1"}, 
                    {"exercise_id": 2, "order":2, "exercise_details": "exD2_work1"}, 
                    {"exercise_id": 3, "order":3, "exercise_details": "exD3_work1"} 
                ]
            }, 
            
            {
                "name": "work2", 
                "description": "work2 desc", 
                "day": 2, 
                "exercises": [
                    {"exercise_id": 4, "order":1, "exercise_details": "exD4_work2"}, 
                    {"exercise_id": 5, "order":2, "exercise_details": "exD5_work2"}, 
                    {"exercise_id": 6, "order":3, "exercise_details": "exD6_work2"} 
                ]
            }, 
          
            {
                "name": "work3", 
                "description": "work3 desc", 
                "day": 3, 
                "exercises": [
                    {"exercise_id": 1, "order":1, "exercise_details": "exD1_work3"}, 
                    {"exercise_id": 6, "order":2, "exercise_details": "exD7_work3"} 
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
   [Program Routes](#program-routes)
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
### [Return to table of contents](#table-of-contents)
#### COACHES

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Coach id |
| first_name | string | yes<sup>1</sup> | no | Coach first name |
| last_name | string | yes<sup>1</sup> | no | Coach last name  |
| email | string | yes | yes | Coach email (max 100 char) |
| password | string | yes<sup>2</sup> | no | Coach password (max 100 char) |

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

----

#### EXERCISES

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Exercise id |
| name | string | yes | no | Exercise name |
| type | string | no | no | Exercise type  |
| focal_points | string | no | yes | Notes/Description/points of focus during Exercise (max 1000 char) |
| video_url | string | no | no | Exercise video (max 1000 char) |
| thumbnail_url | string | no | no | Exercise image (max 1000 char) |
| coach_id | integer | yes | no | Coach id (foreign key) |


```
{
  id: UUID
  name: STRING
  type: STRING
  focal_points: STRING
  video_url: STRING
  thumbnail_url: STRING
  coach_id: INTEGER
}
```

----

#### WORKOUTS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Workout id |
| name | string | yes | no | Workout name |
| description | string | no | no | Workout description (max 1000 char) |
| day | integer | yes | no | The day of the program to which this workout belongs |
| coach_id | integer | yes | no | Coach id (foreign key) |
| program_id | string | yes | no | Program id (foreign key) |

```
{
  id: UUID
  name: STRING
  description: STRING
  day: INTEGER
  coach_id: INTEGER
  program_id: INTEGER
}
```

----

#### EXERCISES_WORKOUTS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| exercise_id | integer | yes | no | Exercise id (foreign key) |
| workout_id | integer | yes | no | Workout id (foreign key) |
| order | integer | yes | no | The order in which the exercise will be performed in the workout |
| exercise_details | string | yes | no | Sets/reps/time for an exercise in a specific workout (max 1000 char) |

```
{
  exercise_id: INTEGER
  workout_id: INTEGER
  order: INTEGER
  exercise_details: STRING
}
```

----

#### PROGRAMS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Program id |
| name | string | yes | no | Program name |
| description | string | no | no | Program description (max 1000 char) |
| phase | string | no | no | Type/Goal of Program |
| length | integer | yes | no | Program length in days |
| coach_id | integer | yes | no | Coach id (foreign key) |

```
{
  id: UUID
  name: STRING
  description: STRING
  phase: STRING
  length: INTEGER
  coach_id: INTEGER
}
```

----

#### CLIENTS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Client id |
| first_name | string | yes | no | Client first name |
| last_name | string | yes | no | Client last name |
| email | string | yes | yes | Client email |
| coach_id | integer | yes | no | Coach id (foreign key) |

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  email: STRING
  coach_id: INTEGER
}
```

----

#### CLIENTS_PROGRAMS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| client_id | integer | yes | no | Client id (foreign key) |
| program_id | integer | yes | no | Program id (foreign key) |
| start_date | string | yes | no | The date the program is assigned to the client |
| current_day | integer | no | no | The day of the program the client is currently on |

```
{
  client_id: INTEGER
  program_id: INTEGER
  start_date: STRING
  current_day: INTEGER
}
```

----


## Actions
### [Return to table of contents](#table-of-contents)
#### Coaches Model

`addCoach(coach)` -> Creates a new coach and returns that coach

`findCoachBy(email)` -> Returns a single coach by email

`getCoachById(id)` -> Returns a single coach by id

---

#### Exercises Model

`getExercises(coach_id)` -> Returns all exercises for given coach id

`getExerciseById(id)` -> Returns a single exercise by id

`addExercise(exercise)` -> Creates a new exercise and returns that exercise

`updateExercise(id, changes)` -> Modifies a single exercise by id and returns the modified exercise

`deleteExercise(id)` -> Deletes a single exercise by id and returns the deleted exercise

---

#### Workouts Model

`getWorkouts(coach_id)` -> Returns all workouts for given coach id

`getWorkoutById(id)` -> Returns a single workout by id

`getWorkoutByProgramId(program_id)` -> Returns all workouts for given program id

`addWorkout(workouts)` -> Creates one or more new workouts and returns the workouts 

`updateWorkout(id, changes)` -> Modifies a single workout by id and returns the modified workout

`deleteWorkout(id)` -> Deletes a single workout by id and returns the deleted workout

`getExercisesInWorkout(exerciseWorkout)` -> Returns all given exercises linked to given workouts

`getExercisesByWorkoutId(workout_id)` -> Returns all exercises for the given workout id

`addExercisesToWorkout(exerciseWorkout)` -> Adds exercises to given workout and returns them

`deleteExerciseInWorkout(exerciseWorkout)` -> Deletes specified exercises in given workout

#### Programs Model

`getPrograms(coach_id)` -> Returns all programs for given coach id

`getProgramById(id)` -> Returns a single program by id

`addProgram(program)` -> Creates a new program and returns that program

`updateProgram(id, changes)` -> Modifies a single program by id and returns the modified program

`deleteProgram(id)` -> Deletes a single program by id and returns the deleted program

#### Clients Model

`getClients(coach_id)` -> Returns all clients for given coach id

`getClientById(id)` -> Returns a single client by id

`addClient(client)` -> Creates a new client and returns that client

`updateClient(id, changes)` -> Modifies a single client by id and returns the modified client

`deleteClient(id)` -> Deletes a single client by id and returns the deleted client

`extractClientsInProgram(program_id)` -> Returns all clients assigned to the given program id

`getClientsInProgram(clientProgram)` -> Returns all given clients linked to given programs

`addClientsToProgram(clientProgram)` -> Creates one or more new client-program links and returns them

`deleteProgramForClient(clientProgram)` -> Deletes a single client-program link and returns the count

`getDashboardInfo(coach_id)` -> Returns dashboard info from many tables for the given coach id


---
## Environment Variables
### [Return to table of contents](#table-of-contents)
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


### [Return to table of contents](#table-of-contents)
