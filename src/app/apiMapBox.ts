const TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`
const axios = require('axios')


const fetchLocalMapBox = (local: string) => fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${TOKEN_MAP_BOX}`
).then(response => response.json())
    .then(data => data);


const getImoveis = () => axios.get('https://glue-api.zapimoveis.com.br/v2/page/venda/terrenos-lotes-condominios/rj+rio-de-janeiro+zona-oeste+vargem-grande/?unitSubTypes=UnitSubType_NONE,CONDOMINIUM,VILLAGE_HOUSE&unitTypes=ALLOTMENT_LAND&usageTypes=RESIDENTIAL&unitTypesV3=RESIDENTIAL_ALLOTMENT_LAND&text=Terreno+%2F+Lote+%2F+Condom%C3%ADnio&priceMax=300000&business=SALE&listingType=USED&sort=updatedAt+ASC&size=240&from=0&includeFields=search(result(listings(listing(displayAddressType,amenities,usableAreas,constructionStatus,listingType,description,title,createdAt,floors,unitTypes,nonActivationReason,providerId,propertyType,unitSubTypes,unitsOnTheFloor,legacyId,id,portal,unitFloor,parkingSpaces,updatedAt,address,suites,publicationType,externalId,bathrooms,usageTypes,totalAreas,advertiserId,advertiserContact,whatsappNumber,bedrooms,acceptExchange,pricingInfos,showPrice,resale,buildings,capacityLimit,status),account(id,name,logoUrl,licenseNumber,showAddress,legacyVivarealId,legacyZapId,minisite),medias,accountLink,link)),totalCount),expansion(search(result(listings(listing(displayAddressType,amenities,usableAreas,constructionStatus,listingType,description,title,createdAt,floors,unitTypes,nonActivationReason,providerId,propertyType,unitSubTypes,unitsOnTheFloor,legacyId,id,portal,unitFloor,parkingSpaces,updatedAt,address,suites,publicationType,externalId,bathrooms,usageTypes,totalAreas,advertiserId,advertiserContact,whatsappNumber,bedrooms,acceptExchange,pricingInfos,showPrice,resale,buildings,capacityLimit,status),account(id,name,logoUrl,licenseNumber,showAddress,legacyVivarealId,legacyZapId,minisite),medias,accountLink,link)),totalCount)),nearby(search(result(listings(listing(displayAddressType,amenities,usableAreas,constructionStatus,listingType,description,title,createdAt,floors,unitTypes,nonActivationReason,providerId,propertyType,unitSubTypes,unitsOnTheFloor,legacyId,id,portal,unitFloor,parkingSpaces,updatedAt,address,suites,publicationType,externalId,bathrooms,usageTypes,totalAreas,advertiserId,advertiserContact,whatsappNumber,bedrooms,acceptExchange,pricingInfos,showPrice,resale,buildings,capacityLimit,status),account(id,name,logoUrl,licenseNumber,showAddress,legacyVivarealId,legacyZapId,minisite),medias,accountLink,link)),totalCount)),page,fullUriFragments&cityWiseStreet=1&developmentsSize=3&superPremiumSize=3&addressCountry=&addressState=Rio+de+Janeiro&addressCity=Rio+de+Janeiro&addressZone=Zona+Oeste&addressNeighborhood=Vargem+Grande&addressStreet=&addressAccounts=&addressType=neighborhood&addressLocationId=BR%3ERio+de+Janeiro%3ENULL%3ERio+de+Janeiro%3EZona+Oeste%3EVargem+Grande&addressPointLat=-22.976312&addressPointLon=-43.494189', {
    headers: {
        "x-domain": "www.zapimoveis.com.br"
    }
}).then((response: any) => filterImoveis(response.data.search.result.listings))


const filterImoveis = async (data: any) => {
    let imoveis = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index].listing.address.point;
        if (element !== undefined) {
            imoveis.push(element)
        }

    }
    return imoveis;

}


export { getImoveis, fetchLocalMapBox };

// const getImoveis = () => {
//   axios.get('https://glue-api.zapimoveis.com.br/v2/page/venda/terrenos-lotes-condominios/rj+rio-de-janeiro+zona-oeste+vargem-grande/?unitSubTypes=UnitSubType_NONE,CONDOMINIUM,VILLAGE_HOUSE&unitTypes=ALLOTMENT_LAND&usageTypes=RESIDENTIAL&unitTypesV3=RESIDENTIAL_ALLOTMENT_LAND&text=Terreno+%2F+Lote+%2F+Condom%C3%ADnio&priceMax=300000&business=SALE&listingType=USED&sort=updatedAt+ASC&size=240&from=0&includeFields=search(result(listings(listing(displayAddressType,amenities,usableAreas,constructionStatus,listingType,description,title,createdAt,floors,unitTypes,nonActivationReason,providerId,propertyType,unitSubTypes,unitsOnTheFloor,legacyId,id,portal,unitFloor,parkingSpaces,updatedAt,address,suites,publicationType,externalId,bathrooms,usageTypes,totalAreas,advertiserId,advertiserContact,whatsappNumber,bedrooms,acceptExchange,pricingInfos,showPrice,resale,buildings,capacityLimit,status),account(id,name,logoUrl,licenseNumber,showAddress,legacyVivarealId,legacyZapId,minisite),medias,accountLink,link)),totalCount),expansion(search(result(listings(listing(displayAddressType,amenities,usableAreas,constructionStatus,listingType,description,title,createdAt,floors,unitTypes,nonActivationReason,providerId,propertyType,unitSubTypes,unitsOnTheFloor,legacyId,id,portal,unitFloor,parkingSpaces,updatedAt,address,suites,publicationType,externalId,bathrooms,usageTypes,totalAreas,advertiserId,advertiserContact,whatsappNumber,bedrooms,acceptExchange,pricingInfos,showPrice,resale,buildings,capacityLimit,status),account(id,name,logoUrl,licenseNumber,showAddress,legacyVivarealId,legacyZapId,minisite),medias,accountLink,link)),totalCount)),nearby(search(result(listings(listing(displayAddressType,amenities,usableAreas,constructionStatus,listingType,description,title,createdAt,floors,unitTypes,nonActivationReason,providerId,propertyType,unitSubTypes,unitsOnTheFloor,legacyId,id,portal,unitFloor,parkingSpaces,updatedAt,address,suites,publicationType,externalId,bathrooms,usageTypes,totalAreas,advertiserId,advertiserContact,whatsappNumber,bedrooms,acceptExchange,pricingInfos,showPrice,resale,buildings,capacityLimit,status),account(id,name,logoUrl,licenseNumber,showAddress,legacyVivarealId,legacyZapId,minisite),medias,accountLink,link)),totalCount)),page,fullUriFragments&cityWiseStreet=1&developmentsSize=3&superPremiumSize=3&addressCountry=&addressState=Rio+de+Janeiro&addressCity=Rio+de+Janeiro&addressZone=Zona+Oeste&addressNeighborhood=Vargem+Grande&addressStreet=&addressAccounts=&addressType=neighborhood&addressLocationId=BR%3ERio+de+Janeiro%3ENULL%3ERio+de+Janeiro%3EZona+Oeste%3EVargem+Grande&addressPointLat=-22.976312&addressPointLon=-43.494189', {
//     headers: {
//       "x-domain": "www.zapimoveis.com.br"
//     }
//   })
//     .then(function (response) {
//       // handle success
//       populateMap(response.data.search.result.listings);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .then(function () {
//       // always executed
//     });
// }