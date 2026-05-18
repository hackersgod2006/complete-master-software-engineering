export interface Section {
  id: string;
  number: string;
  title: string;
  content: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  volume: string;
  volumeNumber: number;
  volumeSubtitle: string;
  surpassing: string;
  intro: string;
  sections: Section[];
}
