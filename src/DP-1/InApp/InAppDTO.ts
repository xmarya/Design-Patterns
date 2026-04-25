export type InAppDTO = Record<
  string,
  {
    notiId: string;
    subject: string;
    content: string;
    unread: boolean;
    date: Date;
  }
>;
