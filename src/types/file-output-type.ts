export type FileOutputType = {
  createdAt: string;
  version: string;
  requests: Array<
    FileRequestItemOutput
  >;
};

export type FileRequestItemOutput = {
  method: string;
  status: number;
  url: string;
  word: string;
};
