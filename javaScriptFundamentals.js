// we need CourseInfo, AssignmentGroup, Learn Submissions
// putting sample data in here

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 46
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {//This function is making sure the course ID matches the assignment group. :D
                                                // if its a match, it keeps going, but if it DOESNT. you get an error 
  
  try {

if(course.id !== ag.course_id){
    throw new Error("This assignment group doesn't belong to this course!!! Silly goose.");
}
 

  let result = [];
  
for (let i = 0; i < submissions.length; i++){
    let submission = submissions[i];
    let learnerId = submission.learner_id; //saving learner id to a easier var 
    let learner = null; //this should hold a the learner object. i think.
    let assignmentId = submission.assignment_id; //saving assignment id to a easier var

    for(let x = 0; x < result.length; x++){// if learner was found in array, save it
        if(result[x].id === learnerId){
            learner = result[x];
            break;//ends the loop so we dont gotta keep searching
        }
    }

    if (learner === null){//if learner wasnt found, make one!
        learner ={
          id:  learnerId,
          totalPoints: 0,
          totalPossible: 0
        };
        result.push(learner);
    }
    //For loop to find matching assignment
    for (let x = 0; x < ag.assignments.length; x++){
        let assignment = ag.assignments[x];

        if(assignment.id === assignmentId){
        
            let today = new Date(); //creating date objects woo
            let dueDate = new Date(assignment.due_at);

            if(dueDate > today){//if due date is in the future, skip it!
                continue;
            }
            let score = submission.submission.score; 
            let pointsPossible = assignment.points_possible;


            //Makes sure points is a valid number and not 0
            if (typeof pointsPossible !== "number" || pointsPossible === 0){
                throw new Error("ERRM. Points must be a number and canot be a zero.")

            }

            //making sure score is a number

            if(typeof score !== "number"){

                throw new Error("HEY. THATS NOT A NUMBER. Score must be a number!");
            }

            let submittedDate = new Date(submission.submission.submitted_at);

            //making the 10% late penalty
            switch(true){

           case submittedDate > dueDate:

                score = score - (pointsPossible * 0.10);
                break;

                default:

                    score = score;
            }
        

            let percentage = score / pointsPossible;

        

            learner [assignmentId] = percentage; //saving the learners score

            learner.totalPoints += score;
            learner.totalPossible += pointsPossible;

        }
    }
}
    //learner average after assignments are graded
    for(let x = 0; x < result.length; x++){
        result[x].avg = result[x].totalPoints / result[x].totalPossible;

    }

    //removing extra helper values because its not needed for final result 
    for( let x = 0; x < result.length; x++){
        delete result[x].totalPoints;
        delete result[x].totalPossible;
    }

    return result;




   } catch (error){
    console.log(error)

  
}
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

