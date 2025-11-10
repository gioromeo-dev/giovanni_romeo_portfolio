import dataEN from "../data/en.json";
import dataIT from "../data/it.json";

interface Description{
    title: string;
    body: string;
}
interface NavBar {
    buttonHome: string;
    buttonDescription: string;
    buttonProjects: string;
    buttonAbout: string;
    buttonContact: string;
}
interface Job {
  title: string;
  company: string;
  position: string;
  description: string;
  imgsrc: string;
  startdate: Date;
  enddate: Date;
}

export interface JsonData {
  firstname: string;
  lastname: string;
  title: string;
  description: Description;
  navbar: NavBar;
  jobs: Job[];
}

export function GetData(language: string): JsonData | null {
  let rawData: any;

  switch (language) {
    case "en":
      rawData = dataEN;
      break;
    case "it":
      rawData = dataIT;
      break;
    default:
      return null;
  }

  const jobsWithDates: Job[] = rawData.jobs.map((job: any) => ({
    ...job,
    startdate: new Date(job.startdate),
    enddate: new Date(job.enddate),
  }));

  return {
    ...rawData,
    jobs: jobsWithDates,
  } as JsonData;
}
