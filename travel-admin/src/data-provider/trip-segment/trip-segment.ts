import { GetListOptions, GetOneOptions, GetManyOptions, GetManyReferenceOptions, CreateOptions, UpdateOptions, UpdateManyOptions, DeleteOptions, DeleteManyOptions, DataProviderMultiReturn, DataProviderSingleReturn } from "../data-provider-types";

type ResourceType = 'trip' | 'trip_segment'

class TravelDataProvider {

  public GET_LIST(_: ResourceType, options: GetListOptions): DataProviderMultiReturn {
    const id = (options.filter as any).id;
    return fetch(`http://localhost:8080/travel/trip/${id}`)
      .then(resp => resp.json())
      .then((json: any[]) => {
        console.log(json);
        return {
          data: json,
          total: json.length
        }
      })
  }

  public GET_ONE(_: ResourceType, options: GetOneOptions): any {
    return fetch(`http://localhost:8080/travel/trip/${options.id}`)
      .then(resp => resp.json())
      .then((json: any) => {
        return {
          data: {
            ...json,
          },
        }
      })
  }

  public GET_MANY(_: ResourceType, options: GetManyOptions) {
    console.log('GET_MANY', options);
  }

  public GET_MANY_REFERENCE(_: ResourceType, options: GetManyReferenceOptions) {
    console.log('GET_MANY_REFERENCE', options);
    const mutatedOptions = {
      ...options,
      filter: {
        [options.target]: options.id,
      }
    }
    return this.GET_LIST(_, mutatedOptions)
  }

  public CREATE(_: ResourceType, options: CreateOptions) {
    const {data}: any = options;
    const inputData = { ...data }

    return fetch(`http://localhost:8080/travel/trip/${data.trip_id}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
    .then(resp => resp.json())
    .then(json => {
      return {
        id: json.id,
        data: inputData
      }
    })
  }

  public UPDATE(_: ResourceType, options: UpdateOptions) {
    const {data}: any = options;
    const inputData = { ...data }
    console.log(data);
    return fetch(`http://localhost:8080/travel/trip/${data.trip_id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
    .then(resp => resp.json())
    .then(json => {
      return {
        id: json.id,
        data: inputData
      }
    })
  }

  public UPDATE_MANY(_: ResourceType, options: UpdateManyOptions) {
    console.log('UPDATE_MANY', options);
  }

  public DELETE(_: ResourceType, options: DeleteOptions) {
    return fetch(`http://localhost:8080/travel/trip/${options.id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(json => {
      return { data: json }
    })
  }

  public DELETE_MANY(_: ResourceType, options: DeleteManyOptions) {
    return Promise.all(
      options.ids.map(id => this.DELETE(_, {id, previousData: {}}))
    ).then(mergedResponses => {
      return {
        data: mergedResponses
      }
    })
  }


  public CUSTOM_CREATE_PHOTO(_: ResourceType, options: CreateOptions) {
    const {data}: any = options;
    const inputData = { ...data }

    const formData = new FormData();
    formData.append('file', inputData.file)

    return fetch(`http://localhost:8080/travel/trip/${data.trip_id}/photos`, {
      method: 'POST', 
      body: formData
    })
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    })
  }
}

export default TravelDataProvider;