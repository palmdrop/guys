import { StoreSubject } from "./StoreSubject";

const url = 'https://sheets-test.webspace.pages.dev/api/guys';

export type GuyData = {
  date: string,
  content: string[]
}

export type FetchData = {
  cacheStatus: string,
  cacheTTL: number,
  retryTimeout: number | undefined,
  guys: GuyData[],
}

export const nextFetchDelay$ = new StoreSubject<number>(0);
export const guys$ = new StoreSubject<GuyData[]>([])

export const fetchGuys = async (): Promise<FetchData> => {
  /*
  const response = await fetch(
    url
  );

  const { 
    cacheStatus,
    cacheTTL,
    data,
    retryTimeout
  } = await response.json();

  const guys: GuyData[] = [].concat.apply(
    [], [...data.pages]
  );
  */

  let cacheStatus = "uh";
  let cacheTTL = 60;
  let retryTimeout = undefined;
  let guys = [
    {
      date: "May 13",
      content: ["Guy beyond time", "Who is he?", null, "what" ]
    },
    {
      date: "Apr 23",
      content: ["Guy growing larger and larger, he's the biggest in the world", "Where is he now?", null, null ],
    },
    {
      date: "Feb 1",
      content: ["Guy standing naked in the wind", null, "he looks at the sea", null ],
    },
  ]

  return {
    cacheStatus,
    cacheTTL,
    retryTimeout,
    guys,
  }
}

export const fetchToStores = async () => {
  const fetchAndUpdate = async () => {
    const {
      // cacheStatus,
      cacheTTL,
      retryTimeout,
      guys,
    } = await fetchGuys();

    guys$.next(guys);
    nextFetchDelay$.next((retryTimeout || cacheTTL || 60) * 1000);
  }

  fetchAndUpdate();

  nextFetchDelay$.subscribe(
    timeout => {
      timeout && setTimeout(fetchAndUpdate, timeout)
    }
  );
}