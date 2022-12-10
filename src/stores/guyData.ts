import { StoreSubject } from "./StoreSubject";
import guyData from './data.json';

const url = 'https://palmdrop.site/api/guys';

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
  const { 
    cacheStatus,
    cacheTTL,
    data,
  } = guyData;

  /*
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000)
  });
  */

  const guys: GuyData[] = [].concat.apply(
    [], [...data.pages]
  );

  return {
    cacheStatus,
    cacheTTL,
    retryTimeout: undefined,
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
      = await dummyFetch();
      // = await fetchGuys();

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