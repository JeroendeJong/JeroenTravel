import { GetListOptions, GetOneOptions, GetManyOptions, GetManyReferenceOptions, CreateOptions, UpdateOptions, UpdateManyOptions, DeleteOptions, DeleteManyOptions, DataProviderMultiReturn, DataProviderSingleReturn } from "../data-provider-types";
import CountryFlags from 'emoji-flags';

type ResourceType = 'trip' | 'trip_segment'

class TravelDataProvider {

  public GET_LIST(_: ResourceType, options: GetListOptions): DataProviderMultiReturn {
    console.log(options)

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
    return fetch(`http://localhost:8080/travel/trips/${options.id}`)
      .then(resp => resp.json())
      .then((trip: any) => {
        return {
          data: {
            ...trip,
            country_codes: trip.country_codes.split(',').map((code: any) => {
              code = code.trim();
              const emojiObject = CountryFlags.countryCode(code);
              if (emojiObject) return emojiObject.emoji
              else return code;
            })
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
    const inputData = {
      active: data.active || false,
      name: data.name,
      description: data.description,
      country_codes: data.country_codes,
      header_image_url: data.header_image_url || ''
    }

    return fetch('http://localhost:8080/travel/trips/', {
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
    console.log('UPDATE', options);
  }

  public UPDATE_MANY(_: ResourceType, options: UpdateManyOptions) {
    console.log('UPDATE_MANY', options);
  }

  public DELETE(_: ResourceType, options: DeleteOptions) {
    return fetch(`http://localhost:8080/travel/trips/${options.id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(json => {
      return { data: json }
    })
  }

  public DELETE_MANY(_: ResourceType, options: DeleteManyOptions) {
    console.log('DELETE_MANY', options);
    return Promise.all(
      options.ids.map(id => this.DELETE(_, {id, previousData: {}}))
    ).then(mergedResponses => {
      return {
        data: mergedResponses
      }
    })
  }
}

export default TravelDataProvider;