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

export type ResponseData = {
  cacheStatus: string,
  cacheTTL: number,
  retryTimeout: number | undefined,
  data: any
}

export type FetchStatus = 
  'pending' |
  'fetching' |
  'succeeded' |
  'failed';

export const fetchStatus$ = new StoreSubject<FetchStatus>('pending');
export const nextFetchDelay$ = new StoreSubject<number>(0);
export const guys$ = new StoreSubject<GuyData[]>([])

const dummyFetch = async (): Promise<FetchData> => {
  let cacheStatus = "uh";
  let cacheTTL = 60;
  let retryTimeout = undefined;
  let guys = [
    {
      date: "May 13",
      content: ["Guy beyond time", "Who is he?", null, "what", "morew", "morew", "more", "more", "more", "more", "more" ]
    },
    {
      date: "Apr 23",
      content: ["Guy growing larger and larger, he's the biggest in the world", "Where is he now?", null, null ],
    },
    {
      date: "Feb 1",
      content: ["Guy standing naked in the wind", "this hsi jsi jcei fdjei fjeif jeif jeif jeif jefi ejf iejf iejf iejfiejf iejf eif", "he looks at the sea", "and just one more a little bit lponger and one more pleasssasa" ],
    },
  ]

  return {
    cacheStatus,
    cacheTTL,
    retryTimeout,
    guys,
  }
}

export const fetchGuys = async (): Promise<FetchData> => {
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

  return {
    cacheStatus,
    cacheTTL,
    retryTimeout,
    guys,
  }
}

export const fetchToStores = async () => {
  const fetchAndUpdate = async () => {
    try {
      fetchStatus$.next('fetching');

      const {
        // cacheStatus,
        cacheTTL,
        retryTimeout,
        guys,
      } 
      // = await dummyFetch();
      = await fetchGuys();

      fetchStatus$.next('succeeded');

      guys$.next(guys);
      nextFetchDelay$.next((retryTimeout || cacheTTL || 60) * 1000);
    } catch(e) {
      fetchStatus$.next('failed');
      nextFetchDelay$.next(nextFetchDelay$.getValue() * 2); // Double time between retries
    } finally {
      fetchStatus$.next('pending');
    }
  }

  await fetchAndUpdate();

  nextFetchDelay$.subscribe(
    timeout => {
      timeout && setTimeout(fetchAndUpdate, timeout)
    }
  );
}