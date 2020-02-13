import { GetListOptions, GetOneOptions, GetManyOptions, GetManyReferenceOptions, CreateOptions, UpdateOptions, UpdateManyOptions, DeleteOptions, DeleteManyOptions, DataProviderMultiReturn, DataProviderSingleReturn } from "../data-provider-types";
import { Trip } from "./trip-types";
import CountryFlags from 'emoji-flags';

type ResourceType = 'trip' | 'trip_segment'





class TravelDataProvider {

  public GET_LIST(type: ResourceType, options: GetListOptions): DataProviderMultiReturn {
    return fetch('http://localhost:8080/travel/trips')
      .then(resp => resp.json())
      .then((json: Trip[]) => {
        return {
          data: json.map(trips => {
            return {
              ...trips,
              country_codes: trips.country_codes.split(',').map(code => {
                code = code.trim();
                const emojiObject = CountryFlags.countryCode(code);
                if (emojiObject) return emojiObject.emoji
                else return code;
              })
            }

          }),
          total: json.length
        }
      })
  }

  public GET_ONE(type: ResourceType, options: GetOneOptions): any {
    return fetch(`http://localhost:8080/travel/trips/${options.id}`)
      .then(resp => resp.json())
      .then((trip: Trip) => {
        return {
          data: {
            ...trip,
            country_codes: trip.country_codes.split(',').map(code => {
              code = code.trim();
              const emojiObject = CountryFlags.countryCode(code);
              if (emojiObject) return emojiObject.emoji
              else return code;
            })
          },
        }
      })
  }

  public GET_MANY(type: ResourceType, options: GetManyOptions) {
    console.log('GET_MANY', type, options);
  }

  public GET_MANY_REFERENCE(type: ResourceType, options: GetManyReferenceOptions) {
    console.log('GET_MANY_REFERENCE', type, options);
  }

  public CREATE(type: ResourceType, options: CreateOptions) {
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

  public UPDATE(type: ResourceType, options: UpdateOptions) {
    console.log('UPDATE', type, options);
  }

  public UPDATE_MANY(type: ResourceType, options: UpdateManyOptions) {
    console.log('UPDATE_MANY', type, options);
  }

  public DELETE(type: ResourceType, options: DeleteOptions) {
    return fetch(`http://localhost:8080/travel/trips/${options.id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(json => {
      return { data: json }
    })
  }

  public DELETE_MANY(type: ResourceType, options: DeleteManyOptions) {
    console.log('DELETE_MANY', type, options);
    return Promise.all(
      options.ids.map(id => this.DELETE(type, {id, previousData: {}}))
    ).then(mergedResponses => {
      return {
        data: mergedResponses
      }
    })
  }
}

export default TravelDataProvider;