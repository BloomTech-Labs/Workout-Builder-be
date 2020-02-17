program {
	"name": "progC",
	"description": "progC desc",
	"length": 21,
	"phase": "strength",
	"workouts": [
        {"name": "work1", "description": "work1 desc", "day": 1, "exercises": [{"id": 1, "exercise_details": "exD1_work1"}, {"id": 2, "exercise_details": "exD2_work1"}, {"id": 3, "exercise_details": "exD3_work1"} ]}, 
        {"name": "work2", "description": "work2 desc", "day": 2, "exercises": [{"id": 4, "exercise_details": "exD4_work2"}, {"id": 5, "exercise_details": "exD5_work2"}, {"id": 6, "exercise_details": "exD6_work2"} ]}, 
        {"name": "work3", "description": "work3 desc", "day": 3, "exercises": [{"id": 1, "exercise_details": "exD1_work3"}, {"id": 7, "exercise_details": "exD7_work3"} ]}, 
    ]
};


program {
	"name": "progC",
	"description": "progC desc",
	"length": 21,
	"phase": "strength",
	"workouts": [
        {"name": "work1", "description": "work1 desc", "day": 1, 
            "exercises": [
                {"id": 1, "exercise_details": "exD1_work1"}, 
                {"id": 2, "exercise_details": "exD2_work1"}, 
                {"id": 3, "exercise_details": "exD3_work1"} 
            ]
        }, 
        
        {"name": "work2", "description": "work2 desc", "day": 2, 
            "exercises": [
                {"id": 4, "exercise_details": "exD4_work2"}, 
                {"id": 5, "exercise_details": "exD5_work2"}, 
                {"id": 6, "exercise_details": "exD6_work2"} 
            ]
        }, 
       
        {"name": "work3", "description": "work3 desc", "day": 3, 
            "exercises": [
                {"id": 1, "exercise_details": "exD1_work3"}, 
                {"id": 6, "exercise_details": "exD7_work3"} 
            ]
        }, 
    ]
};

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
- add clients to program
    program {
        program_id: 1,
        client_ids: [ 1, 2, 3 ]
    }

    [
        { program_id: 1, client_id: 1 },
        { program_id: 1, client_id: 2 },
        { program_id: 1, client_id: 3 },
    ]

- not doing this:
    client {
        client_id: 1
        program_id: [1, 2]
    }
    
- this can be done with the 'add clients to program'
    client {
        client_id: [1]
        program_id: 1
    }

- verification middleware:
    - client exists
    - program exists
    - client is associated with coach
    - program is associated with coach
    
*/


/*
Questions:
- should we add an 'image_url' property for the clients table? (dashboard)
- when assigning clients to a program, coach must input start_date (figma)

*/