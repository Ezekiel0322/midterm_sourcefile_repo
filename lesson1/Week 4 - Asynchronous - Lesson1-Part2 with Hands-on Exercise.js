class Student {
  constructor(name, scores) {
    this.name = name;
    this.scores = scores;
  }

  getAverage() {
    let total = 0;
    for (let i = 0; i < this.scores.length; i++) {
      total += this.scores[i];
    }
    return total / this.scores.length;
  }

  getLetterGrade() {
    const average = this.getAverage();

    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else {
      return "F";
    }
  }
}

function analyzeClass(students) {
  let classTotal = 0;
  let topStudent = null;
  let topAverage = -Infinity;

  console.log("------- STUDENT REPORT -------");

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = student.getAverage(); 
    const grade = student.getLetterGrade();

    console.log(`${student.name} - Average: ${average.toFixed(1)} | Grade: ${grade}`);

    classTotal += average;

    if (average > topAverage) {
      topAverage = average;
      topStudent = student.name;
    }
  }

  const classAverage = classTotal / students.length;

  console.log("-----------------------------------");
  console.log(`Class Average: ${classAverage.toFixed(1)}`);
  console.log(`Top Student: ${topStudent} with ${topAverage.toFixed(1)}`);
}

const studentData = [
  { name: "zeke", scores: [85, 90, 92] },
  { name: "kiel", scores: [70, 75, 68] },
  { name: "ez", scores: [95, 98, 92] },
  { name: "zekiel", scores: [55, 60, 58] }
];

const students = studentData.map(data => new Student(data.name, data.scores));

analyzeClass(students);