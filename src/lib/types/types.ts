type product = {
  webcode: string;
  url: string;
  price: {
    price: number;
    branchName: string;
    branchId: number;
  }[];
};

type googleSiteVerifyResponse = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: number;
  action: string;
};

type googleSearchApiResponse = {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: {
    request: [
      {
        count: number;
        startIndex: number;
        inputEncoding: string;
        outputEncoding: string;
        safe: string;
        cx: string;
        exactTerms: string;
      }
    ];
  };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items:
  {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    cacheId: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    pagemap: {
      cse_thumbnail: [
        {
          src: string;
          width: number;
          height: number;
        }
      ];
      metatags: [
        {
          pagetype: string;
          viewport: string;
          storefinderresultfilter: string;
          'csrf-token': string;
          ak_screentype: string;
          'format-detection': string;
        }
      ];
      cse_image: [
        {
          src: string;
        }
      ];
      listitem: [
        {
          item: string;
          name: string;
          position: number;
        },
        {
          item: string;
          name: string;
          position: number;
        },
        {
          item: string;
          name: string;
          position: number;
        },
        {
          item: string;
          name: string;
          position: number;
        },
        {
          item: string;
          name: string;
          position: number;
        }
      ];
    };
  }[]
};

export type { product, googleSearchApiResponse, googleSiteVerifyResponse };
