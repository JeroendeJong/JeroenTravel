export interface GetListOptions {
  pagination?: {page: number, perPage: number};
  sort?: { field: string, order: string };
  filter: object
}

export interface GetOneOptions {
  id: string;
}

export interface GetManyOptions {
  ids: number[]
}

export interface GetManyReferenceOptions extends GetListOptions {
  target: string;
  id: number | string;
}

export interface CreateOptions {
  data: object;
}

export interface UpdateOptions extends CreateOptions {
  id: number | string;
  previousData: object;
}

export interface UpdateManyOptions extends CreateOptions {
  ids: Array<number | string>;
}

export interface DeleteOptions {
  id: number | string;
  previousData: object;
}

export interface DeleteManyOptions {
  ids: Array<number | string>;
}

interface Record {
  id: string | number
}


export interface DataProviderReturn {
  data: any
}


export interface SingleReturn {
  data: Record
}

export type DataProviderSingleReturn = Promise<DataProviderReturn>;

interface MultiReturn {
  data: Record[], total?: number
}

export type DataProviderMultiReturn = Promise<MultiReturn>;


// getList	{ data: {Record[]}, total: {int} }
// getOne	{ data: {Record} }
// getMany	{ data: {Record[]} }
// getManyReference	{ data: {Record[]}, total: {int} }
// create	{ data: {Record} }
// update	{ data: {Record} }
// updateMany	{ data: {mixed[]} } The ids which have been updated
// delete	{ data: {Record|null} } The record that has been deleted (optional)
// deleteMany	{ data: {mixed[]} } The ids of the deleted records (optional)

// export interface 


// { data: {Record[]}, total: {int} }