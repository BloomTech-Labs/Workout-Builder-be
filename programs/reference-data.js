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
- assigning program to clients
    program {
        id: 1,
        clients: [
            1, 2, 3
        ]
    }

add order to the body we will receive for post progs

*/