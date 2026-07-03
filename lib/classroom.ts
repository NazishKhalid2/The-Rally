type ClassroomTask = {
  title: string;
  subject: string;
  description: string | null;
  dueDate: Date | null;
};

export async function fetchClassroomDeadlines(accessToken: string) {
  const coursesRes = await fetch(
    "https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!coursesRes.ok) {
    throw new Error(`Classroom courses fetch failed: ${coursesRes.status}`);
  }

  const coursesData = await coursesRes.json();
  const courses = coursesData.courses || [];

  const tasks: ClassroomTask[] = [];

  for (const course of courses) {
    const cwRes = await fetch(
      `https://classroom.googleapis.com/v1/courses/${course.id}/courseWork`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!cwRes.ok) continue;

    const cwData = await cwRes.json();
    const courseWork = cwData.courseWork || [];

    for (const cw of courseWork) {
      let dueDate: Date | null = null;
      if (cw.dueDate) {
        const { year, month, day } = cw.dueDate;
        const { hours = 23, minutes = 59 } = cw.dueTime || {};
        dueDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
      }

      tasks.push({
        title: cw.title,
        subject: course.name,
        description: cw.description || null,
        dueDate,
      });
    }
  }

  return { coursesFound: courses.length, tasks };
}
