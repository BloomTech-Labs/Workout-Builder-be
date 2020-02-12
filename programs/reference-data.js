


// This is the request body for the POST method for creating programs
{
	"name": "progC",
	"description": "progC desc",
	"length": 7,
	"phase": "progC phase",
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
                {"id": 1, "order":2, "exercise_details": "exD1_work2"}, 
                {"id": 2, "order":3, "exercise_details": "exD2_work2"} 
            ]
        }, 
       
        {
            "name": "work3", 
            "description": "work3 desc", 
            "day": 3, 
            "exercises": [
                {"id": 3, "order":1, "exercise_details": "exD3_work3"}, 
                {"id": 1, "order":2, "exercise_details": "exD1_work3"} 
            ]
        }
    ]
}


// This is the response body for the POST method for creating programs
// this is also the response body for the GET method for getting programs
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



    {id: 2, name: "Program 2", description: "Test program description", coach_id: 1, length: 22, phase: "strength",
    workouts: [
      {id: 4, name: "push day", description: "push day arm workout", day: 1, 
      exercises: [
        {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
        {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
        {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
      ]}, 
      {id: 5, name: "pull day", description: "pull day arm and back workout", day: 2, exercises: [
        {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
        {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
        {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
      ]},
      {id: 6, name: "legs and core", description: "legs and core day workout", day: 3, exercises: [
        {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
        {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
        {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
      ]},
    ],
    assigned_clients: [2, 4, 6]
    },

   
  ]




/*
To-do List:
- validBodyCheckProgram middleware function
    (checks:
        if whole workouts array is correct, 
        checks that exercise_id exists, 
        checks that exercise_id belongs to coach_id
    )
- talk to Nick to see what he wants to receive on a GET programs request
- GET programs endpoint
- PUT/EDIT programs endpoint
- DELETE programs endpoint

- model for clients_programs
- endpoints for clients_programs
- assigning program to clients
    program {
        id: 1,
        clients: [
            1, 2, 3
        ]
    }

add order to the body we will receive for post progs

*/