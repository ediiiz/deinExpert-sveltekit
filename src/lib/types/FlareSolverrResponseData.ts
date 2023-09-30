export type FlareSolverrResponseData = {
  status: "ok";
  message: string;
  solution: {
    url: string;
    status: number;
    cookies: {
      domain: string;
      expiry?: number;
      httpOnly: boolean;
      name: string;
      path: string;
      sameSite: "None" | "Lax";
      secure: boolean;
      value: string;
    }[];
    userAgent: string;
  };
  startTimestamp: number;
  endTimestamp: number;
  version: string;
};
